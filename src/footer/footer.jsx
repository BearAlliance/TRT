import React from 'react';
import './footer.scss';

export function Footer() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          <div className="is-pulled-left is-size-7">
            <div>
              <strong>© TRT Bicycles {new Date().getFullYear()}</strong>
            </div>
            <div>
              by <a href="http://nickcacace.com">Nick Cacace</a>.
            </div>
          </div>
          <div className="is-pulled-right">
            <a
              className="social-link"
              href="https://www.facebook.com/favatastrtbicycles"
              rel="noopener noreferrer"
              target="_blank">
              <i className="fab fa-facebook-f fa-2x" />
            </a>
            <a
              className="social-link"
              href="https://twitter.com/christianfavata"
              rel="noopener noreferrer"
              target="_blank">
              <span className="icon">
                <i className="fab fa-twitter fa-2x" />
              </span>
            </a>
            <a
              className="social-link"
              href="https://www.instagram.com/explore/tags/trtbicycles/"
              rel="noopener noreferrer"
              target="_blank">
              <i className="fab fa-instagram fa-2x" />
            </a>
          </div>
        </p>
      </div>
    </footer>
  );
}
