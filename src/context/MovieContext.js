import React from 'react'

const MovieContext = React.createContext({
  currentSection: 'popular',
  updateCurrentSection: () => {},
  searchInput: '',
  updateSearchInput: () => {},
  isSearchBtnClicked: false,
  updateSearchBtnClicked: () => {},
  searchApiStatus: 'LOADING',
  updateSearchApiStatus: () => {},
})

export default MovieContext
