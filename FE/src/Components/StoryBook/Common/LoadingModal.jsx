// import React from 'react';
import Modal from 'react-modal';
import './css/LoadingModal.css';
import PropTypes from 'prop-types'; 
import { useEffect } from 'react';

Modal.setAppElement('#root');

const LoadingModal = ({ isOpen }) => {
  useEffect(() => {
    console.log('LoadingModal isOpen:', isOpen); // isOpen 상태를 콘솔에 출력
  }, [isOpen]); // isOpen이 변경될 때마다 실행

  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Loading"
      className="loading-modal"
      overlayClassName="loading-overlay"
    >
      <div className="loading-content">
        <h2>로딩 중...</h2>
        {/* 여기에 로딩 스피너 추가 가능 */}
      </div>
    </Modal>
  );
};

LoadingModal.propTypes = {
  isOpen: PropTypes.bool.isRequired // isOpen의 타입과 필수 여부 명시
};

export default LoadingModal;


// import React, { useEffect } from 'react';
// import Modal from 'react-modal';
// import PropTypes from 'prop-types'; 
// import './css/LoadingModal.css';

// Modal.setAppElement('#root');

// const LoadingModal = ({ isOpen, onRequestClose }) => {
//   useEffect(() => {
//     console.log('LoadingModal isOpen:', isOpen);
//     if (isOpen) {
//       initGame();
//     }
//   }, [isOpen]);

//   const initGame = () => {
//     const canvas = document.getElementById("gameCanvas");
    
//     if (!canvas) {
//       console.error("Canvas element not found!");
//       return;
//     }

//     const ctx = canvas.getContext('2d');

//     canvas.width = 400;
//     canvas.height = 300;

//     let dinoImg = new Image();
//     let cactusImg = new Image();

//     dinoImg.src = "/img/storybook/dino.png";
//     cactusImg.src = "/img/storybook/cactus.png";

//     // 이미지 로드 실패 시 대체 텍스트 표시
//     dinoImg.onerror = () => {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         ctx.fillStyle = 'black';
//         ctx.font = '20px Arial';
//         ctx.fillText("공룡 이미지를 불러올 수 없습니다.", 10, 50);
//     };

//     cactusImg.onerror = () => {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         ctx.fillStyle = 'black';
//         ctx.font = '20px Arial';
//         ctx.fillText("선인장 이미지를 불러올 수 없습니다.", 10, 100);
//     };

//     // 이미지 로드 성공 시 게임 시작
//     dinoImg.onload = () => {
//       cactusImg.onload = () => {
//         startGame(ctx, dinoImg, cactusImg);
//       };
//     };
//   };

//   const startGame = (ctx, dinoImg, cactusImg) => {
//     let dino = {
//       x: 10,
//       y: 200,
//       width: 25,
//       height: 25,
//       draw() {
//         ctx.drawImage(dinoImg, this.x, this.y, this.width + 25, this.height + 25);
//       }
//     };

//     class Cactus {
//       constructor() {
//         this.x = 400;
//         this.y = 190;
//         this.width = 25;
//         this.height = 30;
//       }

//       draw() {
//         ctx.drawImage(cactusImg, this.x, this.y, this.width + 25, this.height + 30);
//       }
//     }

//     let timer = 0;
//     let cactuses = [];
//     let isJump = false;
//     let jumpTimer = 0;
//     let animation;

//     function init() {
//       animation = requestAnimationFrame(init);
//       timer++;

//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       if (timer % 200 === 0) {
//         let cactus = new Cactus();
//         cactuses.push(cactus);
//       }

//       cactuses.forEach((cactus, i, o) => {
//         if (cactus.x < 0) {
//           o.splice(i, 1);
//         }
//         cactus.x -= 2;

//         collisionDetect(dino, cactus);

//         cactus.draw();
//       });

//       if (isJump) {
//         dino.y -= 2;
//         jumpTimer++;
//       }

//       if (!isJump) {
//         if (dino.y < 200) {
//           dino.y += 2;
//         }
//       }

//       if (jumpTimer > 50) {
//         isJump = false;
//         jumpTimer = 0;
//       }

//       dino.draw();
//     }

//     function collisionDetect(dino, cactus) {
//       let xDiff = cactus.x - (dino.x + dino.width);
//       let yDiff = cactus.y - (dino.y + dino.height);

//       if (xDiff < 0 && yDiff < 0) {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         cancelAnimationFrame(animation);
//         onRequestClose(); // 게임이 끝나면 모달을 닫음
//       }
//     }

//     document.addEventListener('keydown', function (e) {
//       if (e.code === 'Space' && !isJump && dino.y === 200) {
//         isJump = true;
//       }
//     });

//     init();
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onRequestClose}
//       contentLabel="Loading"
//       className="loading-modal"
//       overlayClassName="loading-overlay"
//     >
//       <div className="loading-content">
//         <h2>로딩 중...</h2>
//         <canvas id="gameCanvas"></canvas>
//       </div>
//     </Modal>
//   );
// };

// LoadingModal.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   onRequestClose: PropTypes.func.isRequired
// };

// export default LoadingModal;
