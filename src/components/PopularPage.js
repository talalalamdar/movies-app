import React, { Component } from "react"
import { connect } from "react-redux"
import MovieItem from "./MovieItem"

import { getPopularMovies } from '../utils';
import ClipLoader from 'react-spinners/ClipLoader';
import Octicon, { Pulse } from "@primer/octicons-react";

import ReactPaginate from 'react-paginate'


class PopularPage extends Component {

    state = {
        fetching: true,
        popularMovies: [],
        pagesNum: 1,
        selectedPage: 0
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
                <div key={movie.id} className="movie-item">
                    <MovieItem movie={movie}  {...this.props} />
                </div>
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
                        pagesNum: res.total_pages,
                        selectedPage: res.page - 1,
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
                    forcePage={this.state.selectedPage}
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
                        {(movies && movies.length) && movies}
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
