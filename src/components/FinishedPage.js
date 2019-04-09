import React, { Component } from "react"
import { connect } from "react-redux"
import MovieItem from "./MovieItem"
import EmptyStatePage from "./EmptyStatePage";
import posed, { PoseGroup } from "react-pose";
import Octicon, { Check } from "@githubprimer/octicons-react";

const MovieContainer = posed.div({
    enter: {
        scale: 1,
        delay: props => props.i * 100,
    },
    exit: { scale: 0 }
});

class FinishedPage extends Component {

    finishedList = () => {
        const { finishedMovies } = this.props.finishedReducer
        if (finishedMovies) {
            const movies = finishedMovies.map((movie, i) => {
                return (
                    <MovieContainer key={movie.id} i={i} className="movie-item">
                        <MovieItem movie={movie}  {...this.props} />
                    </MovieContainer>
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
                    <PoseGroup animateOnMount>
                        {movies && movies.length ? movies : <EmptyStatePage key="empty-page" message="Your finished list is empty movies!!" />}
                    </PoseGroup>
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