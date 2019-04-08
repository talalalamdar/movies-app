import React, { Component } from "react"
import { connect } from "react-redux"
import MovieItem from "./MovieItem"
import EmptyStatePage from "./EmptyStatePage";
import posed, { PoseGroup } from 'react-pose'

const MovieContainer = posed.div({
    enter: {
        scale: 1,
        delay: props => props.i * 100,
    },
    exit: { scale: 0 }
});

class MyPlan extends Component {

    planMoviesList = () => {
        const planMovies = this.props.planReducer.moviesPlan

        if (planMovies) {
            const movies = planMovies.map((movie, i) => {
                return (
                    <MovieContainer pose='enter' i={i} initialPose='exit' key={movie.id} className="movie-item">
                        <MovieItem movie={movie}  {...this.props}/>
                    </MovieContainer>
                )
            })
            return movies
        }
    }

    render() {
        const movies = this.planMoviesList()

        return (
            <React.Fragment>
                <div className='component-header'>
                    <h4>My Plan</h4>
                </div>
                <div className="movies-list">
                    <PoseGroup animateOnMount>
                        {movies && movies.length ? movies : <EmptyStatePage key="empty-page" message="No movies currently in your plan" />}
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


export default connect(mapStateToProps, mapDispatchToProps)(MyPlan)