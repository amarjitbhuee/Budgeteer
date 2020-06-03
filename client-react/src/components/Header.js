import React from 'react'; 
import Logo from '../assets/img/LogoType.png';
import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <div className="logos">
            <Link to={`/`}><img className="logo" src={Logo} alt="LogoType" /></Link>
            <h4 className="slogan">Experience Financial Freedom</h4>
        </div>
    )
}

export default Header