import {Link} from "react-router-dom"
import React from "react";

function Header() {
    return (
        <header>
            <ul>
                <Link to="/home"><li>Home</li></Link>
                <Link to="/login"><li>Login</li></Link>
                <Link to="/"><li>Main Page</li></Link>
            </ul>
        </header>
    )
}
export default Header;