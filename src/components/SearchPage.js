import React, { Component } from "react"
import Octicon, { Search } from '@primer/octicons-react'
import MovieItem from "./MovieItem"
import { connect } from "react-redux"

import { searchMovies } from "../utils"
import store from "../redux/store/store"
import { onSearchAction, listSearchedMovies } from "../redux/actions/searchActions"

import ClipLoader from 'react-spinners/ClipLoader';
import posed from 'react-pose'

import ReactPaginate from 'react-paginate';


const Box = posed.button({
  pressable: true,
  init: { scale: 1 },
  press: { scale: 0.8 }
});

class SearchPage extends Component {

  state = {
    fetching: false,
    pagesNum: 1,
    totalResults: 0,
    selectedPage: 0,
  }

  handleInputChange = (val) => {
    this.props.changeSearchQuery(val)
  }

  componentDidMount() {
    const { searchQuery } = this.props.searchReducer

    if (searchQuery.length > 0) {
      this.setState({ fetching: true }, () => {
        const { searchQuery } = this.props.searchReducer
        searchMovies(searchQuery, 1)
          .then(result => {
            this.props.fetchMovies(result.results)
            this.setState({
              fetching: false,
              pagesNum: result.total_pages,
              totalResults: result.total_results,
              selectedPage: result.page - 1,
            })
            let searchDiv = document.getElementById('scroll-to-submit')
            searchDiv.scrollIntoView({ behavior: 'smooth', top: '1px', block: "start", inline: 'start', alignToTop: true })
          })
          .catch(err => console.log(err) & this.setState({ fetching: false }))

      })
    }
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
          this.setState({
            fetching: false,
            pagesNum: result.total_pages,
            totalResults: result.total_results,
            selectedPage: result.page - 1,
          })
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
          <div key={movie.id} className="movie-item">
            <MovieItem key={movie.id} hasHoverState={true} movie={movie} {...this.props} />
          </div>

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
        this.setState({ fetching: false, selectedPage: result.page - 1 })
        let searchDiv = document.getElementById('scroll-to-submit')
        searchDiv.scrollIntoView({ behavior: 'smooth', top: '1px', block: "start", inline: 'start', alignToTop: true })
      })
      .catch(err => console.log(err) & this.setState({ fetching: false }))

  }

  displayPagination = () => {
    return this.state.totalResults > 0 && (
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', alignItems: 'center' }}>
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
          forcePage={this.state.selectedPage}
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
        <form className='form-wrapper' id="scroll-to-submit" onSubmit={(e) => this.submitSearch(e)}>
          <div className="form-inner">
            <input
              value={searchQuery}
              className="search-input"
              placeholder="Search for a movie..."
              onChange={e => this.handleInputChange(e.target.value)}
            />

            <Box type="submit" className="search-btn" onClick={this.submitSearch}>
              <span style={{ display: 'inline-block' }}>
                <Octicon className="search-icon" icon={Search} />

                Search
              </span>
            </Box>
          </div>

          <div className="form-totalResults">
            Total Search Results {this.state.totalResults}
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

            <div style={{ display: 'block', width: '100%', color: 'gray' }}>
            </div>

            {(movies && movies.length) && movies}
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

