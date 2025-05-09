import React from 'react';
import { useNavigate } from "react-router-dom";
import './self.css';

function Self() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <div className="App-top">
        <button className="back-button" onClick={() => navigate(-1)}>돌아가기</button>
        <h1 className="title">상품 추가</h1>
        <button className="register-button">등록</button>
      </div>
      <div className="App-container">
        <main className="App-main">
          <div className="product-form">
            <div className="product-image">
              <img src="https://via.placeholder.com/100" alt="상품 이미지" />
            </div>
            <input
              type="text"
              className="product-name-input"
              placeholder="상품명 추가"
            />
            <select className="category-select">
              <option value="">카테고리 선택</option>
              <option value="육류">육류</option>
              <option value="채소">채소</option>
              <option value="과일">과일</option>
              <option value="유제품">유제품</option>
              <option value="음료">음료</option>
            </select>
          </div>
          <button className="add-button">+추가</button>
        </main>
      </div>
    </div>
  );
}

export default Self;
