import React, { Component } from "react"

// importing actions
import { listSearchedMovies } from "../redux/actions/searchActions"
import { addToFavoritesAction, removeFromFavoritesAction } from "../redux/actions/favoritesActions"
import { addToPlan, removeFromPlan } from "../redux/actions/planActions"
import {  removeFromRatedList } from "../redux/actions/ratedListActions"
import { addToFinishedList, removeFromFinishedList } from "../redux/actions/finishedActions"

import store from "../redux/store/store"
import { connect } from "react-redux"
import { Modal, Button } from 'react-bootstrap'
import posed from 'react-pose'
import Octicon, { Star, Organization, Pin, KebabVertical, Pulse } from '@githubprimer/octicons-react'

import unavailablePoster from '../assets/poster-unavailable.jpg'


const Item = posed.div({
    open: { y: 0, opacity: 1 },
});
class MovieItem extends Component {

    state = {
        movieHoverStatus: false,
        showModal: false,
        showOptionsMenu: false
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

    handleRemoveFromPlan = (movieId) => {
        const planMovies = this.props.planReducer.moviesPlan
        let filteredMovies = planMovies.filter(movie => movie.id !== movieId)
        this.props.onRemoveFromPlan(filteredMovies)
    }

    handleAddToRatedList = (movie) => {
        this.props.onAddToRatedList(movie)
    }

    handleRemoveFromRatedList = (movieId) => {
        const ratedListMovies = this.props.ratedListReducer.movies
        let filteredMovies = ratedListMovies.filter(movie => movie.movie.id !== movieId)
        this.props.onRemoveFromRatedList(filteredMovies)
    }

    handleAddToFinishedList = (movie) => {
        this.props.onAddToFinishedList(movie)
    }

    handleRemoveFromFinishedList = (movieId) => {
        const { finishedMovies } = this.props.finishedReducer
        let filteredMovies = finishedMovies.filter(movie => movie.id !== movieId)
        this.props.onRemoveFromFinishedList(filteredMovies)
    }

    handleMouseHover = (val) => {
        this.setState({
            movieHoverStatus: val
        })
    }

    setStyle = (condition) => {
        if (condition) {
            return { backgroundColor: 'white', color: 'gray', ...styles.button }
        } else {
            return { color: 'white', ...styles.button }
        }
    }

    handleRemove = (pathname, movie) => {
        if (pathname === '/rated') {
            this.handleRemoveFromRatedList(movie.id)
        } else if (pathname === '/plan') {
            this.handleRemoveFromPlan(movie.id)
        } else if (pathname === '/finished') {
            this.handleRemoveFromFinishedList(movie.id)
        } else if (pathname === '/bookmarks') {
            this.handleRemoveFromFavorites(movie)
        }
        this.setState({
            showModal: false
        })
    }

    displayRemoveModal = () => {
        this.setState({
            showModal: true
        })
    }

    handleCloseModal = () => {
        this.setState({
            showModal: false
        })
    }

    showOptionsMenu = () => {
        this.setState({
            showOptionsMenu: true
        })
    }

    render() {
        const { title,
            poster_path,
            popularity,
            release_date,
            vote_average,
            vote_count
        } = this.props.movie


        const { myFavoritesMovies } = this.props.favoritesReducer
        const { moviesPlan } = this.props.planReducer
        const { finishedMovies } = this.props.finishedReducer
        const isBookmarked = myFavoritesMovies && myFavoritesMovies.length && myFavoritesMovies.some(favMovie => favMovie.id === this.props.movie.id)
        const inMyPlan = moviesPlan.some(movie => movie.id === this.props.movie.id)
        const finished = finishedMovies.some(item => item.id === this.props.movie.id)
        const { movieHoverStatus, showOptionsMenu } = this.state
        const isFinishedPage = window.location.pathname === '/finished'
        const isRatedListPage = window.location.pathname === '/rated'
        const isBookmarksPage = window.location.pathname === '/bookmarks'
        const isPlanPage = window.location.pathname === '/plan'


        return (
            <Item pose='open' className='movie-div' onMouseEnter={() => this.handleMouseHover(true)} onMouseLeave={() => this.handleMouseHover(false) & this.setState({ showOptionsMenu: false })}>

                <img style={{ position: 'absolute', top: '0px', left: '0px', width: '100%', height: '100%', zIndex: -10 }} className={poster_path ? "img-thumbnail" : "unknown-thumbnail"} src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : unavailablePoster} alt={`${title}-movie`} />


                {movieHoverStatus &&
                    <div className="movie-info">
                        <div style={{ width: '100%', height: '40px', textAlign: 'right', marginBottom: 10 }}>
                            {!isBookmarksPage && (
                                <div title='bookmark' className={isBookmarked ? 'bookmarked-item-icon' : 'bookmark-item-icon'} onClick={() => this.handleAddToFavorite(this.props.movie)}>
                                    <Octicon icon={Pin} />
                                </div>
                            )}
                            <div className={!showOptionsMenu ? 'options-icon' : 'options-icon-active'} title='Options' onClick={this.showOptionsMenu} style={{ display: 'inline', marginLeft: 15, padding: 5 }}>
                                <Octicon icon={KebabVertical} />
                            </div>
                        </div>
                        <a href={`/movie/${this.props.movie.id}`}  style={{height: '100%', width: '100%'}}  onClick={() => this.goToMovie()} >
                            <h6>{title.length > 35 ? title.substr(0, 35) + "..." : title}</h6>
                            <div style={{height: '100%'}} className="details-div">
                                <Octicon className="rate-start-icon" size='medium' icon={Star} /> <strong> {vote_average ? vote_average : "Unavailable"} </strong> <br />
                                <Octicon className="users-votes-icon" size={20} icon={Organization} /> <strong> {vote_count ? vote_count : "Unavailable"}</strong> <br />
                                <Octicon className="users-votes-icon" size={20} icon={Pulse} /> <strong>{popularity ? popularity : "Unavailable"}</strong><br />
                                <strong>{release_date && release_date}</strong> <br />
                            </div>
                           
                        </a>
                        {showOptionsMenu &&
                            <div className="buttons-div">
                                {!isFinishedPage && !isRatedListPage && !isPlanPage && !finished && (
                                    <div onClick={() => (!inMyPlan || !finished ) && this.handleAddToPlan(this.props.movie)}> {(inMyPlan || finished ) ? 'In my plan' : 'Add to plan'} </div>
                                )}
                                {!isFinishedPage &&  (
                                    <div onClick={() => !finished && this.handleAddToFinishedList(this.props.movie)}> {finished ? 'Finished' : 'Add to finished list'} </div>
                                )}
                                {(isBookmarksPage || isFinishedPage || isPlanPage || isRatedListPage) && (
                                    <div className="remove-btn" style={{ width: isBookmarksPage ? '100%' : '50%' }} onClick={this.displayRemoveModal}> Remove </div>
                                )}
                            </div>
                        }
                    </div>
                }
                <Modal style={{ fontSize: '20px' }} show={this.state.showModal} onHide={this.handleCloseModal} size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Remove dialog</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to remove <strong> {title}</strong> ?</Modal.Body>
                    <Modal.Footer>
                        <Button className="btn btn-sm" variant="light" onClick={this.handleCloseModal}>
                            Close
                  </Button>
                        <Button style={{ backgroundColor: 'rgb(59, 122, 40)' }} className="btn btn-sm" onClick={() => this.handleRemove(window.location.pathname, this.props.movie)}>
                            Remove
                  </Button>
                    </Modal.Footer>
                </Modal>

            </Item>
        )
    }

}

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = () => ({
    getSearchedMovies: val => store.dispatch(listSearchedMovies(val)),
    onAddToFavorites: val => store.dispatch(addToFavoritesAction(val)),
    onAddToPlan: val => store.dispatch(addToPlan(val)),
    onRemoveFromPlan: val => store.dispatch(removeFromPlan(val)),
    onRemoveFromRatedList: val => store.dispatch(removeFromRatedList(val)),
    onAddToFinishedList: val => store.dispatch(addToFinishedList(val)),
    onRemoveFromFavorites: val => store.dispatch(removeFromFavoritesAction(val)),
    onRemoveFromFinishedList: val => store.dispatch(removeFromFinishedList(val))
})

const styles = {
    button: {
        width: '50%',
        height: '50px',
        border: '1px solid white',
        fontSize: '16px',
        textDecoration: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieItem)