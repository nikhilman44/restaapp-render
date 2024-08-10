import {Link} from 'react-router-dom'

import './index.css'

const MoviesList = props => {
  const {moviesData} = props

  return (
    <ul className="movies-list">
      {moviesData.map(eachItem => {
        const {id, overview, posterPath, title, voteAverage} = eachItem

        const roundedRating = parseFloat(voteAverage.toFixed(1))
        const text = overview.substring(0, 50).concat('...')
        const posterUrl = `https://image.tmdb.org/t/p/w500/${posterPath}`

        return (
          <li key={id} className="movie-items">
            <img className="movie-images" src={posterUrl} alt={title} />
            <div className="movie-items-title-rating-desp-card">
              <p className="movie-titles">{title}</p>
              <p className="movie-rating">
                {voteAverage}
                <span className="movie-rating-span">Rating</span>
              </p>
              <p className="movie-desp">{text}</p>
              <Link to={`/movie/${id}`}>
                <button
                  id={id}
                  type="button"
                  className="movie-view-details-button"
                >
                  View Details
                </button>
              </Link>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default MoviesList
