import React, { Component } from "react"
import { connect } from "react-redux"
import MovieItem from "./MovieItem"
import EmptyStatePage from "./EmptyStatePage";
import Octicon, { Check } from "@primer/octicons-react";

class FinishedPage extends Component {

    finishedList = () => {
        const { finishedMovies } = this.props.finishedReducer
        if (finishedMovies) {
            const movies = finishedMovies.map((movie, i) => {
                return (
                    <div key={movie.id} className="movie-item">
                        <MovieItem movie={movie} hasHoverState={true} {...this.props} />
                    </div>
                )
            })
            return movies
        }
    }

    render() {
        const movies = this.finishedList()
        return (
            <React.Fragment>
                <div className='component-header'>
                    <h4>Finished Watching <Octicon size={30} icon={Check} /></h4>
                </div>
                <div className="movies-list">
                    {movies && movies.length ? movies : <EmptyStatePage key="empty-page" message="Your finished list is empty movies!!" />}
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


export default connect(mapStateToProps, mapDispatchToProps)(FinishedPage)
