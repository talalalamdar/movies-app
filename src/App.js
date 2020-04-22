import React, { Component } from 'react';
import NavigationBar from './components/NavigationBar';
import './App.css';
import 'pure-react-carousel/dist/react-carousel.es.css';

import cinema2 from './assets/tv_monitors.jpg'
import MovieDBLogo from './assets/movie-db-header-logo.png'

// import icons, and tools for react router, redux adn store
import { connect } from "react-redux"

import MdMovie from 'react-icons/lib/md/movie'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="header">
          <img className="header-img" src={cinema2} alt='header-img' />

          <div style={{ position: 'absolute', width: '100%', height: '100%', top: 0, right: 0, backgroundColor: 'rgba(59, 122, 40, 0.8)' }}>
            <img style={{ position: 'absolute', top: 8, right: 8 }} src={MovieDBLogo} alt='movie-db-logo' width={'5%'} />

            <header className="App-header">
              <h1 className="App-title">Movies App <MdMovie /></h1>
            </header>
          </div>
        </div>

        <NavigationBar />
      </div>
    );
  }
}

export default connect()(App);
