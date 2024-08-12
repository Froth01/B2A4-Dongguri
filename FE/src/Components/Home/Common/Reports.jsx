import { useState } from "react";
import PropTypes from 'prop-types';
import { fetchReports } from "../../../Api/api";
import './css/Reports.css';

/*  Report 사용법
  <Reports
    contentId={card.storybookId}
    contentType="STORYBOOK"
    onRequestClose={() => setIsReportOpen(false)}
  />
*/

const Reports = ({ contentId, contentType, onRequestClose }) => { 
  const reportTypes = [
    { value: 'SPAM', label: '스팸입니다.' },
    { value: 'ADVERTISING', label: '홍보글입니다.' },
    { value: 'SEXUAL', label: '음란물입니다.' },
    { value: 'PRIVACY', label: '개인정보 노출 게시물입니다.' },
    { value: 'OTHER', label: '기타' }
  ];
  
  const [reportType, setReportType] = useState(reportTypes[0].value);
  const [reportReason, setReportReason] = useState('');

  const handleReportSubmit = async (event) => {
    event.preventDefault();
    if (!reportType || !reportReason) {
      alert('신고 유형과 신고 사유를 모두 입력해주세요.');
      return;
    }
    
    const formData = {
      contentId,
      contentType,
      reportType,
      reportReason,
    };

    try {
      const response = await fetchReports(formData);
      console.log('신고 성공:', response);
      onRequestClose(); // 신고 후 모달 닫기
    } catch (error) {
      console.log('신고 실패:', error);
    }
  };

  const isSubmitDisabled = !reportType || !reportReason;

  return (
    <div className="overlay" onClick={onRequestClose}>
      <div className="report-modal" onClick={(e) => e.stopPropagation()}>
        <h2>신고하기</h2>
        {/* <div>메롱</div> */}

        {/* <input type="text" placeholder="엥?" />  */}
        <form onSubmit={handleReportSubmit}>
       
          <fieldset>
          
            <legend>신고 유형</legend>
            {reportTypes.map((type) => (
              <label key={type.value}>
                <input
                  type="radio"
                  name="reportType"
                  value={type.value}
                  checked={reportType === type.value}
                  onChange={(e) => setReportType(e.target.value)}
                />
                {type.label}
              </label>
            ))}
          </fieldset>

          <label>
            신고 사유(필수):
            <input
              type="text"
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              placeholder="신고 사유를 입력하세요."
            />
          </label>

          <button 
            type="submit" 
            disabled={isSubmitDisabled}
            className="submit-button"
          >
            신고하기
          </button>
          <button type="button" className="cancel-button" onClick={onRequestClose}>취소하기</button>
        </form>
      </div>
    </div>
  );
};

Reports.propTypes = {
  contentId: PropTypes.number.isRequired,
  contentType: PropTypes.oneOf(['STORYBOOK', 'STORYWORLD', 'USER', 'COMMENT']).isRequired,
  onRequestClose: PropTypes.func.isRequired, // 추가된 prop
};

export default Reports;
