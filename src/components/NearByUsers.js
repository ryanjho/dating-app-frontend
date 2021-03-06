import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Redirect, Link } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
class NearByUsers extends Component {
    skipUser = (event) => {
        const id = event.currentTarget.getAttribute('a-key');
        this.props.delete(id,'near');
        console.log('near');
    }
    render() {
        return (
            <div>
                {this.props.isLogIn ?
                    <div>
                        <p className="text-center">{this.props.foundUsers} users found</p>
                       
                        {this.props.users ?
                            <div className="carousel-wrapper">
                                <Carousel className="carousel-style" showThumbs={false}>
                                    {this.props.users.map((user, index) => {
                                        return (
                                            <div className="user-image" key={index}>
                                                <img width={250} height={380} src={user.user.image} alt={user.userName} className="image-user" />
                                                <div>
                                                    <Link to={`/users/${user.user._id}`}>
                                                        <h4>{user.user.userName}</h4>
                                                    </Link>
                                                    {/* Name */}
                                                    <p><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-emoji-laughing" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                        <path fillRule="evenodd" d="M12.331 9.5a1 1 0 0 1 0 1A4.998 4.998 0 0 1 8 13a4.998 4.998 0 0 1-4.33-2.5A1 1 0 0 1 4.535 9h6.93a1 1 0 0 1 .866.5z" />
                                                        <path d="M7 6.5c0 .828-.448 0-1 0s-1 .828-1 0S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 0-1 0s-1 .828-1 0S9.448 5 10 5s1 .672 1 1.5z" />
                                                    </svg>{user.age}</p>
                                                    {/* Gender */}
                                                    <p><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-person" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                                    </svg> {user.user.gender}</p>
                                                    {/* Where */}
                                                    <p><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-geo-alt" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                                    </svg> {user.dist} Km </p>

                                                    {/* ACTION */}
                                                    <div className="sub-nav">
                                                        {/* ignore user */}
                                                        <Button a-key={user.user._id} onClick={this.skipUser} variant="btn btn-light">
                                                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z" />
                                                                <path fillRule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z" />
                                                            </svg>
                                                        </Button>

                                                        {/* message */}
                                                        <Button variant="btn btn-light">
                                                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chat-text" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                                                                <path fillRule="evenodd" d="M4 5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8zm0 2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z" />
                                                            </svg>
                                                        </Button>

                                                        {/* Like user */}
                                                        <Button a-key={user._id} onClick={this.props.likeUser} variant="btn btn-light">
                                                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-suit-heart" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" d="M8 6.236l.894-1.789c.222-.443.607-1.08 1.152-1.595C10.582 2.345 11.224 2 12 2c1.676 0 3 1.326 3 2.92 0 1.211-.554 2.066-1.868 3.37-.337.334-.721.695-1.146 1.093C10.878 10.423 9.5 11.717 8 13.447c-1.5-1.73-2.878-3.024-3.986-4.064-.425-.398-.81-.76-1.146-1.093C1.554 6.986 1 6.131 1 4.92 1 3.326 2.324 2 4 2c.776 0 1.418.345 1.954.852.545.515.93 1.152 1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z" />
                                                            </svg>
                                                        </Button>
                                                    </div>

                                                </div>
                                            </div>
                                        )
                                    })}
                                </Carousel>
                            </div> : <p>No user is suitable for what you are looking for</p>}
                    </div>
                    : <Redirect to='/login' />
                }
            </div>
        )
    }
}
export default NearByUsers

