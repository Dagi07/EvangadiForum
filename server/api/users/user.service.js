const pool = require("../../config/database");

module.exports = {
  register: (data, callback) => {
    pool.query(
      "INSERT INTO registration(user_name,user_email,user_password)VALUES(?,?,?)",
      [data.userName, data.email, data.password],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },
  profile: (data, callback) => {
    pool.query(
      "INSERT INTO profile(user_id,first_name,last_name)VALUES(?,?,?)",
      [data.userId, data.firstName, data.lastName],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },
  userById: (id, callback) => {
    pool.query(
      `SELECT registration.user_id,user_name,user_email,first_name,last_name FROM registration LEFT JOIN profile ON registration.user_id = profile.user_id WHERE registration.user_id = ?`,
      [id],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result[0]);
      }
    );
  },
  getUserByEmail: (email, callback) => {
    pool.query(
      `SELECT * FROM registration  WHERE registration.user_email = ?`,
      [email],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result[0]);
      }
    );
  },
  getAllUsers: (callback) => {
    pool.query(
      `SELECT user_id,user_name,user_email FROM registration `,
      [],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },
  ask: (data, callback) => {
    pool.query(
      "INSERT INTO question(user_id,question,question_description)VALUES(?,?,?)",
      [data.userId, data.title, data.qdesc],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },
  getQuestionById: (callback) => {
    pool.query(
      `SELECT question_id,question.user_id,question,question_description,registration.user_name FROM question LEFT JOIN registration ON question.user_id = registration.user_id`,
      // "SELECT question_id, question.user_id, question,question_description r"
      [],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },
  oneQ: (data, callback) => {
    pool.query(
      `SELECT question_id,question,question_description FROM question WHERE question_id = ?`,
      [data.ky],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },
  answer: (data, callback) => {
    pool.query(
      "INSERT INTO answer(user_id,question_id,answer)VALUES(?,?,?)",
      [data.userId, data.ky, data.ans],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },
  grabAns: (data, callback) => {
    pool.query(
      `SELECT answer.question_id,answer,registration.user_name FROM answer LEFT JOIN registration ON answer.user_id = registration.user_id WHERE answer.question_id = ?`,
      [data.ky],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },
  getAllAnswers: (callback) => {
    pool.query(
      `SELECT * FROM answer LEFT JOIN registration ON answer.user_id = registration.user_id`,
      // "SELECT question_id, question.user_id, question,question_description r"
      [],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },
};
// ON answer.user_id = registration.user_id
