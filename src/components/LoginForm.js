import React, { Component } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
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
                    <div class="modal-body mx-3">
                        <div class="md-form mb-5">
                            <i class="fas fa-envelope prefix grey-text"></i>
                            <input type="email" id="currentEmail" placeholder="enter your email" value={currentEmail} onChange={handleFormChange} required className="form-control validate" />
                     
                        </div>

                        <div class="md-form mb-4">
                            <i class="fas fa-lock prefix grey-text"></i>
                            <input type="password" id="currentPassword" placeholder="Password" valuse={currentPassword} onChange={handleFormChange} required className="form-control validate" />
                           
                        </div>

                    </div>

                    <Form.Group className="text-center">
                        <Button type="submit" variant="primary">Log in</Button>
                    </Form.Group>
                    {error ?
                        <Alert variant='danger'>
                            {error}
                        </Alert> : ''}
                    <Form.Group className="text-center">

                        <FacebookLogin
                            appId="577117482961429"   
                            callback={this.props.responseFacebook}
                            fields="email"
                            scope="public_profile,email"
                            render={renderProps => (
                                <p>Log in with <Button variant="outline-primary"><FacebookIcon onClick={renderProps.onClick} /> </Button></p>
                            )}
                        />

                    </Form.Group>
                    <Form.Group className="text-center">
                        <Button variant="outline-info" onClick={forgetPassword}>Forget password?</Button>
                    </Form.Group>
                </Form>

                {/* FORGET PASSWORD */}
                {isForgotPassword ?
                    <Form className="login" onSubmit={sendEmail}>
                        <h2 className="text-center h2">FORGET PASSWORD</h2>
                        <div class="modal-body mx-3">
                            <div class="md-form mb-5">
                                <i class="fas fa-envelope prefix grey-text"></i>
                                <input type="email" id="currentEmail" placeholder="enter your email" value={currentEmail} onChange={handleFormChange} required className="form-control validate" />
                            </div>
                        </div>
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
