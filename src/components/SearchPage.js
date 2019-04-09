import React, { Component } from "react"
import Octicon, { Search } from '@githubprimer/octicons-react'
import MovieItem from "./MovieItem"
import { connect } from "react-redux"

import { searchMovies } from "../utils"
import store from "../redux/store/store"
import { onSearchAction, listSearchedMovies } from "../redux/actions/searchActions"

import ClipLoader from 'react-spinners/ClipLoader';
import posed, { PoseGroup } from 'react-pose'

import ReactPaginate from 'react-paginate';


const Box = posed.button({
    pressable: true,
    init: { scale: 1 },
    press: { scale: 0.8 }
});

const MovieContainer = posed.div({
    enter: {
        scale: 1,
        delay: props => props.i * 100,
    },
    exit: { scale: 0 }
});


class SearchPage extends Component {

    state = {
        fetching: false,
        pagesNum: 1
    }

    handleInputChange = (val) => {
        this.props.changeSearchQuery(val)
    }

    submitSearch = (e) => {
        e.preventDefault()
        this.setState({ fetching: true }, () => {
            const { searchQuery } = this.props.searchReducer
            if (searchQuery.length < 1) {
                this.setState({ fetching: false })
                return
            }
            searchMovies(searchQuery, 1)
                .then(result => {
                    this.props.fetchMovies(result.results)
                    this.setState({ fetching: false, pagesNum: result.total_pages })
                    let searchDiv = document.getElementById('scroll-to-submit')
                    searchDiv.scrollIntoView({ behavior: 'smooth', top: '1px', block: "start", inline: 'start', alignToTop: true })
                })
                .catch(err => console.log(err) & this.setState({ fetching: false }))

        })
    }

    moviesList = () => {
        const { moviesList } = this.props.searchReducer


        if (moviesList.length) {
            const movies = moviesList.map((movie, i) => {

                return movie.id && (
                    <MovieContainer key={movie.id} i={i} className="movie-item">
                        <MovieItem key={movie.id} movie={movie} {...this.props} />
                    </MovieContainer>

                )
            })
            return movies
        }
    }

    handlePageClick = (page) => {
        const { searchQuery } = this.props.searchReducer
        searchMovies(searchQuery, page.selected + 1)
            .then(result => {
                this.props.fetchMovies([])
                this.props.fetchMovies(result.results)
                this.setState({ fetching: false })
                let searchDiv = document.getElementById('scroll-to-submit')
                searchDiv.scrollIntoView({ behavior: 'smooth', top: '1px', block: "start", inline: 'start', alignToTop: true })
            })
            .catch(err => console.log(err) & this.setState({ fetching: false }))

    }

    displayPagination = () => {
        return (
            <div style={{display: 'flex', justifyContent: 'center', width: '100%', alignItems: 'center'}}>
                <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    breakLinkClassName={'link-pagination'}
                    breakClassName={'page-pagination'}
                    pageCount={this.state.pagesNum}
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
        const { searchQuery } = this.props.searchReducer
        const movies = this.moviesList()
        const { fetching } = this.state

        return (
            <div className="search-page">
                <form id="scroll-to-submit" onSubmit={(e) => this.submitSearch(e)}>
                    <div className='form-wrapper'>
                        <input value={searchQuery} className="search-input" placeholder="Search for a movie..." onChange={e => this.handleInputChange(e.target.value)}></input>
                        <Box type="submit" className="search-btn" onClick={this.submitSearch}>
                            <span style={{ display: 'inline-block' }}>
                                Search <Octicon className="search-icon" icon={Search} />
                            </span>
                        </Box>
                    </div>
                </form>
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
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = () => ({
    changeSearchQuery: (val) => store.dispatch(onSearchAction(val)),
    fetchMovies: val => store.dispatch(listSearchedMovies(val)),
})



export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)

