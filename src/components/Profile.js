import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import usersService from '../services/usersService';
import EditProfileForm from './EditProfileForm';
import { Redirect, Link, useParams } from "react-router-dom";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            otherUserDetails: {}
        }
    }

    toggleEdit = event => {
        this.setState({
            isEditing: !this.state.isEditing
        })
    }

    // Delete User
    deleteUser = async (event) => {
        const user = this.props.currentUser;
        await usersService.delete(user._id);

        // Clear Local Storage
        localStorage.clear();

        // Reset App State
        this.props.resetAppState();
    }

    fetchUser = async (id) => {
        const otherUser = await usersService.getOne(id);
        this.setState({
          otherUserDetails: otherUser,
        });
    
        return otherUser;
    }

    componentDidMount() {
        this.fetchUser(this.props.id);
    }

    render() {
        let user = {};
        if (this.props.otherUser === true) {
            user = this.state.otherUserDetails;
        } else {
            user = this.props.currentUser;
        }
        return (
            <div className="container">
                {this.props.isLogIn ?
                    <React.Fragment>
                        <h1 className="text-center">{this.props.otherUser ? `${user.userName}'s` : "My" } Profile</h1>
                        {this.props.otherUser ? '' :
                            <div className="user-actions">
                                <Button className="edit-profile-button" variant="primary" onClick={this.toggleEdit}>Edit</Button>
                                <Link to="/"><Button variant="danger" onClick={this.deleteUser}>Delete</Button></Link>
                            </div>
                        }
                        { !this.state.isEditing ? 
                           <div className="user-profile">
                           <img width={250} height={380} src={user.image} alt={user.userName} className="profile-image" />
                           <div>
                               <h4>{user.userName}</h4>
                               {/* Email Address */}
                               <p>Email: {user.email}</p>
                               {/* Name */}
                               <p><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-emoji-laughing" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                   <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                   <path fillRule="evenodd" d="M12.331 9.5a1 1 0 0 1 0 1A4.998 4.998 0 0 1 8 13a4.998 4.998 0 0 1-4.33-2.5A1 1 0 0 1 4.535 9h6.93a1 1 0 0 1 .866.5z" />
                                   <path d="M7 6.5c0 .828-.448 0-1 0s-1 .828-1 0S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 0-1 0s-1 .828-1 0S9.448 5 10 5s1 .672 1 1.5z" />
                               </svg> Age: {user.age}</p>
                               {/* Gender */}
                               <p><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-person" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                   <path fillRule="evenodd" d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                               </svg> Gender: {user.gender}</p>
                               {/* Where */}
                               <p><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-geo-alt" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                   <path fillRule="evenodd" d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                               </svg> {user.location} </p>
                               <p>Looking For: {user.lookingForGender}</p>
                               <p>From: {user.lookingForAgeFrom} years old  To: {user.lookingForAgeTo} years old</p>
                           </div>
                       </div> 
                        :   'Edit Profile Form'
                    }
                        
                    </React.Fragment>
                    : <Redirect to="/" />
                }
            </div>
        )
    }
}

export default Profile;
