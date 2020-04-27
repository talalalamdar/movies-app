import React, { Component } from "react"
import { connect } from "react-redux"
import MovieItem from "./MovieItem"
import EmptyStatePage from "./EmptyStatePage";
import Octicon, { Star } from '@primer/octicons-react'

import Rating from 'react-rating'

class RatedList extends Component {

    ratedList = () => {
        const ratedListMovies = this.props.ratedListReducer.movies

        if (ratedListMovies) {
            const movies = ratedListMovies.map((movie, i) => {
                return movie.movie && movie.movie.id && (
                    <div className="rated-movie-item" key={movie.movie.id} >
                        <div className="movie-item">
                            <MovieItem movie={movie.movie} hasHoverState={true} {...this.props} />
                        </div>
                        <div className="movie-item-rating">
                            <Rating style={{ marginTop: 10 }} initialRating={movie.value} start={1} stop={2} fractions={2}
                                fullSymbol={<div style={{ color: 'gold' }}><Octicon icon={Star} size={60} /></div>}
                                emptySymbol={<div style={{ color: 'lightgray' }}><Octicon size={60} icon={Star} /></div>}
                            />

                            <span className="movie-item-rating-value">
                                {movie.value}
                            </span>
                        </div>
                    </div>

                )
            })
            return movies
        }

        return []
    }

    render() {
        const ratedList = this.ratedList()

        return (
            <React.Fragment>
                <div className='component-header'>
                    <h4>My Ratings <Octicon size={30} icon={Star}/></h4>
                </div>
                <div className="movies-list">
                    {ratedList.length ? ratedList : <EmptyStatePage message="No movies in your rated list :(" />}
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


export default connect(mapStateToProps, mapDispatchToProps)(RatedList)
