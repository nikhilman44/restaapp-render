import {useState, useEffect, useContext} from 'react'

import Loader from 'react-loader-spinner'

import Navbar from '../Navbar'
import MoviesList from '../MoviesList'
import SearchMovies from '../SearchMovies'
import MovieContext from '../../context/MovieContext'

import './index.css'

const apiStatusObject = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Home = () => {
  const [popularMovieData, setPopularMovieData] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusObject.loading)
  const {isSearchBtnClicked} = useContext(MovieContext)

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = '546b7fec357161c04a1bacab281229ae'
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
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

        setPopularMovieData(updatedData)
        setApiStatus(apiStatusObject.success)
      } else {
        setApiStatus(apiStatusObject.failure)
      }
    }

    fetchData()
  }, [apiStatus])

  const onClickRetry = () => {
    setApiStatus(apiStatusObject.loading)
  }

  const renderApiFailureView = () => (
    <div className="failure-card">
      <p className="failure-not-found-heading">Not Found</p>
      <button onClick={onClickRetry} type="button" className="retry-button">
        Retry
      </button>
    </div>
  )

  const renderApiSuccessView = () => (
    <MoviesList moviesData={popularMovieData} />
  )

  const renderSuccessOrFailureView = () => {
    if (apiStatus === apiStatusObject.success) {
      return renderApiSuccessView()
    }

    return renderApiFailureView()
  }

  //  Lodaer

  const renderLoader = () => (
    <div className="loader-card">
      <Loader type="ThreeDots" height={60} width={60} color="#54ce77" />
    </div>
  )

  const renderApiStatusView = () => {
    if (apiStatus === apiStatusObject.loading) {
      return renderLoader()
    }

    return renderSuccessOrFailureView()
  }

  return (
    <div className="home-card">
      <Navbar />
      {isSearchBtnClicked === true ? <SearchMovies /> : renderApiStatusView()}
    </div>
  )
}

export default Home
