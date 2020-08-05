import React, { Component } from 'react';
import { Form, Col, Row, Button, Alert } from 'react-bootstrap';

class LoginForm extends Component {
    render() {
        const currentEmail = this.props.currentEmail;
        const currentPassword = this.props.currentPassword;
        const error = this.props.error;
        const handleFormChange = this.props.handleFormChange;
        const handleFormSubmit = this.props.handleFormSubmit;

        return (
            <React.Fragment>
                <Form className="login" onSubmit={handleFormSubmit}>
                    <h2 className="text-center h2">LOG IN</h2>
                    <Form.Group as={Row}>
                        <Form.Label column sm="4">
                            Email
                            </Form.Label>
                        <Col sm="8">
                            <Form.Control type="email" id="currentEmail" placeholder="enter your email" value={currentEmail} onChange={handleFormChange} required />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="4">
                            Password
                            </Form.Label>
                        <Col sm="8">
                            <Form.Control type="password" id="currentPassword" placeholder="Password" valuse={currentPassword} onChange={handleFormChange} required />
                        </Col>
                    </Form.Group>

                    <Form.Group className="text-center">
                        <Button type="submit" variant="primary">Log in</Button>
                    </Form.Group>
                    {error ?
                        <Alert variant='danger'>
                            {error}
                        </Alert> : ''}
                </Form>
            </React.Fragment>
        )
    }
}

export default LoginForm;
