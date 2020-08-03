import React, { Component } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import FAQ from './components/FAQ';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Footer from './components/Footer';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import countries from 'countries-list';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

      // New User Sign up
      email: '',
      userName: '',
      age: 18,
      image: '',
      location: '',
      password: '',
      gender: {
        female: false,
        male: true
      },
      lookingForGender: {
        lookingForFemale: true,
        lookingForMale: false
      },
      lookingForAgeFrom: 18,
      lookingForAgeTo: 30,
      position: {
        lat: null,
        long: null
      }
      countries: null
    }
  }

  // Handle Form Input Change
  handleFormChange = event => {
    event.target.id !== 'image' ? this.setState( { [event.target.id ] : event.target.value }) : this.setState( { [event.target.id] : event.target.files});
  }

  // Handle Form Submit
  handleFormSubmit = event => {
    event.preventDefault();
    this.getLocation();
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
      gender: {
        female: !this.state.gender.female,
        male: !this.state.gender.male
      }
    })
  }

  // Toggle Looking For Gender During Sign Up
  toggleLookingForGender = () => {
    this.setState({
      lookingForGender: {
        lookingForFemale: !this.state.lookingForGender.lookingForFemale,
        lookingForMale: !this.state.lookingForGender.lookingForMale
      }
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
    return (
      <Router>
        <div className="App">
          <div className="header-body">
            <Header />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/about" component={About} />
              <Route path="/FAQ" component={FAQ} />
              <Route path="/login" component={Login} />
              <Route path="/signup" render={ (props) =>  
                <SignUp 
                  countries={this.state.countries}
                  gender={this.state.gender}
                  lookingForGender={this.state.lookingForGender}

                  toggleGender={this.toggleGender}
                  toggleLookingForGender={this.toggleLookingForGender}
                  handleFormChange={this.handleFormChange} 
                  handleFormSubmit={this.handleFormSubmit}
                />
              } 
              />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;