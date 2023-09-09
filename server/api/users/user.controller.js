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
const nodemailer = require("nodemailer");

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

  forgetPassword: (req, res) => {
    const { email } = req.body;
    console.log(email);
    // check the email is alredy taken

    pool.query(
      "SELECT * FROM registration WHERE user_email = ?",
      [email],
      (err, results) => {
        if (err) {
          return res
            .status(err)
            .json({ msg: "database connection err during email checking" });
        }
        if (results.length == 0) {
          return res.status(400).json({ msg: "no account with this email" });
        }

        //  sending code
        let v_code = generateRandomSixDigitNumber();
        sendEmail(email, v_code);
        verify_data = {
          email,
          v_code,
        };
        //save to database
        const query = `UPDATE registration SET otp = ? WHERE user_email = ?`;

        pool.query(query, [v_code, email], (error) => {
          if (error) {
            console.log("error", error);
            return res.send(error);
          }
        });
        res.send({ state: "success", msg: `code sent to your email` });
        console.log(verify_data);
      }
    );
  },

  confimCode: (req, res) => {
    const query = `select otp from  registration where user_email=?`;
    const { v_code, email } = req.body;
    console.log("body", req.body);
    pool.query(query, [email], (error, result) => {
      if (error) {
        console.log("error", error);
        return res.send(error);
      }
      var data = result[0].otp;
      console.log("data", data);
      if (data && v_code == data) {
        res.send({ state: "success", msg: `confimed` });
      } else {
        res.status(400).json({ msg: "incorrect v_code" });
      }
    });
  },

  //   changePassword: (req, res) => {
  //     const { new_password, c_password, email } = req.body;

  //     if (new_password != c_password) {
  //       res
  //         .status(400)
  //         .json({ msg: "password and c_password has to be the same" });
  //     }

  //     //password encryption
  //     const salt = bcrypt.genSaltSync();
  //     req.body.new_password = bcrypt.hashSync(new_password, salt);
  // console.log(req.body);
  //     userService.changepass(req.body, (err, results) => {
  //       if (err) {
  //         console.log(err);
  //         // return res.status(500).json({ msg: "database connection err" });
  //       }
  //       return res.status(200).json({
  //         msg: "password changed successfully",
  //         data: results,
  //       });
  //       // console.log(results)
  //     });
  //   },
  changePassword: (req, res) => {
    const { new_password, c_password, email } = req.body;
    console.log(req.body);

    if (new_password !== c_password) {
      return res
        .status(400)
        .json({ msg: "Password and confirm password must match" });
    }

    // Password encryption
    const salt = bcrypt.genSaltSync();
    req.body.new_password = bcrypt.hashSync(new_password, salt);

    userService.changepass(req.body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "Database connection error" });
      }
      return res.status(200).json({
        msg: "Password changed successfully",
        data: results,
      });
    });
  },
};
const validatePassword = (password) => {
  const errors = [];

  // Validate password length
  if (!/.{8,}/.test(password)) {
    errors.push("Password must be at least 8 characters long.");
  }

  // Validate uppercase letter
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter.");
  }

  // Validate lowercase letter
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter.");
  }

  // Validate digit
  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one digit.");
  }

  // Validate special character
  if (!/[$@$!%*?&]/.test(password)) {
    errors.push("Password must contain at least one special character.");
  }

  if (errors.length > 0) {
    return {
      valid: false,
      errors: errors,
    };
  }

  return {
    valid: true,
  };
};

const generateRandomTwoDigitNumber = () => {
  return Math.floor(Math.random() * 90 + 10);
};

const generateRandomSixDigitNumber = () => {
  return Math.floor(Math.random() * 900000 + 100000);
};

// export default userController;

// Function to send email
const sendEmail = async (user_email, v_code) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: user_email,
      subject: "text",
      text: `your evangadi verification code is ${v_code}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
