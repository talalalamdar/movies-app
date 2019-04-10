import React, { Component } from "react"
import { connect } from "react-redux"
import MovieItem from "./MovieItem"
import EmptyStatePage from "./EmptyStatePage";
import posed, { PoseGroup } from "react-pose";

import { getTrendingMovies, getNowPlayingMovies, getUpcomingMovies, getPopularMovies } from '../utils';
import ClipLoader from 'react-spinners/ClipLoader';

import Octicon, { Play, Home, Pulse } from '@githubprimer/octicons-react'
import FaLineChart from 'react-icons/lib/fa/line-chart';
import FaRocket from 'react-icons/lib/fa/rocket'




const MovieContainer = posed.div({
    enter: {
        scale: 1,
        delay: props => props.i * 100,
    },
    exit: { scale: 0 }
});

class HomePage extends Component {

    state = {
        fetchingTrending: true,
        trendingMovies: [],
        fetchingNowPlaying: true,
        nowPlayingMovies: [],
        fetchingUpcoming: true,
        upcomingMovies: [],
        fetchingPopular: true,
        popularMovies: []
    }

    componentDidMount() {
        getTrendingMovies(1)
            .then(res => {
                if (res && res.results.length > 0) {
                    this.setState({
                        trendingMovies: res.results,
                        fetchingTrending: false
                    })
                }
            })
            .catch(err => console.log(err))
        getNowPlayingMovies(1)
            .then(res => {
                if (res && res.results.length > 0) {
                    this.setState({
                        nowPlayingMovies: res.results,
                        fetchingNowPlaying: false
                    })
                }
            })
            .catch(err => console.log(err))
        getUpcomingMovies(1)
            .then(res => {
                if (res && res.results.length > 0) {
                    this.setState({
                        upcomingMovies: res.results,
                        fetchingUpcoming: false
                    })
                }
            })
            .catch(err => console.log(err))
        getPopularMovies(1)
            .then(res => {
                if (res && res.results.length > 0) {
                    this.setState({
                        popularMovies: res.results,
                        fetchingPopular: false
                    })
                }
            })
            .catch(err => console.log(err))
    }

    trendingMoviesList = () => {
        const { trendingMovies } = this.state
        if (trendingMovies.length > 0) {
            return trendingMovies.map((movie, i) => i < 10 &&
                <MovieContainer key={movie.id} i={i} className="movie-item">
                    <MovieItem movie={movie}  {...this.props} />
                </MovieContainer>
            )
        }
    }

    nowPlayingMoviesList = () => {
        const { nowPlayingMovies } = this.state
        if (nowPlayingMovies.length > 0) {
            return nowPlayingMovies.map((movie, i) => i < 10 &&
                <MovieContainer key={movie.id} i={i} className="movie-item">
                    <MovieItem movie={movie}  {...this.props} />
                </MovieContainer>
            )
        }
    }

    upcomingMoviesList = () => {
        const { upcomingMovies } = this.state
        if (upcomingMovies.length > 0) {
            return upcomingMovies.map((movie, i) => i < 10 &&
                <MovieContainer key={movie.id} i={i} className="movie-item">
                    <MovieItem movie={movie}  {...this.props} />
                </MovieContainer>
            )
        }
    }

    popularMoviesList = () => {
        const { popularMovies } = this.state
        if (popularMovies.length > 0) {
            return popularMovies.map((movie, i) => i < 10 &&
                <MovieContainer key={movie.id} i={i} className="movie-item">
                    <MovieItem movie={movie}  {...this.props} />
                </MovieContainer>
            )
        }
    }

    render() {
        const { fetchingTrending, fetchingNowPlaying, fetchingUpcoming, fetchingPopular } = this.state
        let trendingMovies = this.trendingMoviesList()
        let nowPlayingMovies = this.nowPlayingMoviesList()
        let upcomingMovies = this.upcomingMoviesList()
        let popularMovies = this.popularMoviesList()

        return (
            <React.Fragment>
                <div className='component-header'>
                    <h4>Home <Octicon size={30} icon={Home} /></h4>
                </div>
                <div className='home-div'>
                    <div style={{ padding: 50, textAlign: 'left', paddingBottom: 0 }}>
                        <a href='/trending' >
                            <h6 style={{ display: 'inline', color: 'rgb(59, 122, 40)' }}>
                                Trending <FaLineChart />
                            </h6>
                        </a>
                    </div>
                    {fetchingTrending ?
                        <div style={{ width: '100%', marginTop: 100 }}>
                            <ClipLoader
                                sizeUnit={"px"}
                                size={70}
                                color={'#5B9716'}
                            />
                        </div> :
                        <div className="movies-list">
                            <PoseGroup animateOnMount>
                                {(trendingMovies && trendingMovies.length) ? trendingMovies : <EmptyStatePage key="empty-page" message="No available movies" />}
                            </PoseGroup>
                        </div>
                    }
                </div>
                <div className='home-div'>
                    <div style={{ padding: 50, textAlign: 'left', paddingBottom: 0 }}>
                        <a href='/now-playing'>
                            <h6>
                                Now Playing <Octicon size={30} icon={Play} />
                            </h6>
                        </a>
                    </div>
                    {fetchingNowPlaying ?
                        <div style={{ width: '100%', marginTop: 100 }}>
                            <ClipLoader
                                sizeUnit={"px"}
                                size={70}
                                color={'#FFFFFF'}
                            />
                        </div> :
                        <div className="movies-list">
                            <PoseGroup animateOnMount>
                                {(nowPlayingMovies && nowPlayingMovies.length) ? nowPlayingMovies : <EmptyStatePage key="empty-page" message="No available movies" />}
                            </PoseGroup>
                        </div>
                    }
                </div>
                <div className='home-div'>
                    <div style={{ padding: 50, textAlign: 'left', paddingBottom: 0 }}>
                        <a href='/upcoming'>
                            <h6 style={{ color: 'rgb(59, 122, 40)' }}>
                                Upcoming <FaRocket />
                            </h6>
                        </a>
                    </div>
                    {fetchingUpcoming ?
                        <div style={{ width: '100%', marginTop: 100 }}>
                            <ClipLoader
                                sizeUnit={"px"}
                                size={70}
                                color={'#5B9716'}
                            />
                        </div> :
                        <div className="movies-list">
                            <PoseGroup animateOnMount>
                                {(upcomingMovies && upcomingMovies.length) ? upcomingMovies : <EmptyStatePage key="empty-page" message="No available movies" />}
                            </PoseGroup>
                        </div>
                    }
                </div>
                <div className='home-div'>
                    <div style={{ padding: 50, textAlign: 'left', paddingBottom: 0 }}>
                        <a href='/popular' style={{ width: '20%' }}>
                            <h6>
                                Popular <Octicon size={30} icon={Pulse} />
                            </h6>
                        </a>
                    </div>
                    {fetchingPopular ?
                        <div style={{ width: '100%', marginTop: 100 }}>
                            <ClipLoader
                                sizeUnit={"px"}
                                size={70}
                                color={'#FFFFFF'}
                            />
                        </div> :
                        <div className="movies-list">
                            <PoseGroup animateOnMount>
                                {(popularMovies && popularMovies.length) ? popularMovies : <EmptyStatePage key="empty-page" message="No available movies" />}
                            </PoseGroup>
                        </div>
                    }
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = () => ({
})


export default connect(mapStateToProps, mapDispatchToProps)(HomePage)