import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const addCommentActivity = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO activities(`activity`, `usersId`, `createAt`) VALUES (?)";
    const values = [
      "đã comment bài của bạn",
      userInfo.id,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Activity added.");
    });
  });
};


export const deleteCommentActivity = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const commentId = req.params.id;
    const q = "DELETE FROM activities WHERE `id` = ? AND `userId` = ?";

    db.query(q, [commentId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) return res.json("Comment has been deleted!");
      return res.status(403).json("You can delete only your comment!");
    });
  });
};

export const getLastActivity = (req, res) => {
  const userId = req.query.userId;
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");
  // const q = 'SELECT a.* FROM activities AS a JOIN users AS u ON (p.usersid = p.userId)  LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId= ? OR p.userId =? AND `usersId` =  ORDER BY c.createdAt DESC';

  // db.query(q, [req.query.postId], (err, data) => {
  //   if (err) return res.status(500).json(err);
  //   return res.status(200).json(data);
  // });
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    console.log(userId);

    const q =
      userId !== "undefined"
        ? ``
        : `SELECT a.* FROM activities AS a JOIN users AS u ON (p.usersid = p.userId)  LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId= ? OR p.userId =? AND usersId =?  ORDER BY c.createdAt DESC`;

    const values =
      userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const getLatestActivity = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "SELECT userId, name, profilePic, createdAt from posts, users where posts.userId = users.id and NOT users.id = ? LIMIT 2";
    const values = req.params.userId

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json(data);
    });

   
  });
};
export const getLatestActivity1 = (req, res) => {

  const userID = req.params.userID;
  const q = "SELECT userId, name, profilePic, createdAt from posts, users where posts.userId = users.id and NOT users.id = ? LIMIT 2";

  db.query(q, [userID], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
};