import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);        // 카드 목록
  const [selectedId, setSelectedId] = useState(null); // 현재 열려 있는 카드 ID
  const [recipe, setRecipe] = useState('');    // 레시피 내용
  const [selectedIngredients, setSelectedIngredients] = useState([]);


  useEffect(() => {
    // ✅ 여기서 재료 목록 정의 (ESLint 경고 없도록 useEffect 안에 선언)
    const ingredientsPayload = {
      ingredients: [
        ["소고기", 1],
        ["닭가슴살", 2],
        ["계란", 3],
        ["우유", 1],
        ["치즈", 1],
        ["양파", 2],
        ["당근", 1],
        ["감자", 3],
        ["시금치", 1],
        ["토마토", 2],
        ["사과", 1],
        ["바나나", 2],
        ["오징어", 1],
        ["새우", 1],
        ["두부", 1],
        ["밥", 2],
        ["빵", 1],
        ["간장", 1],
        ["고추장", 1],
        ["케첩", 1],
        ["버터", 1],
        ["식용유", 1],
        ["물", "무제한"],
        ["소금", 1],
        ["후추", 1],
        ["마늘", 2],
        ["청양고추", 2],
        ["밀가루", 1]
      ]
    };

    // ✅ API 요청
    fetch('https://9bbb-1-216-24-221.ngrok-free.app/api/v1/recommend-recipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ingredientsPayload)
    })
      .then(res => res.json())
      .then(json => {
        console.log('✅ 서버 응답:', json);

        if (json.status === 200 && json.data) {
          // 👉 data가 객체 하나일 수도 있고, 배열일 수도 있음
          const dataArray = Array.isArray(json.data) ? json.data : [json.data];

          const formatted = dataArray.map((item, index) => ({
            id: `${(index + 1).toString().padStart(3, '0')}`,
            name: item.name,
            instructions: item.instructions,
            ingredients: item.ingredients || [] // 배열 형태로 저장
          }));


          setData(formatted);
        } else {
          console.error('⚠️ 응답 구조 문제:', json);
        }
      })
      .catch(err => {
        console.error('❌ API 호출 실패:', err);
      });
  }, []);

  // 화살표 클릭 시 레시피 토글
const handleArrowClick = (id, instructions, ingredients) => {
  if (selectedId === id) {
    setSelectedId(null);
    setRecipe('');
    setSelectedIngredients([]);
  } else {
    setSelectedId(id);
    setRecipe(instructions);
    setSelectedIngredients(ingredients);
  }
};


  return (
    <div className="app">
      <header className="header">
        <h3>레시피 추천</h3>
        <div className="toggle" />
      </header>

      <div className="card-container">
        {data.map(item => (
          <div key={item.id} className="card-recipe-wrapper">
            <div className="recommendation-card">
              <div className="id">{item.id}</div>
              <div className="info">
                <div className="name">{item.name}</div>
              </div>
              <div
                className="action"
                onClick={() =>
                  handleArrowClick(item.id, item.instructions, item.ingredients)
                }
              >
                {'>>'}
              </div>
            </div>
            {selectedId === item.id && (
              <div className="recipe-box">
                <div className="recipe-text">
                  <strong>[재료]</strong>
                  <div style={{ marginBottom: '1rem' }}>
                    {selectedIngredients.join(', ')}
                  </div>

                  <strong>[조리법]</strong>
                  {recipe
                    .split(/\d+\.\s*/)
                    .filter(step => step.trim() !== '')
                    .map((step, index) => (
                      <div key={index}>
                        {index + 1}. {step.trim()}
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
