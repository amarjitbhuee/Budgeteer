import React from 'react';
import IndividualLinks from './IndividualLinks';
import { Link } from 'react-router-dom';

export const Links = () => {
    return (
        <div className="navContainer">
            <hr/>
            <Link to={ `/Help` }>Help & More Information</Link>
            <p className="note2">If you received an N/A or if any column is blank in any of your transactions you can simply edit them</p>
            <IndividualLinks />
        </div>
    )
}

export default Links;