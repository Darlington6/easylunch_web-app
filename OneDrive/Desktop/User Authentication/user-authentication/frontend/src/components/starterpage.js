import React from "react";

const StarterPage = () => {
  return (
    <div>
      {/* Full HTML content based on your starter-page.html */}
      <header id="header" className="header fixed-top">
        <div className="topbar d-flex align-items-center">
          <div className="container d-flex justify-content-center justify-content-md-between">
            <div className="contact-info d-flex align-items-center">
              <i className="bi bi-envelope d-flex align-items-center">
                <a href="mailto:contact@easylunch.com">contact@easylunch.com</a>
              </i>
              <i className="bi bi-phone d-flex align-items-center ms-4">
                <span>+250 79 344 0734</span>
              </i>
            </div>
            <div className="languages d-none d-md-flex align-items-center">
              <ul>
                <li>En</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="branding d-flex align-items-center">
          <div className="container position-relative d-flex align-items-center justify-content-between">
            <a href="/" className="logo d-flex align-items-center me-auto me-xl-0">
              <img src="assets/img/easylunch_logo.jpg" alt="Logo" />
              <h1 className="sitename">EasyLunch</h1>
            </a>

            <nav id="navmenu" className="navmenu">
              <ul>
                {/* Links to login and signup */}
                <li>
                  <a href="/login">Log In</a>
                </li>
                <li>
                  <a href="/signup">Sign Up</a>
                </li>
              </ul>
              <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
            </nav>
          </div>
        </div>
      </header>

      <main className="main">
        <div className="page-title position-relative" style={{ backgroundImage: "url(assets/img/page-title-bg.webp)" }}>
          <div className="container position-relative">
            <h1>EasyLunch</h1>
            <p>Skip the Line, Savor the Time!</p>
          </div>
        </div>

        <section id="starter-section" className="starter-section section">
          <div className="container section-title">
            <p>Your meals are easy with us ...</p>

            {/* The links are added here for extra visibility */}
            <p>
              <a href="/login">Log In</a> or <a href="/signup">Sign Up</a> to continue.
            </p>
          </div>
        </section>
      </main>

      <footer id="footer" className="footer">
        <div className="container footer-top">
          <div className="row gy-4">
            <div className="col-lg-4 col-md-6 footer-about">
              <a href="/" className="logo d-flex align-items-center">
                <span className="sitename">EasyLunch</span>
              </a>
              <div className="footer-contact pt-3">
                <p>Free Economic Zone</p>
                <p>Bumbugo, Near Azam</p>
                <p className="mt-3">
                  <strong>Phone:</strong> <span>+250 79 344 0734</span>
                </p>
                <p><strong>Email:</strong> <span>info@easylunch.com</span></p>
              </div>
              <div className="social-links d-flex mt-4">
                <a href="#"><i className="bi bi-twitter-x"></i></a>
                <a href="#"><i className="bi bi-facebook"></i></a>
                <a href="#"><i className="bi bi-instagram"></i></a>
                <a href="#"><i className="bi bi-linkedin"></i></a>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About us</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Terms of service</a></li>
                <li><a href="#">Privacy policy</a></li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Our Services</h4>
              <ul>
                <li><a href="#">Web Design</a></li>
                <li><a href="#">Web Development</a></li>
                <li><a href="#">Product Management</a></li>
                <li><a href="#">Marketing</a></li>
                <li><a href="#">Graphic Design</a></li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-12 footer-newsletter">
              <h4>Our Newsletter</h4>
              <p>
                Subscribe to our newsletter and receive the latest news about our
                products and services!
              </p>
              <form action="forms/newsletter.php" method="post">
                <div className="newsletter-form">
                  <input type="email" name="email" />
                  <input type="submit" value="Subscribe" />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="container copyright text-center mt-4">
          <p>
            © <span>Copyright</span>
            <strong className="px-1 sitename">EasyLunch</strong>
            <span>All Rights Reserved</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default StarterPage;
