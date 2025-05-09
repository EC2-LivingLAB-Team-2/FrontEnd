import React, { useState } from 'react';
import './App.css';

function App() {
  const [fields, setFields] = useState([
    { id: 1, productName: '', category: '' },
  ]);

  const handleAddField = () => {
    const newField = { id: fields.length + 1, productName: '', category: '' };
    setFields([...fields, newField]);
  };

  const handleRemoveField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  return (
    <div className="App">
      <div className="App-top">
        <button className="back-button">돌아가기</button>
        <h1 className="title">상품 추가</h1>
        <button className="register-button">등록</button>
      </div>
      <div className="App-container">
        <main className="App-main">
          {fields.map((field) => (
            <div key={field.id} className="product-form">
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
                <option value="category1">육류</option>
                <option value="category2">해산물</option>
                <option value="category1">음료</option>
                <option value="category2">과일</option>
                <option value="category1">채소</option>
                <option value="category2">유제품</option>
                <option value="category1">곡류/가공식품</option>
                <option value="category2">조미료/소스</option>
                <option value="category1">냉동식품</option>
                <option value="category2">간식</option>
                <option value="category1">베이커리</option>
                <option value="category2">유아식품</option>
              </select>
              <button
                className="remove-button"
                onClick={() => handleRemoveField(field.id)}
              >
                X
              </button>
            </div>
          ))}
          <button className="add-button" onClick={handleAddField}>
            +추가
          </button>
        </main>
      </div>
    </div>
  );
}

export default App;