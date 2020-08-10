import React, { Component } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';

export class SignUpForm extends Component {
    render() {
        const { email, password, userName, age, location, female, male, lookingForFemale, lookingForMale, lookingForAgeFrom, lookingForAgeTo } = this.props.newUser;
        const countries = this.props.countries;
        const toggleGender = this.props.toggleGender;
        const toggleLookingForGender = this.props.toggleLookingForGender;
        const handleFormChange = this.props.handleFormChange;
        const handleFormSubmit = this.props.handleFormSubmit;

        return (
            <React.Fragment>
                <Form onSubmit={handleFormSubmit} className="signup-form">
                    <h2 className="text-center h2">SIGN UP</h2>
                    <div class="modal-body mx-3">
                        <div class="md-form mb-5">
                            <i class="fas fa-envelope prefix grey-text"></i>
                            <input type="email" placeholder="Enter email" id="email" value={email} onChange={handleFormChange} required className="form-control validate" />
                        </div>

                        <div class="md-form mb-4">
                            <i class="fas fa-lock prefix grey-text"></i>
                            <input type="password" placeholder="Password" id="password" value={password} onChange={handleFormChange} required className="form-control validate" />

                        </div>

                        <div class="md-form mb-5">
                            <i class="fas fa-user prefix grey-text"></i>
                            <input type="string" placeholder="Enter user name" id="userName" value={userName} onChange={handleFormChange} required className="form-control validate" />
                        </div>

                        <div class="md-form mb-5">
                            <i class="fas fa-child prefix grey-text"></i>
                            <input type="number" id="age" value={age} onChange={handleFormChange} min='18' required className="form-control validate" />
                        </div>

                        <div class="md-form mb-5">
                            <i class="fas fa-globe-americas prefix grey-text"></i>
                            <input type="text" name="name" list="countries" value={location} placeholder="Enter your location" id="location" onChange={handleFormChange} className="form-control validate" />
                            <datalist id="countries">
                                {countries ?
                                    countries.map((country, key) => {
                                        return (
                                            <option key={key}>{country.name}</option>
                                        )
                                    }) : ''}
                            </datalist>

                        </div>
                        <Form.Group as={Row}>
                            <Form.Label column sm={2}><i class="fas fa-transgender-alt prefix grey-text"></i></Form.Label>
                            <Col>
                                <Form.Check inline label="Female" id="female" checked={female} onChange={toggleGender} />
                                <Form.Check inline label="Male" id="male" checked={male} onChange={toggleGender} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} encType="multipart/form-data">
                            <Form.Label column sm={2}><i class="far fa-image prefix grey-text"></i></Form.Label>
                            <Col sm={8}>
                                <Form.Control type="file" onChange={handleFormChange} id="image" required />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm={4}>What are you looking for</Form.Label>
                            <Col sm={8}>
                                <Form.Check inline label="Female" checked={lookingForFemale} onChange={toggleLookingForGender} />

                                <Form.Check inline label="Male" checked={lookingForMale} onChange={toggleLookingForGender} />

                                <Form.Group as={Row}>
                                    <Form.Label column sm={2}>From</Form.Label>
                                    <Col sm={4}>
                                        <Form.Control type="number" id="lookingForAgeFrom" value={lookingForAgeFrom} onChange={handleFormChange} min="18" className="age" required />
                                    </Col>
                                    <Form.Label column sm={2}>To</Form.Label>
                                    <Col sm={4}>
                                        <Form.Control type="number" id="lookingForAgeTo" value={lookingForAgeTo} onChange={handleFormChange} min="18" className="age" required />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Form.Group>
                    </div>


                    <Form.Group className="text-center">
                        <Button variant="primary" type="submit"> Submit</Button>
                    </Form.Group>

                </Form>
            </React.Fragment >
        )
    }
}

export default SignUpForm;
