import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:7000/api",
  // baseURL: "https://evangadiforumbackend.cyclic.app/api/users",
});

export default instance;