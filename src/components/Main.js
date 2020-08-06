import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
class ListUser extends Component {
    render() {
        return (
            <div>
                <h1 className="text-center">{this.props.foundUsers} users found</h1>

                {this.props.isLogIn ?
                    <div className="list">
                        {this.props.users ?
                            <div className="carousel-wrapper">
                                <Carousel className="carousel-style" showThumbs={false}>
                                    {this.props.users.map((user, index) => {
                                        return (
                                            <div className="user-image">
                                                <img width={300} height={480} src={user.image} alt={user.userName} className="image-user"/>
                                                <div>
                                                    <h5>{user.userName}</h5>
                                                    <p>{user.age}</p>
                                                    <p>{user.gender}</p>
                                                    <p>{user.location}</p>
                                                    <p><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-geo-alt" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                                    </svg> Lat: {user.position.lat} Long: {user.position.long}</p>
                                                    <button id={index} onClick={this.props.toggleEdit} className="btn btn-light">
                                                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" />
                                                            <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z" />
                                                        </svg>
                                                    </button>
                                                    <button a-key={user._id} onClick={this.props.delete} className="btn btn-light">
                                                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                        </svg>
                                                    </button>
                                                    <button a-key={user._id} onClick={this.props.likeUser} className="btn btn-light">
                                                        Like
                                    </button>
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
export default ListUser

