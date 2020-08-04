import React, { Component } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import countries from 'countries-list';
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
            position: {
                lat: null,
                long: null
            },
            countries: null
        }
    }

    // Handle Form Input Change
    handleFormChange = event => {
        event.target.id !== 'image' ? this.setState({ [event.target.id]: event.target.value }) : this.setState({ [event.target.id]: event.target.files });
    }

    // Handle Form Submit
    handleFormSubmit = event => {
        event.preventDefault();
        this.getLocation();
    }

    // Upload Image
    uploadImage = async () => {
        const file = Array.from(this.state.image)[0];
        const formData = new FormData();
        formData.append('file', file);
        const image = await usersService.uploadImage(formData);
        return image;
    }

    // Get Location
    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition)
        } else {
            console.log('Geolocation is not supported by this browser');
        }
    }

    // Get New User Position
    showPosition = async (position) => {
        const latitude = await position.coords.latitude;
        const longitude = await position.coords.longitude;
        this.setState({
            lat: latitude,
            long: longitude
        })
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

    // Get All Countries
    getAllCountries = () => {
        const allCountries = [];
        for (let key in countries.countries) {
            allCountries.push(countries.countries[key]);
        }
        this.setState({
            countries: allCountries
        })
    }

    // On Page Load
    componentDidMount() {
        this.getAllCountries();
    }

    render() {

        const { email, password, userName, age, location, countries, female, male, lookingForFemale, lookingForMale, lookingForAgeFrom, lookingForAgeTo } = this.state;

        return (
            <div>
                <Form onSubmit={this.props.handleFormSubmit} id="signup-form">
                    <h2 className="text-center h2">CREATE NEW ACCOUNT</h2>

                    <Form.Group as={Row}>
                        <Form.Label column sm={4}>Email</Form.Label>
                        <Col sm={8}>
                            <Form.Control type="email" placeholder="Enter email" id="email" value={email} onChange={this.handleFormChange} required />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={4}>Password</Form.Label>
                        <Col sm={8}>
                            <Form.Control type="password" placeholder="Password" id="password" value={password} onChange={this.handleFormChange} required />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={4}>UserName</Form.Label>
                        <Col sm={8}>
                            <Form.Control type="string" placeholder="Enter user name" id="userName" value={userName} onChange={this.handleFormChange} required />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={4}>Age</Form.Label>
                        <Col sm={8}>
                            <Form.Control type="number" id="age" value={age} onChange={this.handleFormChange} min='18' required />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={4}>Location</Form.Label>
                        <Col sm={8}>
                            <input type="text" name="name" list="countries" value={location} placeholder="Enter your location" id="location" onChange={this.handleFormChange} />
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
                            <Form.Check inline label="Female" id="female" checked={female} onChange={this.toggleGender} />
                            <Form.Check inline label="Male" id="male" checked={male} onChange={this.toggleGender} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} encType="multipart/form-data">
                        <Form.Label column sm={4}>Avatar</Form.Label>
                        <Col sm={8}>
                            <Form.Control type="file" onChange={this.handleFormChange} id="image" required />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={4}>What are you looking for</Form.Label>
                        <Col sm={8}>
                            <Form.Check inline label="Female" checked={lookingForFemale} onChange={this.toggleLookingForGender} />

                            <Form.Check inline label="Male" checked={lookingForMale} onChange={this.toggleLookingForGender} />

                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>From</Form.Label>
                                <Col sm={4}>
                                    <Form.Control type="number" id="lookingForAgeFrom" value={lookingForAgeFrom} onChange={this.handleFormChange} min="18" required />
                                </Col>
                                <Form.Label column sm={2}>To</Form.Label>
                                <Col sm={4}>
                                    <Form.Control type="number" id="lookingForAgeTo" value={lookingForAgeTo} onChange={this.handleFormChange} min="18" required />
                                </Col>
                            </Form.Group>
                        </Col>
                    </Form.Group>

                    <Form.Group className="text-center">
                        <Button variant="primary" type="submit"> Submit</Button>
                    </Form.Group>

                </Form>

            </div>
        )
    }
}

export default SignUp;
