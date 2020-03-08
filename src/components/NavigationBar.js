import React, { Component } from 'react';
import { connect } from "react-redux"

// importing pages components
import HomePage from "./HomePage"
import SearchPage from "./SearchPage"
import MyFavorites from "./MyBookmarks"
import MyPlan from "./MyPlan"
import RatedList from "./RatedList.js"
import NowPlayingPage from "./NowPlayingPage.js"
import MovieDetails from "./MovieDetails.js"
import AboutComponent from "./AboutComponent.js"
import TopRated from './TopRated.js'
import PopularPage from './PopularPage';
import UpcomingPage from './UpcomingPage';
import TrendingPage from './TrendingPage';
import FinishedPage from "./FinishedPage"

// import icons, and tools for react router, redux adn store
import Octicon, { Search, Tasklist, Star, Check, Pin, Info, Play, Home, Pulse } from '@primer/octicons-react'
import { Router, Route, NavLink } from 'react-router-dom'
import { history } from "../redux/store/store"
import ReactTooltip from 'react-tooltip'
import FaTrophy from 'react-icons/lib/fa/trophy'
import FaRocket from 'react-icons/lib/fa/rocket'
import FaLineChart from 'react-icons/lib/fa/line-chart'

class NavigationBar extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="mainPage">
          <nav className="mainPage-nav">
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

          <div className="mainPage-content">
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
    );
  }
}

export default connect()(NavigationBar);
