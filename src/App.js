import React, { Component } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import FAQ from './components/FAQ';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Footer from './components/Footer';
import Main from './components/Main';
import MatchModal from './components/MatchModal';
import NearByUsers from './components/NearByUsers';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import countries from 'countries-list';
import sessionService from './services/sessionService';
import usersService from './services/usersService';
import UserNavigation from './components/UserNavigation';

import Information from './components/information';

import Profile from './components/Profile';

import openSocket from 'socket.io-client';

import { ParallaxProvider } from 'react-scroll-parallax';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000'
const buildUrl = apiPath => {
    return BACKEND_URL + apiPath;
};

const socket = openSocket(BACKEND_URL); 

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: null,
      // Authentication
      currentUser: {},
      isLogIn: false,
      err: '',
      foundUsers: 0,
      position: {
        lat: null,
        long: null
      },
      users: [],
      nearByUsers: [],
      backgroundBlur: false
    }
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

  // Get filtered Users
  fetchUsers = async () => {
    const users = await usersService.getAll();
    const filterdUsers = users.filter(user => user.gender === this.state.currentUser.lookingForGender
      && user.age >= this.state.currentUser.lookingForAgeFrom
      && user.age <= this.state.currentUser.lookingForAgeTo)
    this.setState({
      users: filterdUsers,
      foundUsers: filterdUsers.length
    });

    return filterdUsers;
  }

  // Check User Authentication
  checkAuthentication = async () => {
    const result = await sessionService.checkAuthentication();

    if (result.isLogIn) {
      const currentUser = localStorage.getItem('currentUser');
      this.setState({
        isLogIn: true,
        currentUser: JSON.parse(currentUser)
      })
      this.fetchUsers();

      // Crete new socket room after check authentication
      console.log('creating new socket room from authentication');
      socket.emit('join', {id: this.state.currentUser._id});
    }
  }

  // Login
  login = async (currentUser) => {
    this.setState({
      currentUser: currentUser,
      isLogIn: true
    })
    this.fetchUsers();
    this.getLocation();

    // Crete new socket room
    console.log('creating new socket room');
    socket.emit('join', {id: currentUser._id});
  }

  // Logout
  logout = async () => {
    await sessionService.logOut();

    // update Log In situation of user in database
    await usersService.updateCompletionStatus(this.state.currentUser._id, {
      isLogIn: false,
      position: {
        lat: null,
        long: null
      }
    });

    // Reset Local Storage
    localStorage.clear();

    // Reset App State
    this.resetAppState();

  }

  // Reset Updated Current User
  resetUpdatedCurrentUser = () => {
    const currentUser = localStorage.getItem('currentUser');
    this.setState({
      currentUser: JSON.parse(currentUser)
    })
  }

  resetAppState = () => {
    this.setState({
      isLogIn: false,
      currentUser: '',
      redirect: '/',
      err: '',
      foundUsers: 0,
      position: {
        lat: null,
        long: null
      },
      users: []
    })
  }

  // Get Location
  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition)
    } else {
      console.log('Geolocation is not supported by this browser');
    }
  }

  // Get User's Position
  showPosition = async (position) => {
    this.setState({
      position: {
        lat: position.coords.latitude,
        long: position.coords.longitude
      }
    });
    // Update Log In situation of user in database
    await usersService.updateCompletionStatus(this.state.currentUser._id, {
      isLogIn: true,
      position: this.state.position
    })
  }


  // Calculate Distance
  distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 === lat2) && (lon1 === lon2)) {
      return 0;
    }
    else {
      let radlat1 = Math.PI * lat1 / 180;
      let radlat2 = Math.PI * lat2 / 180;
      let theta = lon1 - lon2;
      let radtheta = Math.PI * theta / 180;
      let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit === "K") { dist = dist * 1.609344 }
      if (unit === "N") { dist = dist * 0.8684 }
      return dist;
    }
  }

  // find near by users
  findNearByUser = async () => {
    const users = await usersService.getAll();
    const logInUsers = users.filter(user => user.isLogIn === true && user.gender === this.state.currentUser.lookingForGender);

    const lat1 = this.state.position.lat;
    const long1 = this.state.position.long;

    const nearByUsers = [];
    for (let i = 0; i < logInUsers.length; i++) {
      const lat2 = logInUsers[i].position.lat;
      const long2 = logInUsers[i].position.long
      const dist = Math.round(this.distance(lat1, long1, lat2, long2, 'K'));
      if (dist <= 2) nearByUsers.push({
        user: logInUsers[i],
        dist: dist
      });
    }
    this.setState({
      nearByUsers: nearByUsers
    })
    console.log(logInUsers);
  }
  // go to next user
  delete = async (id, filter) => {
    if (filter === "near") {
      const users = this.state.nearByUsers
      const index = users.findIndex(item => item.user._id === id)
      this.setState({
        nearByUsers: [
          ...users.slice(0, index),
          ...users.slice(index + 1)
        ]
      })
    } else {
      const users = this.state.users;
      const index = users.findIndex(item => item._id === id);
      this.setState({
        users: [
          ...users.slice(0, index),
          ...users.slice(index + 1)
        ]

      })
    }

  }

  // like a user
  likeUser = async (event) => {
    const likedUserId = event.currentTarget.getAttribute('a-key');
    const currentUserId = JSON.parse(localStorage.getItem('currentUser'))
    console.log(`${currentUserId._id} likes ${likedUserId} `);

    await usersService.likeUser(currentUserId._id, likedUserId);
    await socket.emit('checkMatch', { currentUserId: currentUserId._id, likedUserId: likedUserId});

    // Remove liked user from UI
    const users = this.state.users;
      const index = users.findIndex(item => item._id === likedUserId);
      this.setState({
        users: [
          ...users.slice(0, index),
          ...users.slice(index + 1)
        ]
      });
  }

  // show or close modal
   showModal = (event) => {
    this.setState({showMatchModal: !this.state.showMatchModal});
  }

  // When page is loaded
  componentDidMount() {
    this.getAllCountries();
    this.checkAuthentication();
    this.getLocation();

    // Retrieve data from socket.io server
    socket.on('matched', (data) => this.setState({matchModalContent: data, showMatchModal: true, backgroundBlur: true}));
  }

  render() {
    return (
      <ParallaxProvider>
      <Router>
        <div className="App">
          <div className="header-body">
             
              <Header
                isLogIn={this.state.isLogIn}
                logout={this.logout}
              />
              {this.state.isLogIn ? <UserNavigation findNearByUser={this.findNearByUser} /> : ''}
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/about" component={About} />
                <Route path="/FAQ" component={FAQ} />
                <Route path="/login" render={() =>
                  <Login
                    err={this.state.err}
                    currentUser={this.state.currentUser}
                    isLogIn={this.state.isLogIn}
                    login={this.login}
                    fetchUsers={this.fetchUsers}
                  />} />
                <Route path="/signup" render={() =>
                  <SignUp
                    countries={this.state.countries}
                  />
                }
                />
                <Route path='/users' render={() =>
                  <Main id={this.state.backgroundBlur ? 'blur' : ''}
                    isLogIn={this.state.isLogIn}
                    users={this.state.users}
                    foundUsers={this.state.foundUsers}
                    delete={this.delete}
                    likeUser={this.likeUser}
                  />
                }
                />

                <Route path='/near' render={() =>
                  <NearByUsers
                    isLogIn={this.state.isLogIn}
                    users={this.state.nearByUsers}
                    foundUsers={this.state.nearByUsers.length}
                    delete={this.delete}
                    findNearByUser={this.findNearByUser}

                    likeUser={this.likeUser}

                  />
                }
                />
              {/* <Route path="/profile/:id" render={(props) => 
                <Profile 
                  id={props.match.params.id}
                  isLogIn={this.state.isLogIn}
                  resetAppState={this.resetAppState}
                  countries={this.state.countries}
                  otherUser={true}
                  currentUser={this.state.currentUser}
                  
                /> */}
              } 
              />
              <Route path="/profile" render={() => 
                <Profile 
                  currentUser={this.state.currentUser}
                  isLogIn={this.state.isLogIn}
                  countries={this.state.countries}
                  otherUser={false}
                  resetUpdatedCurrentUser={this.resetUpdatedCurrentUser}
                />
              } 
              />
            </Switch>

          </div>
          <Information />
          <Footer />
          <MatchModal 
            matchModalContent={this.state.matchModalContent}
            showMatchModal={this.state.showMatchModal}
            showModal={this.showModal}
          />
        </div>
      </Router>
      </ParallaxProvider>
    )
  }
}

export default App;