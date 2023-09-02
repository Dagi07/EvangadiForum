const pool = require("../../config/database");
const {
  register,
  profile,
  userById,
  getUserByEmail,
  getAllUsers,
  ask,
  getQuestionById,
  oneQ,
  answer,
  grabAns,
} = require("./user.service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  createUser: (req, res) => {
    const { userName, firstName, lastName, email, password } = req.body;

    if (!userName || !firstName || !lastName || !email || !password) {
      return res.status(400).json({ msg: "Not all field have been provided" });
    }
    if (password.length < 8)
      return res
        .status(400)
        .json({ msg: "Password must be at least 8 characters!" });

    pool.query(
      `SELECT * FROM registration WHERE user_email = ?`,
      [email],
      (err, results) => {
        if (err)
          return res.status(err).json({ msg: "1st database connection error" });
        if (results.length > 0) {
          return res
            .status(400)
            .json({ msg: "An account with this email already exists!" });
        } else {
          const salt = bcrypt.genSaltSync();
          req.body.password = bcrypt.hashSync(password, salt);

          register(req.body, (err, results) => {
            if (err) {
              console.log(err);
              return res
                .status(500)
                .json({ msg: "2nd database connection error" });
            }
            pool.query(
              "SELECT * FROM registration WHERE user_email = ?",
              [email],
              (err, results) => {
                if (err) {
                  return res
                    .status(err)
                    .json({ msg: "3rd database connection error" });
                }
                console.log("before", req.body);
                req.body.userId = results[0].user_id;
                console.log(results);
                console.log(req.body);
                profile(req.body, (err, results) => {
                  if (err) {
                    console.log(err);
                    return res
                      .status(500)
                      .json({ msg: "4th database connection error" });
                  }
                  return res.status(200).json({
                    msg: "New user added successfully",
                    data: results,
                  });
                });
              }
            );
          });
        }
      }
    );
  },
  // to count all users
  getUsers: (req, res) => {
    getAllUsers((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection err" });
      }
      return res.status(200).json({ data: results });
    });
  },
  getUserById: (req, res) => {
    userById(req.id, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection err" });
      }
      if (!result) {
        return res.status(404).json({ msg: "Record not found" });
      }
      return res.status(200).json({ data: result });
    });
  },
  login: (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been provided" });
    getUserByEmail(email, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection err" });
      }
      if (!result)
        return res
          .status(404)
          .json({ msg: "No account with this email has been registered" });
      const compare = bcrypt.compareSync(password, result.user_password);
      if (!compare) {
        return res.status(404).json({ msg: "Invalid Credentials" });
      }
      const token = (sign = jwt.sign(
        { id: result.user_id },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      ));
      return res.json({
        token,
        user: {
          id: result.user_id,
          display_name: result.user_name,
        },
      });
    });
  },
  askquestion: (req, res) => {
    // console.log(req.body);

    const { userId, title, qdesc } = req.body;
    if (!title) return res.status(400).json({ msg: "Title field is required" });
    ask(req.body, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection err" });
      }
      return res.status(200).json({
        msg: "Question added successfully",
        data: result,
      });
    });
  },
  questionById: (req, res) => {
    // const { userId } = req.body;
    // console.log(req.body);
    getQuestionById((err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection err" });
      }
      if (!result) {
        return res.status(404).json({ msg: "Record not found" });
      }
      return res.status(200).json({ data: result });
    });
  },
  singleQuestion: (req, res) => {
    const { ky } = req.body;
    console.log(req.body);
    oneQ(req.body, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection err" });
      }
      return res.status(200).json({
        msg: "Question fetched successfully",
        data: result,
      });
    });
  },
  postAnswer: (req, res) => {
    const { userId, ky, ans } = req.body;
    if (!ans) return res.status(400).json({ msg: "Provide answer!" });
    answer(req.body, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection err" });
      }
      return res.status(200).json({
        msg: "Answer added successfully",
        data: result,
      });
    });
  },
  grabAnswers: (req, res) => {
    const { ky } = req.body;
    grabAns(req.body, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection err" });
      }
      return res.status(200).json({
        msg: "Answer fetched successfully",
        data: result,
      });
    });
  },
};
