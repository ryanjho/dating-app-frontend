import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import sessionService from '../services/sessionService';
import LoginForm from './LoginForm';

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
    forgetPassword = () => {
        this.setState({
            isForgotPassword: true
        })
    }

    sendEmail = () => {
        this.setState({
            isForgotPassword: false
        })
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
                        forgetPassword={this.forgetPassword}
                        isForgotPassword={this.state.isForgotPassword}
                        sendEmail={this.sendEmail}
                        responseFacebook={this.responseFacebook}
                    />
                    : <Redirect to="/users" />
                }
            </React.Fragment>
        )
    }
}
export default Login