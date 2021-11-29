import React, {useContext} from 'react';

import './Navigation.css';
import AuthContext from "../Store/AuthContext";

const Navigation = (props) => {
    const ctx = useContext(AuthContext);
    return (
        <nav className="nav">
            <ul>
                {ctx.isLoggedIn && (
                    <li>
                        <a href="/">Users</a>
                    </li>
                )}
                {ctx.isLoggedIn && (
                    <li>
                        <a href="/">Admin</a>
                    </li>
                )}
                {ctx.isLoggedIn && (
                    <li>
                        <button onClick={ctx.onLogout}>Logout</button>
                    </li>
                )}
            </ul>
        </nav>
    )

};

export default Navigation;
