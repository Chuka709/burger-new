import axios from "axios";

const instance = axios.create({
  baseURL:
    "https://burger-2097c-default-rtdb.asia-southeast1.firebasedatabase.app/",
});

export default instance;
