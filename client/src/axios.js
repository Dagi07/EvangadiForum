import axios from "axios";

const instance = axios.create({
<<<<<<< HEAD
  baseURL: "http://localhost:7000/api",
  // baseURL: "https://evangadiforumbackend.cyclic.app/api/users",
=======
  // baseURL: "http://localhost:7000/api",
  baseURL: "https://evangadiforumbackend.cyclic.app/api/users",
>>>>>>> parent of f44fab9 (Finals touches)
});

export default instance;
