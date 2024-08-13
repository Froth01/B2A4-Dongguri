
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
    dispatch(setKeyword(inputValue));
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
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
          onKeyPress={handleKeyPress}
        />
        <button className="search__button" onClick={handleSearch}>
          <img src="/img/sns/search.png" alt="검색" className='search__icon'/>
        </button>
      </div>
    </div>
  );
}

export default SearchBar;