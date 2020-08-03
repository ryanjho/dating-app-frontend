import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MainNavigation extends Component {
    render() {
        return (
            <nav className="main-navigation">
                <ul className="main-navigation-links">
                    <Link to="/about">
                        <li>ABOUT US</li>
                    </Link>
                    <Link to="/faq">
                        <li>FAQ</li>
                    </Link>
                    <Link to="/users">
                        <li>USERS</li>
                    </Link>
                    <Link to="/login">
                        <li>LOG IN</li>
                    </Link>
                    <Link to="/signup">
                        <li>SIGN UP</li>
                    </Link>
                    
                </ul>
            </nav>
        )
    }
}

export default MainNavigation;