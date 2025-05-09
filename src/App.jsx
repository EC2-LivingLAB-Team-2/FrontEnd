import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="App-top">
        <button className="back-button">돌아가기</button>
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
              <option value="category1">카테고리 1</option>
              <option value="category2">카테고리 2</option>
            </select>
          </div>
          <button className="add-button">+추가</button>
        </main>
      </div>
    </div>
  );
}

export default App;