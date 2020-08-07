import React, { Component } from 'react';
import { Form, Col, Row, Button, Alert } from 'react-bootstrap';
import FacebookIcon from '@material-ui/icons/Facebook';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
class LoginForm extends Component {
    
    render() {
        const currentEmail = this.props.currentEmail;
        const currentPassword = this.props.currentPassword;
        const error = this.props.error;
        const handleFormChange = this.props.handleFormChange;
        const handleFormSubmit = this.props.handleFormSubmit;
        const forgetPassword = this.props.forgetPassword;
        const isForgotPassword = this.props.isForgotPassword;
        const sendEmail = this.props.sendEmail
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
                    <p>
                        Log in with  <FacebookLogin
                            appId="577117482961429"
                            autoLoad
                            callback={this.props.responseFacebook}
                            fields="email"
                            scope="public_profile,email"
                            render={renderProps => (
                                <Button variant="outline-primary" onClick={renderProps.onClick}><FacebookIcon /></Button> 
                            )}
                        />
                    </p>
                    <Form.Group className="text-center">
                        <Button variant="outline-primary" onClick={forgetPassword}>Forget password?</Button>
                    </Form.Group>
                </Form>

                {/* FORGET PASSWORD */}
                {isForgotPassword ?
                    <Form className="login" onSubmit={sendEmail}>
                        <h2 className="text-center h2">FORGET PASSWORD</h2>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                                Email
                        </Form.Label>
                            <Col sm="8">
                                <Form.Control type="email" id="currentEmail" placeholder="enter your email" value={currentEmail} onChange={handleFormChange} required />
                            </Col>
                        </Form.Group>
                        <Form.Group className="text-center">
                            <Button type="submit" variant="primary">Send email</Button>
                        </Form.Group>
                    </Form>
                    : ''}

            </React.Fragment>
        )
    }
}

export default LoginForm;
