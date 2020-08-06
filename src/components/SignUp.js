import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import SignUpForm from './SignUpForm';
import usersService from '../services/usersService';

export class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            userName: '',
            age: 18,
            image: '',
            location: '',
            password: '',
            female: false,
            male: true,
            lookingForFemale: true,
            lookingForMale: false,
            lookingForAgeFrom: 18,
            lookingForAgeTo: 30,
            isSignup: false,
            newUser: {}
        }
    }

    // Upload Image
    uploadImage = async () => {
        const file = Array.from(this.state.image)[0];
        const formData = new FormData();
        formData.append('file', file);
        const image = await usersService.uploadImage(formData);
        return image;
    }

    // Handle Form Input Change
    handleFormChange = event => {
        event.target.id !== 'image' ? this.setState({ [event.target.id]: event.target.value }) : this.setState({ [event.target.id]: event.target.files });
    }

    // Handle Form Submit
    handleFormSubmit = async(event) => {
        event.preventDefault();
        // this.getLocation();
        const newUser = await this.createNewUser();
         // Add New User To Database
         await usersService.create(newUser);
         this.setState({
            email: '',
            userName: '',
            age: 18,
            image: '',
            location: '',
            password: '',
            female: false,
            male: true,
            lookingForFemale: true,
            lookingForMale: false,
            lookingForAgeFrom: 18,
            lookingForAgeTo: 30,
            isSignUp: true
        });
    }

    // Create New User
    createNewUser = async () => {
        const image = await this.uploadImage();

        this.setState({
            image: image.url
        })

        // set information of new account
        const newUser = {
            email: this.state.email,
            userName: this.state.userName,
            age: parseInt(this.state.age),
            image: this.state.image,
            location: this.state.location,
            lookingForAgeFrom: parseInt(this.state.lookingForAgeFrom),
            lookingForAgeTo: parseInt(this.state.lookingForAgeTo),
            password: this.state.password
        };

        // set gender
        this.state.female ? newUser.gender = "Female" : newUser.gender = "Male";
        this.state.lookingForFemale ? newUser.lookingForGender = "Female" : newUser.lookingForGender = "Male";

        return newUser;
    }

    // Toggle User Gender During Sign Up
    toggleGender = () => {
        this.setState({
            female: !this.state.female,
            male: !this.state.male
        })
    }

    // Toggle Looking For Gender During Sign Up
    toggleLookingForGender = () => {
        this.setState({
            lookingForFemale: !this.state.lookingForFemale,
            lookingForMale: !this.state.lookingForMale
        })
    }

    render() {
        return (
            <div>
                { !this.state.isSignUp ? 
                <SignUpForm 
                    countries={this.props.countries}
                    newUser={this.state}                     
                    toggleGender={this.toggleGender}
                    toggleLookingForGender={this.toggleLookingForGender}
                    handleFormChange={this.handleFormChange}
                    handleFormSubmit = {this.handleFormSubmit}
                /> 
                : <Redirect to='/login' /> }
            </div>
        )
    }
}

export default SignUp;
