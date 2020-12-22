import {Link} from "react-router-dom"
import React from "react";

function Header() {
    return (
        <header>
            <ul>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/">Main Page</Link></li>
            </ul>
        </header>
    )
}
export default Header;