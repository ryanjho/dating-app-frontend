import React, { Component } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';



class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/FAQ" component={FAQ} />
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;