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
      return trendingMovies.map((movie, i) => {
        return (
          <Slide index={i} key={movie.id} className="carousel__movie-item">
             <MovieItem movie={movie} {...this.props} />
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
          <MovieItem  movie={movie} {...this.props} />
        </Slide>
      )
    }
  }

  upcomingMoviesList = () => {
    const { upcomingMovies } = this.state
    if (upcomingMovies.length > 0) {
      return upcomingMovies.map((movie, i) =>
        <Slide index={i} key={movie.id} className="carousel__movie-item">
          <MovieItem movie={movie} {...this.props} />
        </Slide>
      )
    }
  }

  popularMoviesList = () => {
    const { popularMovies } = this.state
    if (popularMovies.length > 0) {
      return popularMovies.map((movie, i) =>
        <Slide index={i} key={movie.id} className="carousel__movie-item">
          <MovieItem movie={movie} {...this.props} />
        </Slide>
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
              naturalSlideWidth={75}
              naturalSlideHeight={125}
              totalSlides={this.state.trendingMovies.length}
              visibleSlides={5}
              infinite={true}
              step={2}
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
              naturalSlideWidth={75}
              naturalSlideHeight={125}
              totalSlides={this.state.nowPlayingMovies.length}
              visibleSlides={5}
              infinite={true}
              step={2}
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
              naturalSlideWidth={75}
              naturalSlideHeight={125}
              totalSlides={this.state.upcomingMovies.length}
              visibleSlides={5}
              infinite={true}
              step={2}
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
              naturalSlideWidth={75}
              naturalSlideHeight={125}
              totalSlides={popularMovies.length}
              visibleSlides={5}
              infinite={true}
              step={2}
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
