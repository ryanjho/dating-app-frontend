import React, { Component } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';

export class EditProfileForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        const { userName, age, location, female, male, lookingForFemale, lookingForMale, lookingForAgeFrom, lookingForAgeTo } = this.props.editingUser;
        const countries = this.props.countries;
        const toggleEdit = this.props.toggleEdit;
        const toggleGender = this.props.toggleGender;
        const toggleLookingForGender=this.props.toggleLookingForGender;
        const handleFormChange = this.props.handleFormChange;
        const handleFormSubmit = this.props.handleFormSubmit;

        return (
            <React.Fragment>
                <Form onSubmit={handleFormSubmit} className="edit-form">
                    <h2 className="text-center h2">EDIT PROFILE INFORMATION</h2>
                    <Form.Group as={Row}>
                        <Form.Label column sm={4}>UserName</Form.Label>
                        <Col sm={8}>
                            <Form.Control type="string" placeholder="Enter user name" id="userName" value={userName} onChange={handleFormChange} required />
                        </Col>
                    </Form.Group>
                    
                    <Form.Group as={Row}>
                        <Form.Label column sm={4}>Age</Form.Label>
                        <Col sm={8}>
                            <Form.Control type="number" id="age" value={age} onChange={handleFormChange} min='18' required />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={4}>Location</Form.Label>
                        <Col sm={8}>
                            <input type="text" name="name" list="countries" value={location} placeholder="Enter your location" id="location" onChange={handleFormChange} />
                            <datalist id="countries">
                                {countries ?
                                    countries.map((country, key) => {
                                        return (
                                            <option key={key}>{country.name}</option>
                                        )
                                    }) : ''}
                            </datalist>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={4}>Gender</Form.Label>
                        <Col>
                            <Form.Check inline label="Female" id="female" checked={female} onChange={toggleGender} />
                            <Form.Check inline label="Male" id="male" checked={male} onChange={toggleGender} />
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
                                    <Form.Control type="number" id="lookingForAgeFrom" value={lookingForAgeFrom} onChange={handleFormChange} min="18" required />
                                </Col>
                                <Form.Label column sm={2}>To</Form.Label>
                                <Col sm={4}>
                                    <Form.Control type="number" id="lookingForAgeTo" value={lookingForAgeTo} onChange={handleFormChange} min="18" required />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Form.Group>

                    
                    <Form.Group className="text-center">
                        <Button variant="secondary" onClick={toggleEdit}>Cancel</Button>
                        <Button variant="primary" type="submit">Save</Button>
                    </Form.Group>

                </Form>
            </React.Fragment>
        )
    }
}

export default EditProfileForm
