import axios from "axios";

async function API(endpoint, method, body = null, withCredentials = true) {
  const API_URL = "https://6c89-1-216-24-222.ngrok-free.app/api/v1";
  let headers = {};

  // if (body instanceof FormData) {
  //   headers["Content-Type"] = "multipart/form-data";
  // } else {
  //   headers["Content-Type"] = "application/json";
  // }

  const url = `${API_URL}${endpoint}`;

  try {
    const response = await axios({
      method,
      url,
      data: body,
      headers,
      withCredentials,
      timeout: 600000,
    });
    console.log("API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("API request error:", error.response || error.message);
    throw error;
  }
}

export default API;