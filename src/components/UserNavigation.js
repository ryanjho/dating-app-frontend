import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserNavigation extends Component {
    render() {
        return (
            <div className="user-navigation">
                <nav className="user-navigation-icons">
                    <ul className="user-navigation-links">
                        <li>
                            <Link to="/users">
                                <div>
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-geo-alt" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                    </svg>
                                    <h6>Nearby</h6>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/likes">
                                <div>
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-heart-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                    </svg>
                                    <h6>Likes</h6>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/messages">
                                <div>
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chat-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z" />
                                    </svg>
                                    <h6>Messages</h6>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/notifications">
                                <div>
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-bell-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
                                    </svg>
                                    <h6>Notifications</h6>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile">
                                <div>
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-person-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                    </svg>
                                    <h6>Profile</h6>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default UserNavigation
