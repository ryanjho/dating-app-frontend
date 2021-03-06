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
                        <li>FIND LOVE</li>
                    </Link>
                    {!this.props.isLogIn ?
                        <React.Fragment>
                            <Link to="/login">
                                <li>LOG IN</li>
                            </Link>
                            <Link to="/signup">
                                <li>SIGN UP</li>
                            </Link>
                        </React.Fragment>
                        : <React.Fragment>
                            <Link to="/"><li onClick={this.props.logout}>SIGN OUT</li></Link>
                        </React.Fragment>

                    }
                </ul>
            </nav>
        )
    }
}

export default MainNavigation;