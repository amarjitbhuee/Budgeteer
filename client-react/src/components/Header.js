import React from 'react'; 
import Logo from '../assets/img/LogoType.png'

export const Header = () => {
    return (
        <div>
            <img src={Logo} alt="LogoType" />
            <h4>Experience Financial Freedom</h4>
        </div>
    )
}

export default Header