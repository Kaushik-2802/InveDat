const express = require("express");
const mongoose = require("mongoose");
const multer=require("multer")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const path=require("path")

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = 5000;
const MONGO_URI = "mongodb+srv://kaushikkomaravolu:enternewpassword@invedat.cntxyxj.mongodb.net/?retryWrites=true&w=majority&appName=Invedat";
const JWT_SECRET = "your_secret_key";

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Auth Schema
const authSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["Entrepreneur", "Investor"] },
  },
  { timestamps: true }
);

authSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

authSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Auth = mongoose.model("Auth", authSchema);

// Profile Schema
const profileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Auth", required: true },
    organizationName: { type: String, default: "" },
    address: { type: String, default: "" },
    contactNumber: { type: String, default: "" },
    registrationNumber: { type: String, default: "" },
    linkedIn: { type: String, default: "" },
    website: { type: String, default: "" },
    profilePhoto: { type: String, default: "" },
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);

const projectSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Auth", required: true },
    title: { type: String, required: true },
    domainType:{type:String,required:true},
    description: { type: String, required: true, maxlength: 10000 },
    videoURL: { type: String, default: "" },  // YouTube or Vimeo URL only
    presentationFile: { type: String, default: "" }, // base64 or file URL (optional)
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);


//investor profile schema


const investorProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  name: String,
  age: Number,
  gender: String,
  dateOfBirth: Date,
  affiliatedOrganization: String,
  numberOfInvestments: Number,
  investmentDomains: [String],
  profilePhoto: {
    fileName: String,
    filePath: String,
  },
  financialStatement: {
    fileName: String,
    filePath: String,
  },
}, { timestamps: true });

const InvestorProfile= mongoose.model("InvestorProfile", investorProfileSchema);


// ------------------------- AUTH ROUTES -------------------------

// Register
app.post("/api/auth/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new Auth({ name, email, password, role });
    await newUser.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Login
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  try {
    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ------------------------- PROFILE ROUTES -------------------------

// Create Profile
app.post("/api/profile", async (req, res) => {
  const { userId, profilePhoto, ...profileData } = req.body;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid userId" });
  }

  try {
    const existingUser = await Auth.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingProfile = await Profile.findOne({ userId });
    if (existingProfile) {
      return res.status(400).json({ message: "Profile already exists" });
    }

    // Save the profilePhoto base64 string as is
    const newProfile = new Profile({
      userId,
      profilePhoto: profilePhoto || "",
      ...profileData,
    });

    await newProfile.save();

    res.status(201).json({ message: "Profile created", profile: newProfile });
  } catch (err) {
    console.error("Create profile error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update Profile
app.put("/api/profile/:userId", async (req, res) => {
  const { userId } = req.params;
  const { profilePhoto, ...profileData } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid userId" });
  }

  try {
    const profile = await Profile.findOne({ userId });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Update profile fields
    Object.assign(profile, profileData);

    if (profilePhoto) {
      profile.profilePhoto = profilePhoto; // base64 string
    }

    await profile.save();

    res.status(200).json({ message: "Profile updated", profile });
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get Profile
app.get("/api/profile/:userId", async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid userId" });
  }

  try {
    const profile = await Profile.findOne({ userId });
    if (!profile) {
      return res.status(200).json({ // return empty profile with flag false
        isProfileComplete: false,
        profile: null,
      });
    }
    res.status(200).json({
      isProfileComplete: true,
      profile,
    });
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

//-------------------------- PROJECT ROUTES ----------------------

// Create Project
app.post("/api/projects", async (req, res) => {
  const { userId, title,domainType, description, videoURL, presentationFile } = req.body;

  if (!userId || !title || !description) {
    return res.status(400).json({ message: "userId, title, and description are required" });
  }
  const wordCount = description.trim() === "" ? 0 : description.trim().split(/\s+/).length;
  if (wordCount > 200) {
    return res.status(400).json({ message: "Description must be up to 200 words" });
  }
  if (videoURL) {
    // Basic validation for YouTube or Vimeo URL
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    const vimeoRegex = /^(https?:\/\/)?(www\.)?vimeo\.com\/.+$/;
    if (!youtubeRegex.test(videoURL) && !vimeoRegex.test(videoURL)) {
      return res.status(400).json({ message: "Video URL must be from YouTube or Vimeo" });
    }
  }

  try {
    const project = new Project({
      userId,
      title,
      domainType,
      description,
      videoURL: videoURL || "",
      presentationFile: presentationFile || "",
    });

    await project.save();

    res.status(201).json({ message: "Project created", project });
  } catch (err) {
    console.error("Create project error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/projects/:userId", async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid userId" });
  }

  try {
    const projects = await Project.find({ userId });
    res.status(200).json({ projects });
  } catch (err) {
    console.error("Get projects error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/api/projects/:projectId", async (req, res) => {
  const { projectId } = req.params;
  const { title,domainType, description, videoURL, presentationFile } = req.body;

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Update fields
    if (title !== undefined) project.title = title;
    if (domainType !== undefined) project.domainType = domainType;
    if (description !== undefined) project.description = description;
    if (videoURL !== undefined) project.videoURL = videoURL;
    if (presentationFile !== undefined) project.presentationFile = presentationFile;

    await project.save();

    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/projects/project/:projectId", async (req, res) => {
  const { projectId } = req.params;
  try {
    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ project });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});



//-------------------------  INVESTOR ROUTES ----------------------

app.get("/api/projects", async (req, res) => {
  try {
    const projects = await Project.find().populate("userId", "name email"); // optional: populate user info
    res.status(200).json({ projects });
  } catch (err) {
    console.error("Error fetching all projects:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

//---------------------------  INVESTOR PROFILE ROUTES -----------------

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

app.get("/api/investor-profile/:userId", async (req, res) => {
  try {
    const profile = await InvestorProfile.findOne({ userId: req.params.userId });
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json({ profile });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

app.post("/api/investor-profile", upload.fields([
  { name: "profilePhoto", maxCount: 1 },
  { name: "financialStatement", maxCount: 1 },
]), async (req, res) => {
  try {
    const {
      userId, name, age, gender, dateOfBirth,
      affiliatedOrganization, numberOfInvestments, investmentDomains
    } = req.body;

    const profile = new InvestorProfile({
      userId,
      name,
      age,
      gender,
      dateOfBirth,
      affiliatedOrganization,
      numberOfInvestments,
      investmentDomains: investmentDomains.split(",").map(d => d.trim()),
      profilePhoto: req.files.profilePhoto ? {
        fileName: req.files.profilePhoto[0].originalname,
        filePath: req.files.profilePhoto[0].path,
      } : undefined,
      financialStatement: req.files.financialStatement ? {
        fileName: req.files.financialStatement[0].originalname,
        filePath: req.files.financialStatement[0].path,
      } : undefined,
    });

    await profile.save();
    res.status(201).json({ message: "Profile created", profile });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Failed to create profile" });
  }
});

app.put("/api/investor-profile/:id", upload.fields([
  { name: "profilePhoto", maxCount: 1 },
  { name: "financialStatement", maxCount: 1 },
]), async (req, res) => {
  try {
    const update = {
      ...req.body,
      investmentDomains: req.body.investmentDomains.split(",").map(d => d.trim()),
    };

    if (req.files.profilePhoto) {
      update.profilePhoto = {
        fileName: req.files.profilePhoto[0].originalname,
        filePath: req.files.profilePhoto[0].path,
      };
    }

    if (req.files.financialStatement) {
      update.financialStatement = {
        fileName: req.files.financialStatement[0].originalname,
        filePath: req.files.financialStatement[0].path,
      };
    }

    const updatedProfile = await InvestorProfile.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json({ message: "Profile updated", profile: updatedProfile });
  } catch (err) {
    res.status(500).json({ error: "Failed to update profile" });
  }
});


// ------------------------- START SERVER -------------------------

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
