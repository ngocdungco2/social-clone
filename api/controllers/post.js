import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req, res) => {
  const userId = req.query.userId;
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q =
      userId !== "undefined"
        ? `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.createdAt DESC`
        : `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId)
    LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE (r.followerUserId= ? OR p.userId =?) AND p.verified = 1 
    ORDER BY p.createdAt DESC`;

    const values =
      userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const getPostsUnverified = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q = `SELECT p.*, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId)
    WHERE p.verified = 0
    ORDER BY p.createdAt DESC`;

    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO posts(`desc`, `img`, `createdAt`, `userId`,`verified`) VALUES (?)";
    const values = [
      req.body.desc,
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
      0,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been created.");
    });
  });
};

export const verifyPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "UPDATE posts SET verified = 1 WHERE id = (?);";
    const values = [req.body.postId];
    db.query(q, values, (err, data) => {
      console.log(err);
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been created.");
    });

    
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  const decodedToken = jwt.verify(token, "secretkey");
  const authenticatedUserId = decodedToken.id;
  const roleId = decodedToken.roleId;
  const postId = req.params.id;
  const sql = "SELECT * FROM posts WHERE id = ?";
  db.query(sql, [postId], (error, results) => {
    if (error) throw error;
    if (results.length === 1) {
      const post = results[0];
      if (roleId === 1 || post.userId === authenticatedUserId) {
        const deleteSql = "DELETE FROM posts WHERE id = ?";
        db.query(deleteSql, [postId], (deleteError, data) => {
          if (deleteError) return res.status(500).json(deleteError);
          if (data.affectedRows > 0)
            return res.status(200).json("Post has been deleted.");
        });
      } else {
        return res.status(403).json("You can delete only your post");
      }
    }
  });
  // jwt.verify(token, "secretkey", (err, userInfo) => {
  //   if (err) return res.status(403).json("Token is not valid!");
  //   const q =
  //     "DELETE FROM posts WHERE `id`=?";

  //   db.query(q, [req.params.id, userInfo.id], (err, data) => {
  //     if (err) return res.status(500).json(err);
  //     if(data.affectedRows>0) return res.status(200).json("Post has been deleted.");
  //     return res.status(403).json("You can delete only your post")
  //   });
  // });
};


export const addLogPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
//     INSERT INTO log (userId, timeLog, status, postID)
// VALUES (:userId, :timeLog, :status, 
    
    const q2 ="INSERT INTO log (userId, timeLog, status, postID)  VALUES(?) ";
    const values2 = [
      userInfo.id,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      "Has Uploaded",
      req.param.id
    ];

    db.query(q2, [values2], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Log has been created.");
    });
    
  });
};
export const removeLog = (req, res) => {
  const token = req.cookies.accessToken;
  const postId = req.params.id;

  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q2 =
      "DELETE FROM log where postID = (?) ";

    db.query(q2, [postId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Log has been created.");
    });
    
  });
};
