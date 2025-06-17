import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const navigate=useNavigate();
  const handleNavigate=()=>{
    navigate("/register")
  }
  const entrepreneurLogin=()=>{
    navigate("/enterprenuer-login")
  }
  const investorLogin=()=>{
    navigate("/investor-login")
  }
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      
      {/* Hero Section */}
      <section className="py-5 bg-primary text-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 mx-auto text-center">
              <h1 className="display-4 fw-bold mb-3">Welcome to Invedat</h1>
              <p className="lead mb-4">Connecting visionary entrepreneurs with passionate investors.</p>
              <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
                <button className="btn btn-light btn-lg px-4" onClick={entrepreneurLogin}>Start as Entrepreneur</button>
                <button className="btn btn-outline-light btn-lg px-4" onClick={investorLogin}>Invest in Projects</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Why Choose Invedat</h2>
          <div className="row g-4">
            <div className="col-md-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <div className="bg-primary bg-opacity-10 p-3 rounded-circle mb-3 mx-auto" style={{ width: "60px", height: "60px" }}>
                    <i className="bi bi-shield-check fs-3 text-primary"></i>
                  </div>
                  <h5 className="card-title">Verified Projects</h5>
                  <p className="card-text text-muted">All listed startups undergo a thorough verification process</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <div className="bg-primary bg-opacity-10 p-3 rounded-circle mb-3 mx-auto" style={{ width: "60px", height: "60px" }}>
                    <i className="bi bi-people fs-3 text-primary"></i>
                  </div>
                  <h5 className="card-title">Global Network</h5>
                  <p className="card-text text-muted">Connect with entrepreneurs and investors worldwide</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <div className="bg-primary bg-opacity-10 p-3 rounded-circle mb-3 mx-auto" style={{ width: "60px", height: "60px" }}>
                    <i className="bi bi-graph-up fs-3 text-primary"></i>
                  </div>
                  <h5 className="card-title">Market Insights</h5>
                  <p className="card-text text-muted">Access valuable market data and investment trends</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <div className="bg-primary bg-opacity-10 p-3 rounded-circle mb-3 mx-auto" style={{ width: "60px", height: "60px" }}>
                    <i className="bi bi-briefcase fs-3 text-primary"></i>
                  </div>
                  <h5 className="card-title">Portfolio Management</h5>
                  <p className="card-text text-muted">Advanced tools to manage your investments or projects</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2>How It Works</h2>
            <p className="text-muted">Invedat makes connecting entrepreneurs and investors seamless and efficient</p>
          </div>
          
          <div className="row g-4">
            <div className="col-md-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: "50px", height: "50px" }}>
                    <span className="fw-bold">1</span>
                  </div>
                  <h5 className="card-title">Create & Publish</h5>
                  <p className="card-text text-muted">Entrepreneurs publish their innovative startup ideas and business plans</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: "50px", height: "50px" }}>
                    <span className="fw-bold">2</span>
                  </div>
                  <h5 className="card-title">Browse & Review</h5>
                  <p className="card-text text-muted">Investors explore projects and review business proposals</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: "50px", height: "50px" }}>
                    <span className="fw-bold">3</span>
                  </div>
                  <h5 className="card-title">Connect & Fund</h5>
                  <p className="card-text text-muted">Investors select projects to fund and reach out to entrepreneurs</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: "50px", height: "50px" }}>
                    <span className="fw-bold">4</span>
                  </div>
                  <h5 className="card-title">Collaborate & Grow</h5>
                  <p className="card-text text-muted">Both parties collaborate to turn innovative ideas into successful businesses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Projects */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Featured Projects</h2>
            <a href="#" className="text-decoration-none">View All Projects</a>
          </div>
          
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="position-relative">
                  <div className="position-absolute top-0 start-0 m-3">
                    <span className="badge bg-primary">Technology</span>
                  </div>
                  <img src="public/ai.jpeg" className="card-img-top" alt="Project" />
                </div>
                <div className="card-body">
                  <h5 className="card-title">Innovative AI Startup</h5>
                  <p className="card-text">An AI-driven solution to revolutionize customer support systems. Looking for funding to scale operations.</p>
                  
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span className="text-muted small">Funding Progress</span>
                      <span className="text-primary fw-bold small">64%</span>
                    </div>
                    <div className="progress" style={{ height: "8px" }}>
                      <div className="progress-bar bg-primary" role="progressbar" style={{ width: "64%" }} aria-valuenow="64" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                  
                  <div className="d-flex justify-content-between text-muted small mb-3">
                    <div>
                      <div>Goal</div>
                      <strong className="text-dark">$500,000</strong>
                    </div>
                    <div className="text-end">
                      <div>Raised</div>
                      <strong className="text-dark">$320,000</strong>
                    </div>
                  </div>
                  
                  <button className="btn btn-primary w-100">View Project Details</button>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="position-relative">
                  <div className="position-absolute top-0 start-0 m-3">
                    <span className="badge bg-success">Sustainability</span>
                  </div>
                  <img src="public/green.jpeg" className="card-img-top" alt="Project" />
                </div>
                <div className="card-body">
                  <h5 className="card-title">Green Tech Solutions</h5>
                  <p className="card-text">A project focused on sustainable energy and eco-friendly technologies. Seeking investors.</p>
                  
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span className="text-muted small">Funding Progress</span>
                      <span className="text-primary fw-bold small">57%</span>
                    </div>
                    <div className="progress" style={{ height: "8px" }}>
                      <div className="progress-bar bg-primary" role="progressbar" style={{ width: "57%" }} aria-valuenow="57" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                  
                  <div className="d-flex justify-content-between text-muted small mb-3">
                    <div>
                      <div>Goal</div>
                      <strong className="text-dark">$750,000</strong>
                    </div>
                    <div className="text-end">
                      <div>Raised</div>
                      <strong className="text-dark">$425,000</strong>
                    </div>
                  </div>
                  
                  <button className="btn btn-primary w-100">View Project Details</button>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="position-relative">
                  <div className="position-absolute top-0 start-0 m-3">
                    <span className="badge bg-info">Fintech</span>
                  </div>
                  <img src="public/blockchain.jpeg" className="card-img-top" alt="Project" />
                </div>
                <div className="card-body">
                  <h5 className="card-title">Blockchain-based Platform</h5>
                  <p className="card-text">A decentralized platform for secure transactions. In need of funding to expand.</p>
                  
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span className="text-muted small">Funding Progress</span>
                      <span className="text-primary fw-bold small">70%</span>
                    </div>
                    <div className="progress" style={{ height: "8px" }}>
                      <div className="progress-bar bg-primary" role="progressbar" style={{ width: "70%" }} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                  
                  <div className="d-flex justify-content-between text-muted small mb-3">
                    <div>
                      <div>Goal</div>
                      <strong className="text-dark">$1,200,000</strong>
                    </div>
                    <div className="text-end">
                      <div>Raised</div>
                      <strong className="text-dark">$840,000</strong>
                    </div>
                  </div>
                  
                  <button className="btn btn-primary w-100">View Project Details</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-5 bg-primary text-white">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="mb-3">Ready to Start Your Journey?</h2>
              <p className="lead mb-4">
                Whether you're an entrepreneur looking for funding or an investor seeking the next big opportunity,
                Invedat provides the platform you need to succeed.
              </p>
              <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
                <button className="btn btn-light btn-lg px-4 fw-bold" onClick={handleNavigate} >Create An Account</button>
                <button className="btn btn-outline-light btn-lg px-4">Learn More</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

export default Home;