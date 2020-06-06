import React from 'react';
import IndividualLinks from './IndividualLinks';

export const Links = () => {
    return (
        <div className="navContainer">
            <hr/>
            <h4 className="navTitle">View Transactions</h4>
            <p className="note2">If you received an N/A or if any column is blank in any of your transactions you can simply edit them</p>
            <IndividualLinks />
        </div>
    )
}

export default Links;