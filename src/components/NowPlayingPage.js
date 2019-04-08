import React, { Component } from "react"
import { connect } from "react-redux"
import MovieItem from "./MovieItem"
import EmptyStatePage from "./EmptyStatePage";
import posed, { PoseGroup } from "react-pose";

import { getNowPlayingMovies } from '../utils';
import ClipLoader from 'react-spinners/ClipLoader';



const MovieContainer = posed.div({
    enter: {
        scale: 1,
        delay: props => props.i * 100,
    },
    exit: { scale: 0 }
});

class NowPlayingPage extends Component {

    state = {
        fetching: true,
        nowPlayingMovies: []
    }

    componentDidMount() {
        getNowPlayingMovies()
            .then(res => {
                if (res.results && res.results.length) {
                    this.setState({
                        fetching: false,
                        nowPlayingMovies: res.results
                    })
                }
            })
            .catch(err => console.log(err))
    }

    nowPlayingMoviesList = () => {
        const { nowPlayingMovies } = this.state
        if (nowPlayingMovies.length > 0) {
            return nowPlayingMovies.map((movie, i) =>
                <MovieContainer key={movie.id} i={i} className="movie-item">
                    <MovieItem movie={movie}  {...this.props} />
                </MovieContainer>
            )
        }
    }

    render() {
        const { fetching } = this.state
        let movies = this.nowPlayingMoviesList()

        return (
            <React.Fragment>
                <div className='component-header'>
                    <h4>Now Playing</h4>
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


export default connect(mapStateToProps, mapDispatchToProps)(NowPlayingPage)