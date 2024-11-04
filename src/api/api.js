// 서버와 통신하기 위한 axios모듈 세팅부
import axios from 'axios';

const api = axios.create({
    // Server URL
    baseURL: 'https://si6vsdb5qc.execute-api.ap-northeast-2.amazonaws.com/prod/',
    headers: {
        "Content-Type": "application/json",
      },
})
export default api;
