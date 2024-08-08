import { useState, useEffect } from 'react';
import MiniCardList from '../Common/MiniCardList';
import SearchBar from './SearchBar';
import './css/SNS.css';
import { fetchCardList } from '../../../Api/api';

function SNS() {
  const [snsCardList, setSnsCardList] = useState([]);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    async function fetchCards() {
      const getCardForm = {
        type: 'keyword',
        keyword: keyword || '', // 빈 문자열도 허용
      };
      try {
        const cards = await fetchCardList(getCardForm);
        if (Array.isArray(cards)) {
          setSnsCardList(cards);
        } else {
          console.error('Expected an array but received:', cards);
        }
      } catch (error) {
        console.error('Failed to fetch card list:', error);
      }
    }

    fetchCards();
  }, [keyword]);

  return (
    <div className='sns'>
      <SearchBar setKeyword={setKeyword} />
      <MiniCardList cardList={snsCardList} />
    </div>
  );
}

export default SNS;
