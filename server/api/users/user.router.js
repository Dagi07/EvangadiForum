const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  createUser,
  getUsers,
  getUserById,
  login,
  askquestion,
  questionById,
  singleQuestion,
  postAnswer,
  grabAnswers,
  forgetPassword,
  confimCode,
  changePassword,
} = require("./user.controller");

router.post("/register", createUser);
router.get("/allusers", getUsers);
router.get("/", auth, getUserById);
router.post("/", login);
router.post("/ask", askquestion);
router.get("/ask", questionById);
router.post("/q-a-detail", singleQuestion);
router.post("/answer", postAnswer);
router.post("/grab_answers", grabAnswers);
router.post("/forgetpassword", forgetPassword);
router.post("/confimCode", confimCode);
router.post("/changePassword", changePassword);

module.exports = router;
