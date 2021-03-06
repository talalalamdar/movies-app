import React, { Component } from "react"
import { connect } from "react-redux"
import MovieItem from "./MovieItem"
import EmptyStatePage from "./EmptyStatePage";

import { getNowPlayingMovies } from '../utils';
import ClipLoader from 'react-spinners/ClipLoader';
import Octicon, { Play } from "@primer/octicons-react";

import ReactPaginate from 'react-paginate'

class NowPlayingPage extends Component {

    state = {
        fetching: true,
        nowPlayingMovies: [],
        pageNum: 1,
        selectedPage: 0,
    }

    componentDidMount() {
        getNowPlayingMovies(this.state.pageNum)
            .then(res => {
                if (res.results && res.results.length) {
                    this.setState({
                        fetching: false,
                        nowPlayingMovies: res.results,
                        pageNum: res.total_pages
                    })
                }
            })
            .catch(err => console.log(err))
    }

    nowPlayingMoviesList = () => {
        const { nowPlayingMovies } = this.state
        if (nowPlayingMovies.length > 0) {
            return nowPlayingMovies.map((movie, i) =>
                <div key={movie.id} className="movie-item">
                    <MovieItem movie={movie} hasHoverState={true} {...this.props} />
                </div>
            )
        }
    }

    handlePageClick = (page) => {
        getNowPlayingMovies(page.selected + 1)
            .then(res => {
                if (res.results && res.results.length) {
                    this.setState({
                        fetching: false,
                        nowPlayingMovies: res.results,
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
        let movies = this.nowPlayingMoviesList()

        return (
            <React.Fragment>
                <div className='component-header'>
                    <h4>Now Playing <Octicon size={30} icon={Play} /></h4>
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


export default connect(mapStateToProps, mapDispatchToProps)(NowPlayingPage)
