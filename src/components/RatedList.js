import React, { Component } from "react"
import { connect } from "react-redux"
import MovieItem from "./MovieItem"
import EmptyStatePage from "./EmptyStatePage";
import Octicon, { Star } from '@githubprimer/octicons-react'

import Rating from 'react-rating'

class RatedList extends Component {

    ratedList = () => {
        const ratedListMovies = this.props.ratedListReducer.movies

        if (ratedListMovies) {
            const movies = ratedListMovies.map((movie, i) => {
                return movie.movie && movie.movie.id && (
                    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }} key={movie.movie.id} >
                        <div className="movie-item">
                            <MovieItem movie={movie.movie}  {...this.props} />
                        </div>
                        <div>
                            <Rating style={{ marginTop: 10 }} initialRating={movie.value} readonly stop={10} step={1} fractions={2}
                                fullSymbol={<div style={{ color: 'gold' }}><Octicon icon={Star} size={30} /></div>}
                                emptySymbol={<div style={{ color: 'lightgray' }}><Octicon size={30} icon={Star} /></div>}
                            /> {movie.value}
                        </div>
                    </div>

                )
            })
            return movies
        }
    }

    render() {
        const ratedList = this.ratedList()
        return (
            <React.Fragment>
                <div className='component-header'>
                    <h4>My Ratings <Octicon size={30} icon={Star}/></h4>
                </div>
                <div className="movies-list">
                    {ratedList && ratedList.length ? ratedList : <EmptyStatePage message="No movies in your rated list :(" />}
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