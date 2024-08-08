import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setKeyword, fetchSearchResultsThunk } from '../../../slices/searchSlice';
import { setUserId, fetchUserResultsThunk } from '../../../slices/searchUserSlice';
import './css/SearchBar.css'

function SearchBar() {
  const [searchType, setSearchType] = useState('storybook')
  const [inputValue, setInputValue] = useState('')
  const dispatch = useDispatch()

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleSearch = () => {
    if (searchType === '동화') {
      dispatch(setKeyword(inputValue));
      dispatch(fetchSearchResultsThunk(inputValue));
    } else {
      dispatch(setUserId(inputValue));
      dispatch(fetchUserResultsThunk(inputValue))
    }
  };

  return (
    <div className='searchbar'>
      <div className="search">
        <select  className="search__select" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
          <option value="storybook">동화</option>
          <option value="user">유저</option>
        </select>
        <input type="text" className="search__input" placeholder={`${searchType}를 입력해주세요!`}
        value={inputValue}
        onChange={handleInputChange}/>
        <button className="search__button" onClick={handleSearch}>
        <svg className="search__icon" aria-hidden="true" viewBox="0 0 24 24">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
        </svg>
        </button>
      </div>
    </div>
  )
}

export default SearchBar