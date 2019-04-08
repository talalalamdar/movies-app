import React, { Component } from "react"
import { connect } from "react-redux"
import MovieItem from "./MovieItem"
import EmptyStatePage from "./EmptyStatePage";
import posed, { PoseGroup } from "react-pose";

import { getPopularMovies } from '../utils';
import ClipLoader from 'react-spinners/ClipLoader';



const MovieContainer = posed.div({
    enter: {
        scale: 1,
        delay: props => props.i * 100,
    },
    exit: { scale: 0 }
});

class PopularPage extends Component {

    state = {
        fetching: true,
        popularMovies: []
    }

    componentDidMount() {
        getPopularMovies()
            .then(res => {
                if (res.results && res.results.length) {
                    this.setState({
                        fetching: false,
                        popularMovies: res.results
                    })
                }
            })
            .catch(err => console.log(err))
    }

    popularMoviesList = () => {
        const { popularMovies } = this.state
        if (popularMovies.length > 0) {
            return popularMovies.map((movie, i) =>
                <MovieContainer key={movie.id} i={i} className="movie-item">
                    <MovieItem movie={movie}  {...this.props} />
                </MovieContainer>
            )
        }
    }

    render() {
        const { fetching } = this.state
        let movies = this.popularMoviesList()

        return (
            <React.Fragment>
                <div className='component-header'>
                    <h4>Popular</h4>
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


export default connect(mapStateToProps, mapDispatchToProps)(PopularPage)