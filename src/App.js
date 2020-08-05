import React, { Component } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import FAQ from './components/FAQ';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Footer from './components/Footer';
import Main from './components/Main';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import countries from 'countries-list';
import sessionService from './services/sessionService';
import usersService from './services/usersService';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: null,
      // Authentication
      currentUser: {},
      isLogIn: false,
      err: '',
      users: [],
      foundUsers: 0,
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

      // Update Log In situation of user in database
      await usersService.updateCompletionStatus(this.state.currentUser._id, {
        isLogIn: true
    })
  }

  // Logout
  logout = async () => {
    await sessionService.logOut();
        // reset localStoreage
        localStorage.clear();
        this.setState({
            isLogIn: false,
            currentUser: '',
            redirect: '/',
            err: '',
            foundUsers: 0,
            users: []
        })
        // update Log In situation of user in database
        await usersService.updateCompletionStatus(this.state.currentUser._id, {
            isLogIn: false
        })
  }
  
  // Calculate Distance
  distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 === lat2) && (lon1 === lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
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

  componentDidMount() {
    this.getAllCountries();
    this.checkAuthentication();
}

  render() {
    return (
      <Router>
        <div className="App">
          <div className="header-body">
            <Header
              isLogIn={this.state.isLogIn}
              logout={this.logout}
              currentUserName={this.state.currentUser.userName}
            />
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
                  fetchUsers = {this.fetchUsers}
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