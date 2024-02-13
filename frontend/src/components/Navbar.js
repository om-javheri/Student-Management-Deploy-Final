import React from 'react';
import PropTypes from 'prop-types';

export default function Navbar(props) {
  return (
    <div className='Z'>
      <nav className={`navbar transparent`}>
        
          <div className="container-fluid fs-3 colorw"> Admin Sidebar</div>
        
        <div className="navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className='btn btn-border' href="/"><button className='btn colorw' >Account</button></a>
            </li>
            <li className="nav-item">
              <a id='item1' className="btn btn-border" href="/ShowAndBook"><button className='btn colorw' >{props.navbar_item1}</button></a>
            </li>
            <li className="nav-item">
              <a id='item2' className="btn btn-border" href="/Create"><button className='btn colorw' >{props.navbar_item2}</button></a>
            </li>
            <li className="nav-item">
              <a id='item3' className="btn btn-border" href="/ShowAndId" ><button className='btn colorw' >{props.navbar_item3}</button></a>
            </li>
            <li className="nav-item">
              <a id='item4' className="btn btn-border" href="/ShowAndDelete"><button className='btn colorw' >{props.navbar_item4}</button></a>
            </li>
          </ul>

        </div>
      </nav>
    </div>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
  title: 'set title here',
  about: 'About ',
};
