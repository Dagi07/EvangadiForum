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

module.exports = router;
