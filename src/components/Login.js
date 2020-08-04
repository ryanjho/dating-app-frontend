import React, { Component } from 'react';
import { Form, Col, Row, Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentEmail: '',
            currentPassword: ''
        }
    }

    // Handle Form Input Change
    handleFormChange = event => {
        this.setState({ [event.target.id]: event.target.value });
    }

    render() {
        return (
            <React.Fragment>
                {!this.props.isLogIn ?
                    <Form className="login" onSubmit={this.props.logIn}>
                        <h2 className="text-center h2">LOG IN</h2>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                                Email
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="email" id="currentEmail" placeholder="enter your email" value={this.state.currentEmail} onChange={this.handleFormChange} required />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                                Password
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="password" id="currentPassword" placeholder="Password" valuse={this.state.currentPassword} onChange={this.handleFormChange} required />
                            </Col>
                        </Form.Group>

                        <Form.Group className="text-center">
                            <Button type="submit" variant="primary">Log in</Button>
                        </Form.Group>
                        {this.props.err ?
                            <Alert variant='danger'>
                                {this.props.err}
                            </Alert> : ''}

                    </Form> : <Redirect to={this.props.redirect} />
                }


            </React.Fragment>
        )
    }
}
export default Login