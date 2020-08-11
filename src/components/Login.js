import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import sessionService from '../services/sessionService';
import LoginForm from './LoginForm';
import usersService from '../services/usersService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentEmail: '',
            currentPassword: '',
            error: '',
            isForgotPassword: false
        }
    }

    // Handle Form Input Change
    handleFormChange = event => {
        this.setState({ [event.target.id]: event.target.value });
    }

    // Handle Form Submit
    handleFormSubmit = async event => {
        event.preventDefault();
        const user = {
            email: this.state.currentEmail,
            password: this.state.currentPassword
        }

       this.logInSubmit(user)
    }

    logInSubmit = async (user, tool) => {
        let currentUser = undefined;
        tool === "facebook" ? currentUser = await sessionService.logInWithFb(user) : currentUser = await sessionService.logIn(user);
        if (!currentUser.err) {
            // Set currentUser to Local Storage
            localStorage.setItem('currentUser', JSON.stringify(currentUser));

            this.setState({
                currentEmail: '',
                currentPassword: '',
            });
            this.props.login(currentUser);

        } else {
            this.setState({
                error: currentUser.err
            });
        }
    }
    toggleForgetPassword = () => {
        this.setState({
            isForgotPassword: !this.state.isForgotPassword
        })
    }

    forgetPasswordSubmit = async (event) => {
        event.preventDefault();
        console.log('Forget Password Submit Clicked');
        const user = await usersService.resetUserPassword({ email: this.state.currentEmail });
        if (!user.err) {
            console.log('Put Request Successful', user)
        } else {
            this.setState({
                error: user.err
            })
        }
    }

    responseFacebook = async (response) => {
        const data = await sessionService.getDataFacebook({ accessToken: response.accessToken})
        console.log(data);
        this.logInSubmit({
            email: data.email
        }, 'facebook')
    }

    render() {
        return (
            <React.Fragment>
                {!this.props.isLogIn ?
                    <LoginForm
                        currentEmail={this.state.currentEmail}
                        currentPassword={this.state.currentPassword}
                        error={this.state.error}
                        handleFormChange={this.handleFormChange}
                        handleFormSubmit={this.handleFormSubmit}
                        toggleForgetPassword={this.toggleForgetPassword}
                        isForgotPassword={this.state.isForgotPassword}
                        forgetPasswordSubmit={this.forgetPasswordSubmit}
                        responseFacebook={this.responseFacebook}
                    />
                    : <Redirect to="/users" />
                }
            </React.Fragment>
        )
    }
}
export default Login