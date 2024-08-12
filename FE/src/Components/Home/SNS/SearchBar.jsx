
import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setKeyword, setSearchType, 
  fetchSearchResultsThunk, fetchUserResultsThunk, fetchNicknameResultsThunk,
  selectSearchType } from '../../../slices/searchSlice';
import './css/SearchBar.css';

function SearchBar() {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const searchType = useSelector(selectSearchType);

  useEffect(() => {
    // searchType이 변경될 때 입력값 초기화
    setInputValue('');
  }, [searchType]);


  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    console.log('searchBar inputValue:', inputValue);
    console.log('searchBar searchType:', searchType);
    // dispatch(setKeyword(inputValue));
    if (searchType === 'storybook') {
      dispatch(fetchSearchResultsThunk({
        keyword: inputValue, page : 0 }))
        console.log('searchBar',inputValue)
    } else if (searchType === 'user') {
      dispatch(fetchUserResultsThunk(inputValue));
    } else {
      dispatch(fetchNicknameResultsThunk({
        nickname: inputValue, page : 0 }))
    }
  };

  const handleTypeChange = (e) => {
    dispatch(setSearchType(e.target.value));
    console.log('검색 타입 바뀜',searchType)
  };

  // const placeholderText = searchType === 'storybook' ? '동화를 입력해주세요!' : '아이디를 입력해주세요!';
  const placeholderText = {
    storybook: '동화',
    user: '아이디',
    nickname: '닉네임',
  };

  return (
    <div className='searchbar'>
      <div className="search">
        <select className="search__type" onChange={handleTypeChange} value={searchType}>
          <option value="storybook">동화</option>
          <option value="user">아이디</option>
          <option value="nickname">닉네임</option>
        </select>
        <input 
          type="text" 
          className="search__input" 
          // placeholder="유저 닉네임 / 해시태그를 입력해주세요!" 
          placeholder={`${placeholderText[searchType]}를 입력해주세요.`}
          value={inputValue}
          onChange={handleInputChange}
        />
        <button className="search__button" onClick={handleSearch}>
          <svg className="search__icon" aria-hidden="true" viewBox="0 0 24 24">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default SearchBar;