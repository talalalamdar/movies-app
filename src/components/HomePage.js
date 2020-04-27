import React, { Component } from "react"
import { connect } from "react-redux"
import MovieItem from "./MovieItem"

import { getTrendingMovies, getNowPlayingMovies, getUpcomingMovies, getPopularMovies } from '../utils';
import ClipLoader from 'react-spinners/ClipLoader';

import Octicon, { Play, Home, Pulse } from '@primer/octicons-react'
import FaLineChart from 'react-icons/lib/fa/line-chart';
import FaRocket from 'react-icons/lib/fa/rocket'

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Dot } from 'pure-react-carousel'

class HomePage extends Component {
  state = {
    fetchingTrending: true,
    trendingMovies: [],
    fetchingNowPlaying: true,
    nowPlayingMovies: [],
    fetchingUpcoming: true,
    upcomingMovies: [],
    fetchingPopular: true,
    popularMovies: [],
    responsiveConfig: {
      visibleSlides: 5,
      step: 2,
      width: 0,
      height: 0
    },
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

    this.handleVisibleSlides();
    window.addEventListener("resize", this.handleVisibleSlides);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleVisibleSlides);
  }

  trendingMoviesList = () => {
    const { trendingMovies } = this.state
    if (trendingMovies.length > 0) {
      return trendingMovies.map((movie, i) => {
        return (
          <Slide index={i} key={movie.id} className="carousel__movie-item">
             <MovieItem movie={movie} hasHoverState={true} {...this.props} />
          </Slide>
        )
      }
      )
    }
  }

  nowPlayingMoviesList = () => {
    const { nowPlayingMovies } = this.state
    if (nowPlayingMovies.length > 0) {
      return nowPlayingMovies.map((movie, i) =>
        <Slide index={i} key={movie.id} className="carousel__movie-item">
          <MovieItem  movie={movie} hasHoverState={true} {...this.props} />
        </Slide>
      )
    }
  }

  upcomingMoviesList = () => {
    const { upcomingMovies } = this.state
    if (upcomingMovies.length > 0) {
      return upcomingMovies.map((movie, i) =>
        <Slide index={i} key={movie.id} className="carousel__movie-item">
          <MovieItem movie={movie} hasHoverState={true} {...this.props} />
        </Slide>
      )
    }
  }

  popularMoviesList = () => {
    const { popularMovies } = this.state
    if (popularMovies.length > 0) {
      return popularMovies.map((movie, i) =>
        <Slide index={i} key={movie.id} className="carousel__movie-item">
          <MovieItem movie={movie} hasHoverState={true} {...this.props} />
        </Slide>
      )
    }
  }

  handleVisibleSlides = () => {
    const isMobileView = window.innerWidth < 800;
    const config = {
      width: isMobileView ? 60 : 75 ,
      height: isMobileView ? 80 : 125,
      step: isMobileView ? 1 : 2,
      visibleSlides: isMobileView ? 1 : 5
    }

    this.setState({
      responsiveConfig: config,
    })
  }

  render() {
    const { fetchingTrending, fetchingNowPlaying, fetchingUpcoming, fetchingPopular, responsiveConfig } = this.state
    let trendingMovies = this.trendingMoviesList()
    let nowPlayingMovies = this.nowPlayingMoviesList()
    let upcomingMovies = this.upcomingMoviesList()
    let popularMovies = this.popularMoviesList()

    return (
      <React.Fragment>
        <div className='component-header'>
          <div className="home-div-title">
            <div style={{ marginRight: 8 }}>
              <Octicon style={{ marginRight: 8 }} size={30} icon={Home} />
            </div>

            Home
          </div>
        </div>

        <div className='home-div'>
          <div style={{ padding: 16, textAlign: 'left' }}>
            <a href='/trending' >
              <div className="home-div-title" style={{ display: 'inline', color: 'rgb(59, 122, 40)' }}>
                <FaLineChart style={{ marginRight: 8}} /> Trending
              </div>
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
            <CarouselProvider
              totalSlides={this.state.trendingMovies.length}
              naturalSlideWidth={responsiveConfig.width}
              naturalSlideHeight={responsiveConfig.height}
              visibleSlides={responsiveConfig.visibleSlides}
              infinite={true}
              step={responsiveConfig.step}
            >
              <Slider>
                { trendingMovies }
              </Slider>

              <div className="carousel__control">
                <ButtonBack className="carousel__control_navigateButton"> {'<'} </ButtonBack>

                <div className="carousel__control_dotGroup">
                  {trendingMovies.map((movie, i) => {
                    return <Dot key={movie.id} slide={i} />
                  })}
                </div>

                <ButtonNext className="carousel__control_navigateButton"> > </ButtonNext>
              </div>
            </CarouselProvider>
          }
        </div>

        <div className='home-div'>
          <div style={{ padding: 16, textAlign: 'left'}}>
            <a href='/now-playing'>
              <div className="home-div-title">
                <div style={{ marginRight: '8px'}}>
                  <Octicon icon={Play} />
                </div>

                Now Playing
              </div>
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
            <CarouselProvider
            totalSlides={this.state.nowPlayingMovies.length}
            naturalSlideWidth={responsiveConfig.width}
            naturalSlideHeight={responsiveConfig.height}
            visibleSlides={responsiveConfig.visibleSlides}
            infinite={true}
            step={responsiveConfig.step}
            >
              <Slider>
                { nowPlayingMovies }
              </Slider>

              <div className="carousel__control">
                <ButtonBack className="carousel__control_navigateButton _white_color"> {'<'} </ButtonBack>

                <div className="carousel__control_dotGroup">
                  {nowPlayingMovies.map((movie, i) => {
                    return <Dot key={movie.id} slide={i} className="_white_background"/>
                  })}
                </div>

                <ButtonNext className="carousel__control_navigateButton _white_color"> > </ButtonNext>
              </div>
            </CarouselProvider>
          }
        </div>

        <div className='home-div'>
          <div style={{ padding: 16, textAlign: 'left' }}>
            <a href='/upcoming'>
              <div className="home-div-title" style={{ color: 'rgb(59, 122, 40)' }}>
                <FaRocket style={{ marginRight: 8}} /> Upcoming
              </div>
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
            <CarouselProvider
              totalSlides={this.state.upcomingMovies.length}
              naturalSlideWidth={responsiveConfig.width}
              naturalSlideHeight={responsiveConfig.height}
              visibleSlides={responsiveConfig.visibleSlides}
              infinite={true}
              step={responsiveConfig.step}
            >
              <Slider>
                { upcomingMovies }
              </Slider>

              <div className="carousel__control">
                <ButtonBack className="carousel__control_navigateButton"> {'<'} </ButtonBack>

                <div className="carousel__control_dotGroup">
                  {upcomingMovies.map((movie, i) => {
                    return <Dot key={movie.id} slide={i} />
                  })}
                </div>

                <ButtonNext className="carousel__control_navigateButton"> > </ButtonNext>
              </div>
            </CarouselProvider>
          }
        </div>

        <div className='home-div'>
          <div style={{ padding: 16, textAlign: 'left' }}>
            <a href='/popular' style={{ width: '20%' }}>
              <div className="home-div-title">
                <div style={{ marginRight: 8 }}>
                  <Octicon size={30} icon={Pulse} />
                </div>

                Popular
              </div>
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
            <CarouselProvider
            totalSlides={this.state.popularMovies.length}
            naturalSlideWidth={responsiveConfig.width}
            naturalSlideHeight={responsiveConfig.height}
            visibleSlides={responsiveConfig.visibleSlides}
            infinite={true}
            step={responsiveConfig.step}
            >
              <Slider>
                {popularMovies}
              </Slider>

              <div className="carousel__control">
                <ButtonBack className="carousel__control_navigateButton _white_color"> {'<'} </ButtonBack>

                <div className="carousel__control_dotGroup">
                  {popularMovies.map((movie, i) => {
                    return <Dot key={movie.id} slide={i} className="_white_background"/>
                  })}
                </div>

                <ButtonNext className="carousel__control_navigateButton _white_color"> > </ButtonNext>
              </div>
            </CarouselProvider>
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
