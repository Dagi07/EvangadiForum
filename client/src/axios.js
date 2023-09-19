import axios from "axios";

const instance = axios.create({
<<<<<<< HEAD
  baseURL: "http://localhost:7000/api",
  // baseURL: "https://evangadiforumbackend.cyclic.app/api/users",
=======
  // baseURL: "http://localhost:7000/api",
  baseURL: "https://evangadiforumbackend.cyclic.app/api",
>>>>>>> 71fe37e44c11348eb4774ccfa212fc569209adcc
});

export default instance;
