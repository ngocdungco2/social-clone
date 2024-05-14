import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getLikes = (req,res)=>{
    const q = "SELECT userId FROM likes WHERE postId = ?";

    db.query(q, [req.query.postId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data.map(like=>like.userId));
    });
}

export const addLike = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "INSERT INTO likes (`userId`,`postId`) VALUES (?)";
    const values = [
      userInfo.id,
      req.body.postId
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been liked.");
    });
  });
};

export const deleteLike = (req, res) => {

  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "DELETE FROM likes WHERE `userId` = ? AND `postId` = ?";

    db.query(q, [userInfo.id, req.query.postId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been disliked.");
    });
  });
};

export const addLogLike = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q2 =
      "INSERT INTO log (userId, timeLog, status, postID)  VALUES(?) ";
    const values2 = [
      userInfo.id,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      "Has Liked",
      req.body.postId,
    ];

    db.query(q2, [values2], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Log has been created.");
    });
    
  });
};

export const removeLog = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q2 =
      "DELETE FROM log where postID = (?) ";
    db.query(q2, [req.query.postId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Log has been created.");
    });
    
  });
};