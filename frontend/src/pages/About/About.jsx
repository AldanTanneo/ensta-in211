import './About.css';

function About() {
  return (
    <div>
      <div className="about-section">
        <div className="row">
          <div className="column">
            <img src="/film.png" alt="logo" width="20%" />
          </div>

          <div className="column">
            <h1>About Us</h1>
            <p>Who are we to judge</p>
          </div>

          <div className="column">
            <img src="/film.png" alt="logo" width="20%" />
          </div>
        </div>
      </div>

      <h2 align="center"> </h2>
      <div className="row">
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
      </div>
    </div>
  );
}

export default About;
