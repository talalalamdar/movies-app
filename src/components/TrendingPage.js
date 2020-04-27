import React, { Component } from "react"
import { connect } from "react-redux"
import MovieItem from "./MovieItem"
import EmptyStatePage from "./EmptyStatePage";

import { getTrendingMovies } from '../utils';
import ClipLoader from 'react-spinners/ClipLoader';
import FaLineChart from 'react-icons/lib/fa/line-chart';

import ReactPaginate from 'react-paginate';


class TrendingPage extends Component {

    state = {
        fetching: true,
        trendingMovies: [],
        pageNum: 1,
        selectedPage: 0,
    }

    componentDidMount() {
        getTrendingMovies(this.state.pageNum)
            .then(res => {
                if (res.results && res.results.length) {
                    this.setState({
                        fetching: false,
                        trendingMovies: res.results,
                        pageNum: res.total_pages
                    })
                }
            })
            .catch(err => console.log(err))
    }

    trendingMoviesList = () => {
        const { trendingMovies } = this.state
        if (trendingMovies.length > 0) {
            return trendingMovies.map((movie, i) =>
                <div key={movie.id} className="movie-item">
                    <MovieItem movie={movie} hasHoverState={true} {...this.props} />
                </div>
            )
        }
    }

    handlePageClick = (page) => {
        getTrendingMovies(page.selected + 1)
            .then(res => {
                if (res.results && res.results.length) {
                    this.setState({
                        fetching: false,
                        trendingMovies: res.results,
                        selectedPage: res.page - 1
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
        let movies = this.trendingMoviesList()

        return (
            <React.Fragment>
                <div className='component-header'>
                    <h4>Trending <FaLineChart /></h4>
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
                        {(movies && movies.length) ? movies : <EmptyStatePage key="empty-page" message="No available movies" />}
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


export default connect(mapStateToProps, mapDispatchToProps)(TrendingPage)
