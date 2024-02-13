import React from 'react';
import PropTypes from 'prop-types';

export default function NavbarLimit(props) {
  return (
    <div>
      <nav className={`navbar transparent`}>
        <div className="container-fluid fs-3">
          
            <span className="colorw">User Sidebar</span>
          
          <div className="navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 column-gap-3">
              <li className="btn-border">
                <a className='btn btn-border' href="/"><button className='btn colorw' >Account</button></a>
              </li>
              
            </ul>

          </div>
        </div>
      </nav>
    </div>
  );
}

NavbarLimit.propTypes = {
  title: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
};

NavbarLimit.defaultProps = {
  title: 'set title here',
  about: 'About ',
};
