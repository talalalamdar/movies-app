import React, { Component } from "react"
import { connect } from "react-redux"
import MovieItem from "./MovieItem"
import EmptyStatePage from "./EmptyStatePage";
import posed, { PoseGroup } from "react-pose";

import { getTrendingMovies } from '../utils';
import ClipLoader from 'react-spinners/ClipLoader';



const MovieContainer = posed.div({
    enter: {
        scale: 1,
        delay: props => props.i * 100,
    },
    exit: { scale: 0 }
});

class TrendingPage extends Component {

    state = {
        fetching: true,
        trendingMovies: []
    }

    componentDidMount() {
        getTrendingMovies()
            .then(res => {
                if (res.results && res.results.length) {
                    this.setState({
                        fetching: false,
                        trendingMovies: res.results
                    })
                }
            })
            .catch(err => console.log(err))
    }

    trendingMoviesList = () => {
        const { trendingMovies } = this.state
        if (trendingMovies.length > 0) {
            return trendingMovies.map((movie, i) =>
                <MovieContainer key={movie.id} i={i} className="movie-item">
                    <MovieItem movie={movie}  {...this.props} />
                </MovieContainer>
            )
        }
    }

    render() {
        const { fetching } = this.state
        let movies = this.trendingMoviesList()

        return (
            <React.Fragment>
                <div className='component-header'>
                    <h4>Trending</h4>
                </div>
                {fetching ?
                    <div style={{ width: '100%', marginTop: 100 }}>
                        <ClipLoader
                            sizeUnit={"px"}
                            size={70}
                            color={'#5B9716'}
                        />
                    </div> :
                    <div className="movies-list">
                        <PoseGroup animateOnMount>
                            {(movies && movies.length) ? movies : <EmptyStatePage key="empty-page" message="No available movies" />}
                        </PoseGroup>
                    </div>
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = () => ({
})


export default connect(mapStateToProps, mapDispatchToProps)(TrendingPage)