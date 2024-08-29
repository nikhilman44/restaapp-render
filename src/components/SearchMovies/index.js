import {useState, useEffect, useContext} from 'react'

import Loader from 'react-loader-spinner'

import MoviesList from '../MoviesList'
import MovieContext from '../../context/MovieContext'

import './index.css'

const apiStatusObject = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const SearchMovies = () => {
  const {
    searchInput,
    isSearchBtnClicked,
    searchApiStatus,
    updateSearchApiStatus,
  } = useContext(MovieContext)

  const [searchMovieData, setSearchMovieData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    if (isSearchBtnClicked) {
      const fetchData = async () => {
        const apiKey = '546b7fec357161c04a1bacab281229ae'
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchInput}&page=${currentPage}`
        const options = {
          method: 'GET',
        }

        const response = await fetch(url, options)

        if (response.ok) {
          const data = await response.json()
          const {results} = data
          const updatedData = results.map(eachItem => ({
            adult: eachItem.adult,
            backdropPath: eachItem.backdrop_path,
            genreIds: eachItem.genre_ids,
            id: eachItem.id,
            originalLanguage: eachItem.original_language,
            originalTitle: eachItem.original_title,
            overview: eachItem.overview,
            popularity: eachItem.popularity,
            posterPath: eachItem.poster_path,
            releaseDate: eachItem.release_date,
            title: eachItem.title,
            video: eachItem.video,
            voteAverage: eachItem.vote_average,
            voteCount: eachItem.vote_count,
          }))

          setSearchMovieData(updatedData)
          updateSearchApiStatus(apiStatusObject.success)
        } else {
          updateSearchApiStatus(apiStatusObject.failure)
        }
      }

      fetchData()
    }
  }, [searchApiStatus])

  const onClickRetry = () => {
    updateSearchApiStatus(apiStatusObject.loading)
  }

  const renderApiFailureView = () => (
    <div className="failure-card">
      <p className="failure-not-found-heading">Not Found</p>
      <button onClick={onClickRetry} type="button" className="retry-button">
        Retry
      </button>
    </div>
  )

  const renderNoSearchResult = () => (
    <div className="failure-card">
      <p className="failure-not-found-heading">Not Search Result</p>
      <button onClick={onClickRetry} type="button" className="retry-button">
        Retry
      </button>
    </div>
  )

  const renderApiSuccessView = () => {
    if (searchMovieData.length !== 0) {
      return <MoviesList moviesData={searchMovieData} />
    }

    return renderNoSearchResult()
  }

  const renderApiStatusView = () => {
    if (searchApiStatus === apiStatusObject.success) {
      return renderApiSuccessView()
    }

    return renderApiFailureView()
  }

  const renderLoader = () => (
    <div className="loader-card">
      <Loader type="ThreeDots" height={60} width={60} color="#54ce77" />
    </div>
  )
  const onClickPrevBtn = () => {
    if (currentPage > 1) {
      setCurrentPage(prevState => prevState - 1)
      updateSearchApiStatus(apiStatusObject.loading)
    }
  }

  const onClickNextBtn = () => {
    setCurrentPage(prevState => prevState + 1)
    updateSearchApiStatus(apiStatusObject.loading)
  }

  return (
    <div className="search-movie-card">
      {searchApiStatus === apiStatusObject.loading
        ? renderLoader()
        : renderApiStatusView()}
      <div className="prev-next-button-card">
        <button
          className="prev-next-button"
          type="button"
          onClick={onClickPrevBtn}
        >
          Prev
        </button>
        <p className="prev-next-page-count">{currentPage}</p>
        <button
          className="prev-next-button"
          type="button"
          onClick={onClickNextBtn}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default SearchMovies
