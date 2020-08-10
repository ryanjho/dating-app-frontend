import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import usersService from '../services/usersService';
import EditProfileForm from './EditProfileForm';
import { Redirect, Link, useParams } from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            userName: '',
            age: 18,
            location: '',
            female: false,
            male: false,
            lookingForFemale: true,
            lookingForMale: false,
            lookingForAgeFrom: 18,
            lookingForAgeTo: 30,
            err: null
        }
    }

    toggleEdit = event => {
        const currentUser = this.props.currentUser;
        this.setState({
            isEditing: !this.state.isEditing,
            userName: currentUser.userName,
            age: currentUser.age,
            location: currentUser.location,
            lookingForFemale: currentUser.lookingForFemale,
            lookingForMale: currentUser.lookingForMale,
            lookingForAgeFrom: currentUser.lookingForAgeFrom,
            lookingForAgeTo: currentUser.lookingForAgeTo,
            err: null
        })

        currentUser.gender === 'male' ? this.setState({ male: true }) : this.setState({ female: true });
        currentUser.lookingForGender === 'male' ? this.setState({ lookingForMale: true }) : this.setState({ lookingForFemale: true });
    }

    // Toggle User Gender During Edit
    toggleGender = () => {
        this.setState({
            female: !this.state.female,
            male: !this.state.male
        })
    }

    // Toggle Looking For Gender During Edit
    toggleLookingForGender = () => {
        this.setState({
            lookingForFemale: !this.state.lookingForFemale,
            lookingForMale: !this.state.lookingForMale
        })
    }

    // Handle Form Input Change
    handleFormChange = event => {
        this.setState({ [event.target.id]: event.target.value });
    }

    // Handle Form Submit
    handleFormSubmit = async event => {
        event.preventDefault();
        const updatedInformation = this.updateUser();

        // Update User Information In Database
        const data = await usersService.update(this.props.currentUser._id, updatedInformation);
        // const updatedUser = data.updatedDocument;

        if (data.err) this.setState({ err: data.err });

        this.setState({
            isEditing: false,
            email: '',
            userName: '',
            age: 18,
            location: '',
            female: false,
            male: false,
            lookingForFemale: false,
            lookingForMale: false,
            lookingForAgeFrom: 18,
            lookingForAgeTo: 30
        });

        const currentUserId = JSON.parse(localStorage.getItem('currentUser'))._id;
        // Clear Local Storage
        localStorage.clear();
        const updatedCurrentUser = await usersService.getOne(currentUserId);

        // Reset Local Storage
        localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));

        // Reset Current User In App State
        this.props.resetUpdatedCurrentUser();
    }

    // Return Updated User Information
    updateUser = () => {
        // set information of new account
        const updatedInformation = {
            userName: this.state.userName,
            age: parseInt(this.state.age),
            location: this.state.location,
            lookingForAgeFrom: parseInt(this.state.lookingForAgeFrom),
            lookingForAgeTo: parseInt(this.state.lookingForAgeTo)
        };

        // Update Gender
        this.state.female ? updatedInformation.gender = "Female" : updatedInformation.gender = "Male";
        this.state.lookingForFemale ? updatedInformation.lookingForGender = "Female" : updatedInformation.lookingForGender = "Male";

        return updatedInformation;
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
                        <h1 className="text-center">{this.props.otherUser ? `${user.userName}'s` : "My"} Profile</h1>
                        {!this.state.isEditing ?
                            <div className="user-profile">
                                <img width={450} height={420} src={user.image} alt={user.userName} className="profile-image" />
                                <div>
                                    <h4 className="bolder">{user.userName}</h4>
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
                                {this.props.otherUser ? '' :
                                    <div className="user-actions">
                                        <Button className="edit-profile-button" variant="primary" onClick={this.toggleEdit}><EditIcon /></Button>
                                        <Link to="/"><Button variant="danger" onClick={this.deleteUser}><DeleteForeverIcon /></Button></Link>
                                    </div>
                                }
                            </div>
                            : <EditProfileForm
                                editingUser={this.state}
                                countries={this.props.countries}
                                toggleEdit={this.toggleEdit}
                                toggleGender={this.toggleGender}
                                toggleLookingForGender={this.toggleLookingForGender}
                                handleFormChange={this.handleFormChange}
                                handleFormSubmit={this.handleFormSubmit}
                            />
                        }
                    </React.Fragment>
                    : <Redirect to="/" />
                }
            </div>
        )
    }
}

export default Profile;
