import React, { useState } from 'react';
import './App.css';
import meatImage from './assets/img/meat.png';
import seafoodImage from './assets/img/seafood.png';
import beverageImage from './assets/img/beverage.png';
import fruitImage from './assets/img/fruit.png';
import vegetableImage from './assets/img/vegetable.png';
import dairyImage from './assets/img/milk.png';
import grainImage from './assets/img/rice.png';
import condimentImage from './assets/img/sauce.png';
import frozenImage from './assets/img/letitgo.png';
import snackImage from './assets/img/snack.png';
import bakeryImage from './assets/img/bread.png';
import babyFoodImage from './assets/img/baby.png';

function App() {
  const [fields, setFields] = useState([
    { id: 1, productName: '', category: '', image: meatImage },
  ]);

  const handleAddField = () => {
    const newField = { id: fields.length + 1, productName: '', category: '', image: meatImage };
    setFields([...fields, newField]);
  };

  const handleRemoveField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const handleCategoryChange = (id, category) => {
    const updatedFields = fields.map((field) => {
      if (field.id === id) {
        let newImage = meatImage; // 기본 이미지
        switch (category) {
          case 'category2':
            newImage = seafoodImage;
            break;
          case 'category3':
            newImage = beverageImage;
            break;
          case 'category4':
            newImage = fruitImage;
            break;
          case 'category5':
            newImage = vegetableImage;
            break;
          case 'category6':
            newImage = dairyImage;
            break;
          case 'category7':
            newImage = grainImage;
            break;
          case 'category8':
            newImage = condimentImage;
            break;
          case 'category9':
            newImage = frozenImage;
            break;
          case 'category10':
            newImage = snackImage;
            break;
          case 'category11':
            newImage = bakeryImage;
            break;
          case 'category12':
            newImage = babyFoodImage;
            break;
          default:
            newImage = meatImage;
        }
        return { ...field, category, image: newImage };
      }
      return field;
    });
    setFields(updatedFields);
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
                <img src={field.image} alt="상품 이미지" />
              </div>
              <input
                type="text"
                className="product-name-input"
                placeholder="상품명 추가"
              />
              <select
                className="category-select"
                value={field.category}
                onChange={(e) => handleCategoryChange(field.id, e.target.value)}
              >
                <option value="">카테고리 선택</option>
                <option value="category1">육류</option>
                <option value="category2">해산물</option>
                <option value="category3">음료</option>
                <option value="category4">과일</option>
                <option value="category5">채소</option>
                <option value="category6">유제품</option>
                <option value="category7">곡류/가공식품</option>
                <option value="category8">조미료/소스</option>
                <option value="category9">냉동식품</option>
                <option value="category10">간식</option>
                <option value="category11">베이커리</option>
                <option value="category12">유아식품</option>
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