import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUserId = () => {
  const token = jwt.sign(
    { id: data[0].id, roleId: data[0].roleId },
    "secretkey"
  );

  return (userId = data[0].id);
};

export const getUser = (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT * FROM users WHERE id=?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    const { password, ...info } = data[0];
    return res.json(info);
  });
};


export const getUserByUserName = (req, res) => {
  const username = req.params.username;
  const q = "SELECT username, id, name FROM users WHERE `username`  LIKE ?";

  db.query(q, [`%${username}%`], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
};

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q =
      "UPDATE users SET `name`=?,`city`=?,`website`=?,`profilePic`=?,`coverPic`=? WHERE id=? ";
    db.query(
      q,
      [
        req.body.name,
        req.body.city,
        req.body.website,
        req.body.profilePic,
        req.body.coverPic,
        userInfo.id,
      ],
      (err, data) => {
        if (err) res.status(500).json(err);
        if (data.affectedRows > 0) return res.json("Updated!");
        return res.status(403).json("You can update only your post!");
      }
    );
  });
};


export const getLatestActivity = (req, res) => {

  const userID = req.params.userID;
  const q = `SELECT u.name AS userName, u.profilePic, l.status, l.timelog, up.name AS postOwnerName
  FROM log l
  JOIN users u ON u.id = l.userId
  JOIN posts p ON p.id = l.postId
  JOIN users up ON up.id = p.userId
  WHERE l.status IN ('has liked', 'has comment')
  order by l.timelog DESC
  LIMIT 3`;

  db.query(q, [userID], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
};
export const getLatestPost = (req, res) => {

  const userID = req.params.userID;
  const q = `SELECT u.name AS userName, u.profilePic, l.status, l.timeLog
  FROM log l
  JOIN users u ON u.id = l.userId
  WHERE l.status = 'has uploaded'
  order by l.timelog DESC
  LIMIT 3`;

  db.query(q, [userID], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
};

export const getUserByCity = (req, res) => {
  const city = req.params.city;
  const userID = req.params.userID;
  const q = `SELECT u.id, u.name, u.profilePic, u.city
  FROM users u
  WHERE u.city = (SELECT city FROM users WHERE id = ?)
    AND u.id NOT IN (SELECT followedUserId FROM relationships WHERE followerUserId = ?)
    AND u.id <> ?`;

  db.query(q, [userID,userID,userID],  (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
};