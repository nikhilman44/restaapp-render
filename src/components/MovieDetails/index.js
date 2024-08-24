import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusObject = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState({})
  const [combinedApiStatus, setCombinedApiStatus] = useState(
    apiStatusObject.loading,
  )
  const [castData, setCastData] = useState([])
  const {id} = useParams()
  useEffect(() => {
    const fetchData = async () => {
      const apiKey = '546b7fec357161c04a1bacab281229ae'
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
      const options = {
        method: 'GET',
      }

      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        const updatedData = {
          adult: data.adult,
          backdropPath: data.backdrop_path,
          belongsToCollection: data.belongs_to_collection,
          genres: data.genres,
          homepage: data.homepage,
          id: data.id,
          imdbId: data.imdb_id,
          originCountry: data.origin_country,
          originalLanguage: data.original_language,
          originalTitle: data.original_title,
          overview: data.overview,
          popularity: data.popularity,
          posterPath: data.poster_path,
          productionCompanies: data.production_companies,
          productionCountries: data.production_countries,
          releaseDate: data.release_date,
          revenue: data.revenue,
          runtime: data.runtime,
          spokenLanguages: data.spoken_languages,
          status: data.status,
          tagline: data.tagline,
          title: data.title,
          video: data.video,
          voteAverage: data.vote_average,
          voteCount: data.vote_count,
        }
        setMovieDetails(updatedData)
        setCombinedApiStatus(prevState =>
          prevState === apiStatusObject.failure
            ? apiStatusObject.failure
            : apiStatusObject.success,
        )
      } else {
        setCombinedApiStatus(apiStatusObject.failure)
      }
    }
    fetchData()
  }, [combinedApiStatus])

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = '546b7fec357161c04a1bacab281229ae'
      const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`
      const options = {
        method: 'GET',
      }

      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        const {cast} = data
        const updatedData = cast.map(eachItem => ({
          adult: eachItem.adult,
          castId: eachItem.cast_id,
          character: eachItem.character,
          creditId: eachItem.credit_id,
          gender: eachItem.gender,
          id: eachItem.id,
          knownForDepartment: eachItem.known_for_department,
          name: eachItem.name,
          order: eachItem.order,
          originalName: eachItem.original_name,
          popularity: eachItem.popularity,
          profilePath: eachItem.profile_path,
        }))
        setCastData(updatedData)
        setCombinedApiStatus(prevState =>
          prevState === apiStatusObject.failure
            ? apiStatusObject.failure
            : apiStatusObject.success,
        )
      } else {
        setCombinedApiStatus(apiStatusObject.failure)
      }
    }
    fetchData()
  }, [combinedApiStatus])

  const onClickRetry = () => {
    setCombinedApiStatus(apiStatusObject.loading)
  }

  const renderApiFailureView = () => (
    <div className="failure-card">
      <p className="failure-not-found-heading">Not Found</p>
      <button onClick={onClickRetry} type="button" className="retry-button">
        Retry
      </button>
    </div>
  )

  const renderGenres = genres => (
    <ul className="movie-genres-list">
      {genres.map(eachItem => (
        <li key={eachItem.id} className="movie-genres-item">
          {eachItem.name}
        </li>
      ))}
    </ul>
  )

  const renderMovieDetailsView = () => {
    const {
      voteAverage,
      posterPath,
      title,
      genres,
      releaseDate,
      overview,
    } = movieDetails

    const posterUrl = `https://image.tmdb.org/t/p/w500/${posterPath}`
    const formattedDate = new Date(releaseDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    return (
      <>
        <p className="movie-details-heading">Movie Details</p>
        <div className="movie-image-title-others-card">
          <img className="movie-details-image" src={posterUrl} alt={title} />
          <div className="movie-details-title-ratings-card">
            <p className="movie-details-title">{title}</p>
            <p className="movie-details-rating">
              {voteAverage}
              <span className="movie-details-rating-span">Rating</span>
            </p>
            {renderGenres(genres)}
            <p className="movie-release-date">{formattedDate}</p>
          </div>
        </div>
        <p className="movie-details-overview">{overview}</p>
        <hr className="horizontal-line" />
      </>
    )
  }

  const renderCastDetailsView = () => (
    <ul className="movie-cast-list">
      {castData.map(eachItem => {
        const {character, name, profilePath} = eachItem

        const posterUrl = `https://image.tmdb.org/t/p/w500/${profilePath}`
        const uniqueKey = eachItem.id

        return (
          <li className="movie-cast-items" key={uniqueKey}>
            <img className="cast-image" src={posterUrl} alt={name} />
            <p className="cast-original-name">{name}</p>
            <p className="cast-character-name">{character}</p>
          </li>
        )
      })}
    </ul>
  )

  const renderApiSuccessView = () => (
    <div className="movie-details-cast-card">
      {renderMovieDetailsView()}
      <p className="movie-cast-heading">Cast</p>
      {renderCastDetailsView()}
    </div>
  )

  const renderApiStatusView = () => {
    if (combinedApiStatus === apiStatusObject.success) {
      return renderApiSuccessView()
    }

    return renderApiFailureView()
  }

  const renderLoader = () => (
    <div className="loader-card">
      <Loader type="ThreeDots" height={60} width={60} color="#54ce77" />
    </div>
  )

  return (
    <div className="movie-details-card">
      {combinedApiStatus === apiStatusObject.loading
        ? renderLoader()
        : renderApiStatusView()}
    </div>
  )
}

export default MovieDetails
