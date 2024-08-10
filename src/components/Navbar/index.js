import {useContext} from 'react'
import {Link} from 'react-router-dom'

import MovieContext from '../../context/MovieContext'

import './index.css'

const Navbar = () => {
  const {
    currentSection,
    updateCurrentSection,
    updateSearchInput,
    searchInput,
    updateSearchBtnClicked,
    updateSearchApiStatus,
  } = useContext(MovieContext)

  const onClickSearchButton = () => {
    updateSearchApiStatus('LOADING')
    if (searchInput !== '') {
      updateSearchBtnClicked(true)
      updateCurrentSection('')
    }
  }

  const onClickPopularButton = () => {
    updateCurrentSection('popular')
    updateSearchBtnClicked(false)
    updateSearchInput('')
  }

  const onClickTopRatedButton = () => {
    updateCurrentSection('topRated')
    updateSearchBtnClicked(false)
    updateSearchInput('')
  }

  const onClickUpcomingButton = () => {
    updateCurrentSection('upcoming')
    updateSearchBtnClicked(false)
    updateSearchInput('')
  }

  const onChangeSearchInput = event => {
    updateSearchInput(event.target.value)
  }

  return (
    <div className="navbar-card">
      <div className="navbar-title-search-card">
        <h1 className="navbar-title">movieDB</h1>
        <div className="navbar-search-card">
          <input
            value={searchInput}
            onChange={onChangeSearchInput}
            className="navbar-search-input"
            type="search"
            placeholder="Enter Text"
          />
          <button
            type="button"
            onClick={onClickSearchButton}
            className="navbar-search-button"
          >
            Search
          </button>
        </div>
      </div>
      <div className="navbar-navigation-buttons-card">
        <Link to="/" className="navigation-link">
          <h1
            type="button"
            onClick={onClickPopularButton}
            className={`navigation-button ${
              currentSection === 'popular' && 'current-navigation-button'
            }`}
          >
            Popular
          </h1>
        </Link>
        <Link to="/top-rated" className="navigation-link">
          <h1
            type="button"
            onClick={onClickTopRatedButton}
            className={`navigation-button ${
              currentSection === 'topRated' && 'current-navigation-button'
            }`}
          >
            Top Rated
          </h1>
        </Link>
        <Link to="/upcoming" className="navigation-link">
          <h1
            type="button"
            onClick={onClickUpcomingButton}
            className={`navigation-button ${
              currentSection === 'upcoming' && 'current-navigation-button'
            }`}
          >
            Upcoming
          </h1>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
