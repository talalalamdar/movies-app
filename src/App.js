import React, { Component } from 'react';
import './App.css';

// importing pages components
import HomePage from "./components/HomePage"
import SearchPage from "./components/SearchPage"
import MyFavorites from "./components/MyBookmarks"
import MyPlan from "./components/MyPlan"
import RatedList from "./components/RatedList.js"
import NowPlayingPage from "./components/NowPlayingPage.js"
import MovieDetails from "./components/MovieDetails.js"
import AboutComponent from "./components/AboutComponent.js"
import TopRated from './components/TopRated.js'
import PopularPage from './components/PopularPage';
import UpcomingPage from './components/UpcomingPage';
import TrendingPage from './components/TrendingPage';

import FinishedPage from "./components/FinishedPage"
import cinema2 from './assets/tv_monitors.jpg'
import MovieDBLogo from './assets/movie-db-header-logo.png'


// import icons, and tools for react router, redux adn store 
import Octicon, { Search, Tasklist, Star, Check, Pin, Info, Play, Home, Pulse } from '@githubprimer/octicons-react'
import { Router, Route, NavLink } from 'react-router-dom'
import { connect } from "react-redux"
import { history } from "./redux/store/store"
import ReactTooltip from 'react-tooltip'
import FaTrophy from 'react-icons/lib/fa/trophy'
import FaRocket from 'react-icons/lib/fa/rocket'
import FaLineChart from 'react-icons/lib/fa/line-chart'

class App extends Component {

  render() {

    return (
      <div className="App">
        <Router history={history}>
          <div>
            <div style={{ width: '100%', height: '100%', position: 'relative' }} className="header-img">
              <img className="d-block w-100" style={{ position: 'absolute', width: '100%', height: '100%', top: 0, right: 0, filter: 'invert(1)' }} src={cinema2} alt='header-img' />
              <div style={{ position: 'absolute', width: '100%', height: '100%', top: 0, right: 0, backgroundColor: 'rgba(0,0,0, 0.5)' }}>
                <img style={{ position: 'absolute', top: 8, right: 8 }} src={MovieDBLogo} alt='movie-db-logo' width={'5%'} />
                <header className="App-header">
                  <h1 className="App-title">Movies App </h1>
                </header>
              </div>
            </div>
            <nav className="nav">
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%' }}>
                <div>
                  <NavLink data-tip data-for='home' activeClassName="active-tab" to="/home" className="nav-item nav-link">
                    <Octicon size={30} icon={Home} />
                  </NavLink>
                  <NavLink data-tip data-for='search' activeClassName="active-tab" to="/search" className="nav-item nav-link">
                    <Octicon size={30} icon={Search} />
                  </NavLink>
                  <NavLink data-tip data-for='plan' activeClassName="active-tab" to="/plan" className="nav-item nav-link">
                    <Octicon size={30} icon={Tasklist} />
                  </NavLink>
                  <NavLink data-tip data-for='rated-list' activeClassName="active-tab" to="/rated" className="nav-item nav-link">
                    <Octicon size={30} icon={Star} />
                  </NavLink>
                  <NavLink data-tip data-for='finished' activeClassName="active-tab" to="/finished" className="nav-item nav-link">
                    <Octicon size={30} icon={Check} />
                  </NavLink>
                  <NavLink data-tip data-for='bookmarks' activeClassName="active-tab" to="/bookmarks" className="nav-item nav-link">
                    <Octicon size={30} icon={Pin} />
                  </NavLink>
                  <NavLink data-tip data-for='now-playing' activeClassName="active-tab" to="/now-playing" className="nav-item nav-link">
                    <Octicon size={30} icon={Play} />
                  </NavLink>
                  <NavLink data-tip data-for='top-rated' activeClassName="active-tab" to="/top-rated" className="nav-item nav-link">
                    <FaTrophy size={30} />
                  </NavLink>
                  <NavLink data-tip data-for='popular' activeClassName="active-tab" to="/popular" className="nav-item nav-link">
                    <Octicon size={30} icon={Pulse} />
                  </NavLink>
                  <NavLink data-tip data-for='upcoming' activeClassName="active-tab" to="/upcoming" className="nav-item nav-link">
                    <FaRocket size={30} />
                  </NavLink>
                  <NavLink data-tip data-for='trending' activeClassName="active-tab" to="/trending" className="nav-item nav-link">
                    <FaLineChart size={30} />
                  </NavLink>
                </div>
                <NavLink data-tip data-for='about' activeClassName="active-tab" to="/about" className="nav-item nav-link">
                  <Octicon size={30} icon={Info} />
                </NavLink>


                { /*  Nav bar tooltips  */}
                <ReactTooltip place="left" id='home' aria-haspopup='true'>
                  Home
              </ReactTooltip>
                <ReactTooltip place="left" id='search' aria-haspopup='true' >
                  Search
                </ReactTooltip>
                <ReactTooltip place="left" id='plan' aria-haspopup='true'  >
                  Plan
                </ReactTooltip>
                <ReactTooltip place="left" id='rated-list' aria-haspopup='true' >
                  Rated
                </ReactTooltip>
                <ReactTooltip place="left" id='finished' aria-haspopup='true' >
                  Finished
                </ReactTooltip>
                <ReactTooltip place="left" id='bookmarks' aria-haspopup='true'>
                  Bookmarks
                </ReactTooltip>
                <ReactTooltip place="left" id='now-playing' aria-haspopup='true'>
                  Now Playing
                </ReactTooltip>
                <ReactTooltip place="left" id='top-rated' aria-haspopup='true'>
                  Top Rated
                </ReactTooltip>
                <ReactTooltip place="left" id='popular' aria-haspopup='true'>
                  Popular
               </ReactTooltip>
                <ReactTooltip place="left" id='upcoming' aria-haspopup='true'>
                  Upcoming
               </ReactTooltip>
                <ReactTooltip place="left" id='trending' aria-haspopup='true'>
                  Trending
                </ReactTooltip>
                <ReactTooltip place="left" id='about' aria-haspopup='true'>
                  About
                </ReactTooltip>

              </div>
            </nav>
            <div>
              <Route exact path="/" component={HomePage}></Route>
              <Route exact path="/home" component={HomePage}></Route>
              <Route exact path="/search" component={SearchPage}></Route>
              <Route exact path="/plan" component={MyPlan}></Route>
              <Route exact path="/rated" component={RatedList}></Route>
              <Route exact path="/finished" component={FinishedPage}></Route>
              <Route exact path="/bookmarks" component={MyFavorites}></Route>
              <Route exact path="/now-playing" component={NowPlayingPage}></Route>
              <Route exact path="/top-rated" component={TopRated}></Route>
              <Route exact path="/popular" component={PopularPage}></Route>
              <Route exact path="/upcoming" component={UpcomingPage}></Route>
              <Route exact path="/trending" component={TrendingPage}></Route>
              <Route exact path={'/movie/:id'} render={routeProps => <MovieDetails {...routeProps} {...this.props} />}></Route>
              <Route exact path="/about" component={AboutComponent}></Route>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default connect()(App)