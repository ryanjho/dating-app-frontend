import React, { Component } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import FAQ from './components/FAQ';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Footer from './components/Footer';
import Main from './components/Main';
import NearByUsers from './components/NearByUsers';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import countries from 'countries-list';
import sessionService from './services/sessionService';
import usersService from './services/usersService';
import UserNavigation from './components/UserNavigation';
import Profile from './components/Profile';

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
      nearByUsers: []
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

    // reset localStoreage
    localStorage.clear();
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
      nearByUsers.push({
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
    likeUser = async(event) => {
      const likedUserId = event.currentTarget.getAttribute('a-key');
      const currentUserId = JSON.parse(localStorage.getItem('currentUser'))
      console.log(`${currentUserId._id} likes ${likedUserId} `);
      await usersService.likeUser(currentUserId._id, likedUserId);
      // await socket.emit('checkMatch', { currentUserId: currentUserId._id, likedUserId: likedUserId});
  }

  // When page is loaded
  componentDidMount() {
    this.getAllCountries();
    this.checkAuthentication();
    this.getLocation();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="header-body">
            <Header
              isLogIn={this.state.isLogIn}
              logout={this.logout}
            />
            { this.state.isLogIn ? <UserNavigation /> : ''}
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
                <Main
                  isLogIn={this.state.isLogIn}
                  users={this.state.users}
                  foundUsers={this.state.foundUsers}
                  delete={this.delete}
                  likeUser={this.likeUser}
                  findNearByUser={this.findNearByUser}
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

              <Route path="/profile" render={() => 
                <Profile currentUser={this.state.currentUser}/>
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