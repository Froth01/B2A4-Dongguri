import { useState } from 'react';
import MiniCard from './MiniCard';
import SnsDetail from '../SNS/SnsDetail';
import './css/MiniCardList.css';

// S11P12B309\FE\public\img\card\dummy1.png
function MiniCardList() {
  const dummyList = [
    {
      id: 1,
      genre: '기쁨',
      isTodayKeyword: true,
      keywords: ['모험', '짐승', '친구','정말로 눈물나게 감동적이고 어쨋뜬 좋은 이야기'],
      content: '옛날 옛날 한 작은 마을에 용감한 아이가 살고 있었습니다. 어느 날, 아이는 숲 속 깊은 곳에서 이상한 소리를 들었습니다. 호기심에 가득 차 숲 속으로 들어간 아이는 커다란 짐승을 만났습니다. 하지만 그 짐승은 사실 친구가 필요한 외로운 존재였습니다. 아이는 짐승과 친구가 되어 함께 모험을 떠나고, 서로를 도우며 평생의 우정을 쌓아갔습니다.',
      originalImgUrl: '/img/card/dummy11.png',
      transformImgUrl: '/img/card/dummy1.png',
      voiceRecord: '/img/card/거짓말.mp3',
      profileImgUrl: '/img/card/profile1.png',
      author: 'author1',
      isMine: true,
      createdDate: '2024-07-01',
      modifiedDate: '2024-08-01'
    },
    {
      id: 2,
      genre: '행복',
      isTodayKeyword: true,
      keywords: ['토끼', '목걸이', '태풍'],
      content: '어느 날, 작은 토끼는 숲 속에서 반짝이는 목걸이를 발견했습니다. 목걸이를 목에 걸자마자, 토끼는 마법의 힘을 얻어 빠르게 달릴 수 있게 되었습니다. 그때, 갑작스러운 태풍이 숲을 덮쳤고, 모든 동물들이 위험에 처했습니다. 용감한 토끼는 목걸이의 힘을 이용해 친구들을 안전한 곳으로 안내하고, 모두를 태풍으로부터 구해냈습니다.',
      originalImgUrl: '/img/card/dummy22.png',
      transformImgUrl: '/img/card/dummy2.png',
      voiceRecord: '/img/card/바이.mp3',
      profileImgUrl: '/img/card/profile2.png',
      author: 'author2',
      isMine: false,
      createdDate: '2024-07-02',
      modifiedDate: '2024-08-02'
    },
    {
      id: 3,
      genre: '슬픔',
      isTodayKeyword: false,
      keywords: ['손수건', '공주'],
      content: '한때 아름다운 왕국에는 항상 슬픔에 잠긴 공주가 있었습니다. 그녀의 눈물은 마르지 않았고, 왕국의 모든 사람들은 공주를 위로하려 노력했지만 소용이 없었습니다. 어느 날, 한 소년이 손수건을 들고 공주를 찾아왔습니다. 소년은 공주에게 손수건을 건네며 "이 손수건은 마음의 슬픔을 닦아주는 마법이 있어요."라고 말했습니다. 공주는 손수건으로 눈물을 닦고 조금씩 웃음을 되찾기 시작했습니다. 결국 공주는 슬픔을 이겨내고 행복을 되찾았습니다.',
      originalImgUrl: '/img/card/dummy33.png',
      transformImgUrl: '/img/card/dummy3.png',
      voiceRecord: '/img/card/석류.mp3',
      profileImgUrl: '/img/card/profile3.png',
      author: 'author3',
      isMine: false,
      createdDate: '2024-07-03',
      modifiedDate: '2024-08-03'
    },
    {
      id: 4,
      genre: '즐거움',
      isTodayKeyword: false,
      keywords: ['운동회', '꼴등'],
      content: '한 작은 학교에서 운동회가 열렸습니다. 모든 아이들은 즐거움에 가득 차 경기에 참여했습니다. 그 중 한 아이는 모든 경기에서 꼴등을 했지만, 웃음을 잃지 않았습니다. 마지막 경주가 끝난 후, 선생님이 아이에게 물었습니다. "왜 이렇게 즐거워 보이니?" 아이는 대답했습니다. "경기에서 이기는 것보다 친구들과 함께하는 시간이 더 소중하니까요!" 모든 사람들은 아이의 말을 듣고 큰 박수를 보냈고, 아이는 진정한 승리자가 되었습니다.',
      originalImgUrl: '/img/card/dummy44.png',
      transformImgUrl: '/img/card/dummy4.png',
      voiceRecord: '/img/card/짱구.mp3',
      profileImgUrl: '/img/card/profile4.png',
      author: 'author4',
      isMine: false,
      createdDate: '2024-07-04',
      modifiedDate: '2024-08-04'
    },
  ];
  const [selectedCard, setSelectedCard] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCardClick = (card) => {
    console.log("Opening modal for card:", card);  // 로그로 카드 정보 확인
    setSelectedCard(card);
    setModalOpen(true);
};

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className='minicardlist'>
      {dummyList.map((card) => (
        <MiniCard 
          key={card.id} 
          card={card} 
          handleCardClick={handleCardClick}
        />
      ))}
      {modalOpen && (
        <SnsDetail 
          card={selectedCard}
          toggleModal={toggleModal}
          dummyList={dummyList} // 여기에서 dummyList를 전달합니다.
        />
      )}
    </div>
  );
}

export default MiniCardList;