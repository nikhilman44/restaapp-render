import {useState} from 'react'
import {Switch, Route, withRouter} from 'react-router-dom'

import Home from './components/Home'
import TopRated from './components/TopRated'
import Upcoming from './components/Upcoming'
import MovieDetails from './components/MovieDetails'

import MovieContext from './context/MovieContext'

import './App.css'

const apiStatusObject = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

// write your code here
const App = props => {
  const {location} = props
  const {pathname} = location

  const [searchInput, setSearchInput] = useState('')
  const [isSearchBtnClicked, setSearchBtnClicked] = useState(false)
  const [searchApiStatus, setSearchApiStatus] = useState(
    apiStatusObject.loading,
  )

  const updateSearchApiStatus = apiStatus => {
    setSearchApiStatus(apiStatus)
  }

  const updateSearchInput = userSearch => {
    setSearchInput(userSearch)
  }

  const updateSearchBtnClicked = value => {
    setSearchBtnClicked(value)
  }

  const getCurrentSection = path => {
    switch (path) {
      case '/':
        return 'popular'
      case '/top-rated':
        return 'topRated'
      case '/upcoming':
        return 'upcoming'
      default:
        return ''
    }
  }
  const [currentSection, setCurrentSection] = useState(
    getCurrentSection(pathname),
  )

  const updateCurrentSection = section => {
    setCurrentSection(section)
  }
  return (
    <MovieContext.Provider
      value={{
        currentSection,
        updateCurrentSection,
        searchInput,
        updateSearchInput,
        isSearchBtnClicked,
        updateSearchBtnClicked,
        searchApiStatus,
        updateSearchApiStatus,
      }}
    >
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/top-rated" component={TopRated} />
        <Route exact path="/upcoming" component={Upcoming} />
        <Route exact path="/movie/:id" component={MovieDetails} />
      </Switch>
    </MovieContext.Provider>
  )
}

export default withRouter(App)
