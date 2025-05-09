import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import API from "./API/api.js";
import "./Refridge.css";

// 회색 원(기본 이미지 대체)
function GrayCircle() {
  return (
    <div
      style={{
        width: 60,
        height: 60,
        borderRadius: "50%",
        background: "#e0e0e0",
        marginBottom: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    />
  );
}

// 로딩 스피너
function Spinner() {
  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(255,255,255,0.6)",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          border: "8px solid #eee",
          borderTop: "8px solid #3498db",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}</style>
    </div>
  );
}

// 상품추가 모달
function AddProductModal({ onClose, onReceipt, onManual, onFileUpload }) {
  const fileInputRef = useRef(null);

  const handleFileButtonClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) onFileUpload(file);
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
    onCapture(imageSrc);
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

// base64 → Blob 변환 함수
function base64ToBlob(base64) {
  const [meta, data] = base64.split(",");
  const mime = meta.match(/:(.*?);/)[1];
  const bin = atob(data);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return new Blob([arr], { type: mime });
}

// 더미 데이터 (4개 값만)
const initialData = [
  {
    group: "육류",
    items: [
      ["소고기", 1, "육류", "2025-05-09T14:30:00Z"],
      ["돼지고기", 1, "육류", "2025-05-08T09:15:00Z"],
      ["닭고기", 1, "육류", "2025-05-07T18:00:00Z"],
      ["양고기", 1, "육류", "2025-05-06T11:00:00Z"],
      ["베이컨", 1, "육류", "2025-05-05T08:45:00Z"],
      ["햄", 1, "육류", "2025-05-04T20:10:00Z"],
    ],
  },
  {
    group: "채소",
    items: [
      ["양파", 1, "채소", "2025-05-09T10:00:00Z"],
      ["마늘", 1, "채소", "2025-05-08T13:30:00Z"],
      ["당근", 1, "채소", "2025-05-07T15:20:00Z"],
      ["감자", 1, "채소", "2025-05-06T17:00:00Z"],
      ["파프리카", 1, "채소", "2025-05-05T09:00:00Z"],
      ["브로콜리", 1, "채소", "2025-05-04T19:00:00Z"],
    ],
  },
  {
    group: "과일",
    items: [
      ["사과", 1, "과일", "2025-05-09T12:00:00Z"],
      ["바나나", 1, "과일", "2025-05-08T08:00:00Z"],
      ["딸기", 1, "과일", "2025-05-07T09:30:00Z"],
      ["포도", 1, "과일", "2025-05-06T16:00:00Z"],
      ["오렌지", 1, "과일", "2025-05-05T10:10:00Z"],
    ],
  },
  {
    group: "유제품",
    items: [
      ["우유", 1, "유제품", "2025-05-09T07:00:00Z"],
      ["치즈", 1, "유제품", "2025-05-08T11:00:00Z"],
      ["요거트", 1, "유제품", "2025-05-07T20:00:00Z"],
      ["버터", 1, "유제품", "2025-05-06T14:00:00Z"],
    ],
  },
  {
    group: "음료",
    items: [
      ["물", 1, "음료", "2025-05-09T08:00:00Z"],
      ["주스", 1, "음료", "2025-05-08T16:00:00Z"],
      ["탄산수", 1, "음료", "2025-05-07T21:00:00Z"],
      ["커피", 1, "음료", "2025-05-06T07:00:00Z"],
    ],
  },
];

const sortOptions = ["최신 순", "오래된 순"];

// OCR 결과를 기존 데이터에 추가(병합)
function mergeInitialData(oldData, newResult) {
  // OCR 데이터에 이미지가 없으면 undefined를 추가
  const newResultWithImg = newResult.map((arr) =>
    arr.length === 5 ? arr : [...arr, undefined]
  );
  // 기존 데이터도 이미지 필드가 없으면 undefined로 맞춰줌
  const groupMap = {};
  oldData.forEach((groupObj) => {
    groupMap[groupObj.group] = groupObj.items.map((item) =>
      item.length === 5 ? item : [...item, undefined]
    );
  });
  newResultWithImg.forEach((arr) => {
    const category = arr[2];
    if (groupMap[category]) {
      groupMap[category].push(arr);
    } else {
      groupMap[category] = [arr];
    }
  });
  return Object.entries(groupMap).map(([group, items]) => ({ group, items }));
}

function Refridge() {
  const navigate = useNavigate();
  const [sort, setSort] = useState(sortOptions[0]);
  const [data, setData] = useState(initialData);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const getSortedGroups = () => {
    if (sort === "최신 순") return [...data].reverse();
    return data;
  };

  const getSortedItems = (items) => {
    if (sort === "최신 순")
      return [...items].sort((a, b) => new Date(b[3]) - new Date(a[3]));
    if (sort === "오래된 순")
      return [...items].sort((a, b) => new Date(a[3]) - new Date(b[3]));
    return items;
  };

  const handleReceipt = () => {
    setShowAddModal(false);
    setShowCameraModal(true);
  };

  const handleManual = () => {
    setShowAddModal(false);
    navigate("/self");
  };

  // OCR 결과를 기존 데이터에 추가
  const handleOcrResult = (resultArray) => {
    setData((prevData) => mergeInitialData(prevData, resultArray));
  };

  const handleCapture = async (imgSrc) => {
    setLoading(true);
    const blob = base64ToBlob(imgSrc);
    const formData = new FormData();
    formData.append("image", blob, "receipt.jpg");
    try {
      const result = await API("/parse-ingredients", "post", formData);
      if (result?.data?.data?.result) {
        handleOcrResult(result.data.data.result);
      }
      alert(
        "영수증 사진이 촬영·전송되었습니다!\n서버 응답: " +
          JSON.stringify(result)
      );
    } catch (error) {
      alert("OCR 서버 전송 실패: " + error.message);
    }
    setLoading(false);
    setShowCameraModal(false);
  };

  const handleFileUpload = async (file) => {
    if (!file) {
      alert("파일이 선택되지 않았습니다.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const result = await API("/parse-ingredients", "post", formData);
      if (result?.data?.data?.result) {
        handleOcrResult(result.data.data.result);
      }
      alert("파일이 업로드되었습니다!\n서버 응답: " + JSON.stringify(result));
    } catch (error) {
      alert("OCR 서버 전송 실패: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="fridge-bg">
      {loading && <Spinner />}
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
                {getSortedItems(group.items).map(([name, , , , image], idx) => (
                  <div
                    className="fridge-item"
                    key={name + idx}
                    style={{
                      background: "#fff",
                      borderRadius: 16,
                      boxShadow: "0 2px 8px #eee",
                      padding: 12,
                      margin: 8,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      minWidth: 90,
                    }}
                  >
                    {image ? (
                      <img
                        src={image}
                        alt={name}
                        style={{
                          width: 60,
                          height: 60,
                          objectFit: "cover",
                          borderRadius: "50%",
                          marginBottom: 8,
                          border: "2px solid #e0e0e0",
                          background: "#fafafa",
                        }}
                      />
                    ) : (
                      <GrayCircle />
                    )}
                    <div
                      className="fridge-name"
                      style={{ fontWeight: 500, fontSize: 16, color: "#333" }}
                    >
                      {name}
                    </div>
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
            onFileUpload={handleFileUpload}
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
