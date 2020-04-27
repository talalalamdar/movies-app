import React, { Component } from "react";
import { connect } from "react-redux";
import MovieItem from "./MovieItem";
import EmptyStatePage from "./EmptyStatePage";

import  Octicon, { Tasklist }  from '@primer/octicons-react';


class MyPlan extends Component {

    planMoviesList = () => {
        const planMovies = this.props.planReducer.moviesPlan

        if (planMovies) {
            const movies = planMovies.map((movie, i) => {
                return (
                    <div key={movie.id} className="movie-item">
                        <MovieItem movie={movie} hasHoverState={true} {...this.props}/>
                    </div>
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
                    <h4>My Plan <Octicon size={30} icon={Tasklist}/></h4>
                </div>
                <div className="movies-list">
                    {movies && movies.length ? movies : <EmptyStatePage key="empty-page" message="No movies currently in your plan" />}
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
