import React, { Component } from "react"
import { connect } from "react-redux"
import MovieItem from "./MovieItem"
import EmptyStatePage from "./EmptyStatePage";
import posed, { PoseGroup } from "react-pose";


import Octicon, { Pin } from '@githubprimer/octicons-react';


const MovieContainer = posed.div({
    enter: {
        scale: 1,
        delay: props => props.i * 100,
    },
    exit: { scale: 0 }
});

class MyBookmarks extends Component {


    favoriteMoviesList = () => {
        const favMovies = this.props.myFavoritesMovies
        if (favMovies && favMovies.length) {
            const movies = favMovies.map((movie, i) => {

                return movie.id && (
                    <MovieContainer key={movie.id} i={i} className="movie-item">
                        <MovieItem movie={movie}  {...this.props} />
                    </MovieContainer>
                )
            })
            return movies
        }
    }

    render() {
        let movies = this.favoriteMoviesList()
        return (
            <React.Fragment>
                <div className='component-header'>
                    <h4>My Bookmarks <Octicon size={30} icon={Pin}/></h4>
                </div>
                <div className="movies-list">
                    <PoseGroup animateOnMount>
                        {movies && movies.length ? movies : <EmptyStatePage key="empty-page" message="You have no bookmarked movies" />}
                    </PoseGroup>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    ...state.favoritesReducer
})

const mapDispatchToProps = () => ({
})


export default connect(mapStateToProps, mapDispatchToProps)(MyBookmarks)