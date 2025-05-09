import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import API from "./API/api.js";
import "./Refridge.css";

// 상품추가 모달
function AddProductModal({ onClose, onReceipt, onManual, onFileUpload }) {
  const fileInputRef = useRef(null);

  // 파일 업로드 버튼 클릭 시 input 트리거
  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  // 파일 선택 시 부모로 전달
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onFileUpload && onFileUpload(e.target.files[0]);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>상품 추가 방법 선택</h2>
        <div className="modal-btn-group">
          <button className="modal-btn" onClick={onReceipt}>
            영수증 인식
          </button>
          <button className="modal-btn" onClick={handleFileButtonClick}>
            영수증 파일 업로드
          </button>
          <button className="modal-btn" onClick={onManual}>
            직접입력
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
        <button className="modal-close-btn" onClick={onClose}>
          닫기
        </button>
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
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>영수증 촬영</h2>
        <div style={{ marginBottom: 16 }}>
          {imgSrc ? (
            <img
              src={imgSrc}
              alt="captured"
              style={{ width: 320, borderRadius: 8 }}
            />
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
            <button className="modal-btn" onClick={capture}>
              촬영
            </button>
          ) : (
            <button className="modal-btn" onClick={() => setImgSrc(null)}>
              다시찍기
            </button>
          )}
          <button className="modal-btn" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

const initialData = [
  {
    group: "육류",
    items: [
      { id: 1, name: "소고기", image: null, createdAt: "2025-05-09T14:30:00Z" },
      {
        id: 2,
        name: "돼지고기",
        image: null,
        createdAt: "2025-05-08T09:15:00Z",
      },
      { id: 3, name: "닭고기", image: null, createdAt: "2025-05-07T18:00:00Z" },
      { id: 4, name: "양고기", image: null, createdAt: "2025-05-06T11:00:00Z" },
      { id: 5, name: "베이컨", image: null, createdAt: "2025-05-05T08:45:00Z" },
      { id: 6, name: "햄", image: null, createdAt: "2025-05-04T20:10:00Z" },
    ],
  },
  {
    group: "채소",
    items: [
      { id: 7, name: "양파", image: null, createdAt: "2025-05-09T10:00:00Z" },
      { id: 8, name: "마늘", image: null, createdAt: "2025-05-08T13:30:00Z" },
      { id: 9, name: "당근", image: null, createdAt: "2025-05-07T15:20:00Z" },
      { id: 10, name: "감자", image: null, createdAt: "2025-05-06T17:00:00Z" },
      {
        id: 11,
        name: "파프리카",
        image: null,
        createdAt: "2025-05-05T09:00:00Z",
      },
      {
        id: 12,
        name: "브로콜리",
        image: null,
        createdAt: "2025-05-04T19:00:00Z",
      },
    ],
  },
  {
    group: "과일",
    items: [
      { id: 13, name: "사과", image: null, createdAt: "2025-05-09T12:00:00Z" },
      {
        id: 14,
        name: "바나나",
        image: null,
        createdAt: "2025-05-08T08:00:00Z",
      },
      { id: 15, name: "딸기", image: null, createdAt: "2025-05-07T09:30:00Z" },
      { id: 16, name: "포도", image: null, createdAt: "2025-05-06T16:00:00Z" },
      {
        id: 17,
        name: "오렌지",
        image: null,
        createdAt: "2025-05-05T10:10:00Z",
      },
    ],
  },
  {
    group: "유제품",
    items: [
      { id: 18, name: "우유", image: null, createdAt: "2025-05-09T07:00:00Z" },
      { id: 19, name: "치즈", image: null, createdAt: "2025-05-08T11:00:00Z" },
      {
        id: 20,
        name: "요거트",
        image: null,
        createdAt: "2025-05-07T20:00:00Z",
      },
      { id: 21, name: "버터", image: null, createdAt: "2025-05-06T14:00:00Z" },
    ],
  },
  {
    group: "음료",
    items: [
      { id: 22, name: "물", image: null, createdAt: "2025-05-09T08:00:00Z" },
      { id: 23, name: "주스", image: null, createdAt: "2025-05-08T16:00:00Z" },
      {
        id: 24,
        name: "탄산수",
        image: null,
        createdAt: "2025-05-07T21:00:00Z",
      },
      { id: 25, name: "커피", image: null, createdAt: "2025-05-06T07:00:00Z" },
      { id: 26, name: "커피", image: null, createdAt: "2025-05-05T07:00:00Z" },
      { id: 27, name: "커피", image: null, createdAt: "2025-05-04T07:00:00Z" },
      { id: 28, name: "커피", image: null, createdAt: "2025-05-03T07:00:00Z" },
      { id: 29, name: "커피", image: null, createdAt: "2025-05-02T07:00:00Z" },
      { id: 30, name: "커피", image: null, createdAt: "2025-05-01T07:00:00Z" },
      { id: 31, name: "커피", image: null, createdAt: "2025-04-30T07:00:00Z" },
      { id: 32, name: "커피", image: null, createdAt: "2025-04-29T07:00:00Z" },
      { id: 33, name: "커피", image: null, createdAt: "2025-04-28T07:00:00Z" },
    ],
  },
];

const sortOptions = ["최신 순", "오래된 순"];

function Refridge() {
  const navigate = useNavigate();
  const [sort, setSort] = useState(sortOptions[0]);
  const [data] = useState(initialData);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [receiptImg, setReceiptImg] = useState(null);

  const getSortedGroups = () => {
    if (sort === "최신 순") return [...data].reverse();
    if (sort === "오래된 순") return data;
    return data;
  };

  const getSortedItems = (items) => {
    if (sort === "최신 순") {
      // 최신순: createdAt 내림차순
      return [...items].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
    if (sort === "오래된 순") {
      // 오래된순: createdAt 오름차순
      return [...items].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    }
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
    navigate("/self"); 
    console.log("직접입력 클릭");
  };

  // 카메라에서 이미지 캡처
  const handleCapture = async (imgSrc) => {
    setReceiptImg(imgSrc);

    const payload = {
      image: imgSrc,
      createdAt: new Date().toISOString(),
    };

    try {
      const result = await API("/", "post", payload);

      alert(
        "영수증 사진이 촬영·전송되었습니다!\n서버 응답: " +
          JSON.stringify(result)
      );
    } catch (error) {
      alert("OCR 서버 전송 실패: " + error.message);
    }

    setShowCameraModal(false);
  };

  return (
    <div className="fridge-bg">
      <div className="fridge-frame">
        <header className="fridge-header">
          <button
            className="fridge-top-btn"
            onClick={() => setShowAddModal(true)}
          >
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
              onChange={(e) => setSort(e.target.value)}
            >
              {sortOptions.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>
          {getSortedGroups().map((group) => (
            <section className="fridge-section" key={group.group}>
              <div className="fridge-group-title">{group.group}</div>
              <div className="fridge-items-box">
                {getSortedItems(group.items).map((item) => (
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
