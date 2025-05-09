import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import "./Refridge.css";

// 상품추가 모달
function AddProductModal({ onClose, onReceipt, onManual }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>상품 추가 방법 선택</h2>
        <div className="modal-btn-group">
          <button className="modal-btn" onClick={onReceipt}>영수증 인식</button>
          <button className="modal-btn" onClick={onManual}>직접입력</button>
        </div>
        <button className="modal-close-btn" onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

// 카메라 모달
function CameraModal({ onClose, onCapture }) {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    onCapture(imageSrc); // 부모로 전달
  }, [webcamRef, onCapture]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>영수증 촬영</h2>
        <div style={{ marginBottom: 16 }}>
          {imgSrc ? (
            <img src={imgSrc} alt="captured" style={{ width: 320, borderRadius: 8 }} />
          ) : (
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={320}
              videoConstraints={{ facingMode: "environment" }}
            />
          )}
        </div>
        <div className="modal-btn-group">
          {!imgSrc ? (
            <button className="modal-btn" onClick={capture}>촬영</button>
          ) : (
            <button className="modal-btn" onClick={() => setImgSrc(null)}>다시찍기</button>
          )}
          <button className="modal-btn" onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
}

const initialData = [
  {
    group: "육류",
    items: [
      { id: 1, name: "이름", image: null },
      { id: 2, name: "이름", image: null },
      { id: 3, name: "이름", image: null },
      { id: 4, name: "이름", image: null },
      { id: 5, name: "이름", image: null },
    ],
  },
  {
    group: "채소",
    items: [
      { id: 6, name: "이름", image: null },
      { id: 7, name: "이름", image: null },
      { id: 8, name: "이름", image: null },
      { id: 9, name: "이름", image: null },
      { id: 10, name: "이름", image: null },
    ],
  },
];

const sortOptions = ["최신 순", "오래된 순", "카테고리순"];

function Refridge() {
  const [sort, setSort] = useState(sortOptions[0]);
  const [data] = useState(initialData);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [receiptImg, setReceiptImg] = useState(null);


  const getSortedGroups = () => {
    if (sort === "카테고리순") return data;
    if (sort === "최신 순") return [...data].reverse();
    if (sort === "오래된 순") return data;
    return data;
  };

  const getSortedItems = (items) => {
    if (sort === "최신 순") return [...items].sort((a, b) => b.id - a.id);
    if (sort === "오래된 순") return [...items].sort((a, b) => a.id - b.id);
    return items;
  };

  // 영수증 인식 클릭 → 카메라 모달
  const handleReceipt = () => {
    setShowAddModal(false);
    setShowCameraModal(true);
  };

  // 직접입력 클릭
  const handleManual = () => {
    setShowAddModal(false);
    alert("직접입력 기능을 구현하세요!");
  };

  // 카메라에서 이미지 캡처
  const handleCapture = (imgSrc) => {
    setReceiptImg(imgSrc);
    // imgSrc를 OCR 서버로 전송하는 로직을 여기에 추가하면 됩니다.
    alert("영수증 사진이 촬영되었습니다! (OCR 연동 가능)");
    setShowCameraModal(false);
  };

  return (
    <div className="fridge-bg">
      <div className="fridge-frame">
        <header className="fridge-header">
          <button className="fridge-top-btn" onClick={() => setShowAddModal(true)}>
            상품 추가
          </button>
          <h1 className="fridge-title">냉장고</h1>
          <button className="fridge-top-btn">레시피 추천</button>
        </header>
        <main className="fridge-main">
          <div className="fridge-sort-box">
            <select
              className="fridge-sort-select"
              value={sort}
              onChange={e => setSort(e.target.value)}
            >
              {sortOptions.map(opt => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>
          {getSortedGroups().map(group => (
            <section className="fridge-section" key={group.group}>
              <div className="fridge-group-title">{group.group}</div>
              <div className="fridge-items-box">
                {getSortedItems(group.items).map(item => (
                  <div className="fridge-item" key={item.id}>
                    <div className="fridge-thumb" />
                    <div className="fridge-name">{item.name}</div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </main>
        {showAddModal && (
          <AddProductModal
            onClose={() => setShowAddModal(false)}
            onReceipt={handleReceipt}
            onManual={handleManual}
          />
        )}
        {showCameraModal && (
          <CameraModal
            onClose={() => setShowCameraModal(false)}
            onCapture={handleCapture}
          />
        )}
      </div>
    </div>
  );
}

export default Refridge;
