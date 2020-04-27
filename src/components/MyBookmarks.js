import React, { Component } from "react"
import { connect } from "react-redux"
import MovieItem from "./MovieItem"
import EmptyStatePage from "./EmptyStatePage";


import Octicon, { Pin } from '@primer/octicons-react';


class MyBookmarks extends Component {


    favoriteMoviesList = () => {
        const favMovies = this.props.myFavoritesMovies
        if (favMovies && favMovies.length) {
            const movies = favMovies.map((movie, i) => {

                return movie.id && (
                    <div key={movie.id} className="movie-item">
                        <MovieItem movie={movie} hasHoverState={true} {...this.props} />
                    </div>
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
                    {movies && movies.length ? movies : <EmptyStatePage key="empty-page" message="You have no bookmarked movies" />}
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
