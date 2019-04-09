import React, { Component } from "react"
import { connect } from "react-redux"
import MovieItem from "./MovieItem"
import EmptyStatePage from "./EmptyStatePage";
import posed, { PoseGroup } from "react-pose";

import { getPopularMovies } from '../utils';
import ClipLoader from 'react-spinners/ClipLoader';
import Octicon, { Pulse } from "@githubprimer/octicons-react";

import ReactPaginate from 'react-paginate'


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
        popularMovies: [],
        pagesNum: 1
    }

    componentDidMount() {
        getPopularMovies(this.state.pageNum)
            .then(res => {
                if (res.results && res.results.length) {
                    this.setState({
                        fetching: false,
                        popularMovies: res.results,
                        pagesNum: res.total_pages
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

    handlePageClick = (page) => {
        getPopularMovies(page.selected + 1)
            .then(res => {
                if (res.results && res.results.length) {
                    this.setState({
                        fetching: false,
                        popularMovies: res.results,
                        pagesNum: res.total_pages
                    })
                }
            })
            .catch(err => console.log(err))

    }

    displayPagination = () => {
        const { pageNum } = this.state
        return (
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', alignItems: 'center' }}>
                <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    breakLinkClassName={'link-pagination'}
                    breakClassName={'page-pagination'}
                    pageCount={pageNum}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination-div'}
                    subContainerClassName={'pages-pagination'}
                    pageLinkClassName={'link-pagination'}
                    pageClassName={'page-pagination'}
                    activeClassName={'active-div-page'}
                    activeLinkClassName={'active-link-page'}
                    previousLinkClassName={'link-pagination'}
                    nextLinkClassName={'link-pagination'}
                    previousClassName={'page-pagination'}
                    nextClassName={'page-pagination'}
                />
            </div>
        )
    }

    render() {
        const { fetching } = this.state
        let movies = this.popularMoviesList()

        return (
            <React.Fragment>
                <div className='component-header'>
                    <h4>Popular <Octicon size={30} icon={Pulse} /></h4>
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
                        {this.displayPagination()}
                        <PoseGroup animateOnMount>
                            {(movies && movies.length) && movies}
                        </PoseGroup>
                        {this.displayPagination()}

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