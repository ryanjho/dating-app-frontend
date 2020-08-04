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
      countries: null,

      redirect: '/',
      // Authentication
      currentUser: '',
      isLogin: false,
      err: ''
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

  componentDidMount() {
    this.getAllCountries();
}

  render() {
    return (
      <Router>
        <div className="App">
          <div className="header-body">
            <Header
              isLogin={this.state.isLogin}
            />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/about" component={About} />
              <Route path="/FAQ" component={FAQ} />
              <Route path="/login" render={(props) =>
                <Login 
                err={this.state.err} 
                isLogin={this.state.isLogin}
                />} />
              <Route path="/signup" render={(props) =>
                <SignUp countries={this.state.countries}/>} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;