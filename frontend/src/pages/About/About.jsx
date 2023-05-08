import './About.css';

function About() {
  return (
    <div>
      <header className="about-section">
        <div className="row">
          <img src="/film.png" alt="logo" className="header-column" />

          <div className="header-column">
            <h1>About Us</h1>
            <p>Who are we to judge</p>
          </div>

          <img src="/film.png" alt="logo" className="header-column" />
        </div>
      </header>

      <main className="row">
        <div className="column">
          <div className="card">
            <img src="/nicki.jpg" alt="Shrek" width="100%" />
            <div className="container">
              <h2>Nicki Minaj</h2>
              <p className="title">CEO & Founder</p>
              <p>Broke people should never laugh</p>
              <p>
                <a class="button" href="mailto:nickiminaj@anaconda.com">
                  Contact
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="card">
            <img src="/prettygirl.jpeg" alt="Spongebob" width="100%" />
            <div className="container">
              <h2>Spongebob Squartepants</h2>
              <p className="title">Art Director</p>
              <p>Patrick that's a pickle</p>
              <p>
                <a class="button" href="mailto:spongebob@pineapple.sea">
                  Contact
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="card">
            <img src="/wendy.jpg" alt="Wendy" width="100%" />
            <div className="container">
              <h2>Wendy Williams</h2>
              <p className="title">Designer</p>
              <p>Clap if you care ...</p>
              <p>
                <a class="button" href="mailto:wendy.williams@gmail.com">
                  Contact
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default About;
