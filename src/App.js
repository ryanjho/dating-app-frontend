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



class App extends Component {
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
              <Route path="/signup" component={SignUp} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;