import React, { Component } from "react"
import { connect } from "react-redux"
import Octicon, { Star, Organization, Pulse, ArrowLeft, Pin } from '@primer/octicons-react';
import { getMovie, getReviews, getSimilarMovies, getRecommendedMovies } from '../utils'
import unavailablePoster from '../assets/poster-unavailable.jpg'
import numeral from 'numeral'
import ReactTooltip from 'react-tooltip'
import { ClipLoader } from 'react-spinners'
import { css } from '@emotion/core';
import store from "../redux/store/store"

import Review from './Review.js'

import { addToFavoritesAction, removeFromFavoritesAction } from "../redux/actions/favoritesActions"
import { addToPlan, removeFromPlan } from "../redux/actions/planActions"
import { addToRatedList, removeFromRatedList } from "../redux/actions/ratedListActions"
import { addToFinishedList, removeFromFinishedList } from "../redux/actions/finishedActions"
import MovieItem from './MovieItem';

import Rating from 'react-rating'
import MdInfo from 'react-icons/lib/md/info'
import MdRateReview from 'react-icons/lib/md/rate-review'

const override = css`
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
margin-top: 100px;
color: rgb(59, 122, 40);
`;


class MovieDetails extends Component {

  state = {
    loading: true,
    movieId: null,
    movie: {},
    reviews: [],
    similarMovies: [],
    recommended: [],
    rate: null
  }

  componentDidMount() {
    let searchDiv = document.getElementById('component-header')
    searchDiv.scrollIntoView({ behavior: 'smooth', top: '1px', block: "start", inline: 'start', alignToTop: true })
    this.initMovie()
  }

  initMovie = () => {
    const { pathname } = this.props.history.location
    const id = pathname.split('/').slice(-1)
    getMovie(id)
      .then(res => {
        const ratedListMovies = this.props.ratedListReducer.movies
        const onMyList = ratedListMovies.find(item => item.movie.id === res.id)
        this.setState({
          movie: res,
          movieId: res.id && res.id,
          rate: onMyList ? onMyList.value : null,
          loading: false
        })
      })
      .catch(err => console.log(err))
    getReviews(id)
      .then(res => {
        this.setState({
          reviews: res.results
        })
      })
      .catch(err => console.log(err))
    getSimilarMovies(id)
      .then(res => {
        this.setState({
          similarMovies: res.results
        })
      })
      .catch(err => console.log(err))
    getRecommendedMovies(id)
      .then(res => {
        this.setState({
          recommended: res.results
        })
      })
      .catch(err => console.log(err))
  }

  handleAddToFavorite = (movie) => {
    let movieIsBookmarked = this.props.favoritesReducer.myFavoritesMovies.some(favMovie => movie.id === favMovie.id)
    if (movieIsBookmarked) {
      this.handleRemoveFromFavorites(movie)
      return
    }
    this.props.onAddToFavorites(movie)
  }

  handleRemoveFromFavorites = (movie) => {
    this.props.onRemoveFromFavorites(movie)
  }

  handleAddToPlan = (movie) => {
    let movieInPlan = this.props.planReducer.moviesPlan.some(plMovie => movie.id === plMovie.id)
    if (movieInPlan) {
      return
    }
    this.props.onAddToPlan(movie)
  }

  handleAddToFinishedList = (movie) => {
    this.props.onAddToFinishedList(movie)
  }

  renderSimilarMoviesList = () => {
    const movies = this.state.similarMovies.map((movie, i) => {
      return i < 6 && (
        <div key={movie.id} className="movie-item">
          <MovieItem movie={movie} hasHoverState={false} {...this.props} />
        </div>
      )
    })
    return movies
  }

  renderRecommendedMoviesList = () => {
    const movies = this.state.recommended.map((movie, i) => {
      return i < 6 && (
        <div key={movie.id} className="movie-item">
          <MovieItem movie={movie} hasHoverState={false} {...this.props} />
        </div>
      )
    })
    return movies
  }

  handleRatingClick = (val) => {
    const ratedListMovies = this.props.ratedListReducer.movies
    const onMyList = ratedListMovies.find(item => item.movie.id === this.state.movie.id)
    if (onMyList && onMyList.value === val) {
      return
    } else if (onMyList && onMyList.value !== val) {
      this.handleRemoveFromRatedList(onMyList.movie.id)
    }
    this.props.onAddToRatedList({ movie: this.state.movie, value: val })
    this.handleRatingChange(val)
  }

  handleRemoveFromRatedList = (movieId) => {
    const ratedListMovies = this.props.ratedListReducer.movies
    let filteredMovies = ratedListMovies.filter(movie => movie.movie.id !== movieId)
    this.props.onRemoveFromRatedList(filteredMovies)
  }

  handleRatingChange = (val) => {
    this.setState({
      rate: val
    })
  }

  displayMovie = () => {
    const { movie, reviews, rate } = this.state

    const { finishedMovies } = this.props.finishedReducer
    const { moviesPlan } = this.props.planReducer
    const { myFavoritesMovies } = this.props.favoritesReducer
    const isBookmarked = myFavoritesMovies && myFavoritesMovies.length && myFavoritesMovies.some(favMovie => favMovie.id === this.state.movie.id)
    const finished = finishedMovies.some(item => item.id === this.state.movie.id)
    const inMyPlan = moviesPlan.some(movie => movie.id === this.state.movie.id)

    const similarMovies = this.renderSimilarMoviesList()
    const recommendedMovies = this.renderRecommendedMoviesList()

    return (
      <div className='movie-details-div' style={{ display: 'flex', justifyContent: 'center', flexFlow: 'row wrap' }}>
        <div className='sidebar-overview'>
          <div className='sidebar-overview-header' onClick={() => this.handleAddToFavorite(movie)}>
            <div className={isBookmarked ? 'bookmarked-icon' : 'bookmark-icon'}>
              <Octicon size={25} icon={Pin} />
            </div>
          </div>

          <div className="sidebar-overview-moviePoster">
            <img className="movie-poster" src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : unavailablePoster} alt={`${movie.title}-movie`} />
          </div>

          <div className="sidebar-overview-panel">
            <Rating
              style={{ marginTop: 30 }}
              className="sidebar-overview-panel-rating"
              initialRating={rate}
              stop={10}
              step={1}
              fractions={2}
              direction='ltr'
              onClick={(val) => this.handleRatingClick(val)}
              fullSymbol={<div style={{ color: 'gold' }}><Octicon icon={Star} size={25} /></div>}
              emptySymbol={<div style={{ color: 'lightgray' }}><Octicon size={25} icon={Star} /></div>}
            />

            <strong style={{fontWeight: 'bolder', fontSize: '24px'}}>{rate}</strong>

            <div>
              {!finished &&
                <div className='option-div' style={{ backgroundColor: inMyPlan ? 'rgb(59, 122, 40)' : '', color: inMyPlan ? 'white' : '', border: inMyPlan ? 'none' : '', marginBottom: 8 }} onClick={() => (!inMyPlan || !finished) && this.handleAddToPlan(movie)}> {(inMyPlan) ? 'In my plan' : 'Add to plan'} </div>
              }
              <div className='option-div' style={{ backgroundColor: finished ? 'rgb(59, 122, 40)' : '', color: finished ? 'white' : '', border: finished ? 'none' : '' }} onClick={() => !finished && this.handleAddToFinishedList(movie)}> {finished ? 'Finished' : 'Add to finished list'} </div>
            </div>
          </div>

        </div>

        <div className='main-overview'>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <h5 style={{ fontWeight: 'bold' }}>{movie.title}</h5>
              {movie.tagline && movie.tagline.length > 0 &&
                <span style={{ fontSize: 20, color: 'gray' }}>{movie.tagline}<br /></span>
              }
              {movie.genres && movie.genres.map((gen, i) => (
                <span style={styles.genSpan} key={gen.name}>{i === 0 ? '' : ' | '}{gen.name}</span>
              ))}
            </div>

            <div>
              <div className="main-overview-detailItem" data-tip data-for='rate'>
                <Octicon className="rate-start-icon" size='medium' icon={Star} /><strong> {movie.vote_average ? movie.vote_average : "Unavailable"} </strong> <br />
              </div>

              <div className="main-overview-detailItem" style={{ color: 'gray' }} data-tip data-for='voters'>
                <Octicon size={25} icon={Organization} /><span style={{ paddingLeft: 10 }}> {movie.vote_count ? movie.vote_count : "Unavailable"}</span><br />
              </div>

              <div className="main-overview-detailItem" style={{ color: 'gray' }} data-tip data-for='popularity'>
                <Octicon size={35} icon={Pulse} /> <span style={{ paddingLeft: 10 }}>{movie.popularity ? movie.popularity : "Unavailable"}</span>
              </div>

              <ReactTooltip place="left" id='rate' aria-haspopup='true' >
                Average Rate
              </ReactTooltip>

              <ReactTooltip place="left" id='voters' aria-haspopup='true' >
                Total Voters
              </ReactTooltip>

              <ReactTooltip place="left" id='popularity' aria-haspopup='true' >
                Popularity
              </ReactTooltip>
            </div>
          </div>

          <div style={styles.overviewPara}>
            <p>
              {movie.overview}
            </p>
          </div>

          <div className="generalInfo-header">
            <MdInfo style={{ marginRight: '8px'}}/> General Info
          </div>

          <div className="generalInfo-container">
            {movie.homepage &&
              <span><strong>Home Page: </strong><a style={{ color: 'blue' }} target='__blank' href={movie.homepage}>{movie.homepage}</a><br /></span>
            }
            {movie.original_language &&
              <span><strong>Original Language:</strong> {movie.original_language}<br /></span>
            }
            {movie.spoken_languages && movie.spoken_languages.length > 0 &&
              <span><strong>Spoken Languages:</strong> {movie.spoken_languages.map(lan => lan.name).join(', ')}<br /></span>
            }
            {movie.budget > 0 &&
              <span><strong>Budget: </strong>{numeral(movie.budget).format('($ 0.00 a)')}<br /></span>
            }

            <span><strong>Status: </strong>{movie.status}</span><br />
            {movie.release_date &&
              <span><strong>Release Date: </strong>{movie.release_date}<br /></span>
            }
            {movie.runtime > 0 &&
              <span><strong>Run Time: </strong>{numeral(movie.runtime).format('00:00:00')}<br /></span>
            }
            {movie.production_countries && movie.production_countries.length > 0 &&
              <React.Fragment>
                <strong>Production Countries:</strong>
                <ul>
                  {movie.production_countries.map(country => {
                    return (
                      <li key={country.name}>{country.name}</li>
                    )
                  })}
                </ul>
              </React.Fragment>
            }
            {movie.production_companies && movie.production_companies.length > 0 &&
              <React.Fragment>
                <strong>Production Companies:</strong>
                <ul>
                  {movie.production_companies.map(company => {
                    return (
                      <li key={company.id}>{company.name}</li>
                    )
                  })}
                </ul>
              </React.Fragment>
            }
          </div>
          {
            reviews.length > 0 &&
            <div style={{ marginTop: 50 }} className='reviews-div'>
              <h6> <MdRateReview /> Reviews</h6>

              {reviews.map((review, i) => i < 10 && <Review key={review.id} review={review} />)}
            </div>
          }
          {
            similarMovies.length > 0 &&
            <div className='similar-movies-div'>
              <h6 style={{ color: 'rgb(59, 122, 40)' }}>Similar Movies</h6>
              <div className="movies-list">
                {similarMovies && similarMovies.length && similarMovies}
              </div>
            </div>
          }
          {
            recommendedMovies.length > 0 &&
            <div className='recommended-movies-div'>
              <h6>Recommended</h6>
              <div className="movies-list">
                {recommendedMovies && recommendedMovies.length && recommendedMovies}
              </div>
            </div>
          }
        </div>
      </div>
    )

  }


  render() {
    const { loading } = this.state
    return (
      <React.Fragment>
        <div className='component-header'>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className='back-arrow' title='Go back' onClick={() => this.props.history.goBack()}>
              <Octicon verticalAlign='text-bottom' size={35} icon={ArrowLeft} />
            </div>
            <h4 id='component-header'>Movie Overview</h4>
          </div>
        </div>

        {loading ?
          <div style={styles.spinnerDiv}>
            <ClipLoader
              css={override}
              size={70}
              color={'#5B9716'}
            />

          </div>

          : this.displayMovie()}
      </React.Fragment>
    )
  }
}

const styles = {
  genSpan: {
    fontSize: '16px',
    color: 'gray'
  },
  overviewPara: {
    paddingTop: 50,
    paddingBottom: 50
  },
  spinnerDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = () => ({
  onAddToFavorites: val => store.dispatch(addToFavoritesAction(val)),
  onAddToPlan: val => store.dispatch(addToPlan(val)),
  onRemoveFromPlan: val => store.dispatch(removeFromPlan(val)),
  onAddToRatedList: val => store.dispatch(addToRatedList(val)),
  onRemoveFromRatedList: val => store.dispatch(removeFromRatedList(val)),
  onAddToFinishedList: val => store.dispatch(addToFinishedList(val)),
  onRemoveFromFavorites: val => store.dispatch(removeFromFavoritesAction(val)),
  onRemoveFromFinishedList: val => store.dispatch(removeFromFinishedList(val))
})


export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails)
