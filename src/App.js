import React, { Component } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import FAQ from './components/FAQ';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Footer from './components/Footer';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import countries from 'countries-list';
import sessionService from './services/sessionService';
import usersService from './services/usersService';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: null,

      redirect: '/',
      // Authentication
      currentUser: {},
      isLogin: false,
      err: '',
      users: []
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

  // Get All Users
  fetchUsers = async () => {
    const users = await usersService.getAll();
    console.log(users);
    this.setState( { users: users });
    return users;
  }

  // Check User Authentication
  checkAuthentication = async () => {
    const result = await sessionService.checkAuthentication();
    if (result.isLogin) {
      this.fetchUsers();
      const currentUser = localStorage.getItem('currentUser');
      this.setState({
        isLogin: true,
        currentUser: JSON.parse(currentUser)
      })
    }
  }

  // Login
  login = (currentUser) => {
      this.setState({
        currentUser: currentUser,
        isLogin: true
      })
  }

  // Logout
  logout = async () => {
    await sessionService.logOut();
    
    //Reset LocalStorage
    localStorage.clear();
    this.setState({
      isLogin: false,
      currentUser: {},
      users: []
    })

    return <Redirect to ="/" />
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
              isLogin={this.state.isLogin}
              logout={this.logout}
            />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/about" component={About} />
              <Route path="/FAQ" component={FAQ} />
              <Route path="/login" render={(props) =>
                <Login 
                  err={this.state.err}
                  currentUser={this.state.currentUser}
                  isLogin={this.state.isLogin}
                  login={this.login}
                  login = {this.login}
                  fetchUsers = {this.fetchUsers}
                />} />
              <Route path="/signup" render={(props) =>
                <SignUp 
                  countries={this.state.countries}
                  isLogin={this.state.isLogin}
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