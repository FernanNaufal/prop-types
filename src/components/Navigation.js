import React from "react";
import PropTypes from 'prop-types';
import {FiLogOut} from "react-icons/fi"

const Navigation=(props)=>{
    return(
        <nav className="navigation">
        <ul>
            <li>
                <h1>Arsip</h1>
            </li>
            <li>
                <button onClick={props.logout} className="toggle-locale" ><FiLogOut /></button>
            </li>
            
        </ul>
    </nav>
    );
}
Navigation.propTypes = {
    logout: PropTypes.func.isRequired,
  };

export default Navigation;