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
            error: ''
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

        const currentUser = await sessionService.logIn(user);
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

    render() {
        return (
            <React.Fragment>
                { !this.props.isLogin ? 
                    <LoginForm 
                        currentEmail={this.state.currentEmail}
                        currentPassword={this.state.currentPassword}
                        error={this.state.error}
                        handleFormChange={this.handleFormChange}
                        handleFormSubmit={this.handleFormSubmit}
                    />
                     : <Redirect to="/users" />
                }
            </React.Fragment>
        )
    }
}
export default Login