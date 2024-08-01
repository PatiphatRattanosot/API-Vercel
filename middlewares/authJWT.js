const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../modlels");

const User = db.User;
//vertify token
vertifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  //1st vertify
  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    //decoded มี id เพราะในไฟล์ auth.controller ส่วน signin เราใส่ object ที่มี attribute id ใน jwt.sign
    next();
  });
};

// check admin
//SELECT roles.roleName FROM roles,users,user_roles WHERE users.id = user_roles.userId AND roles.id = user_roles.roleId AND users.id = "id";
isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Admin Role!",
      });
      return;
    });
  });
};

//Check Mod
IsMod = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Moderator Role!",
      });
    });
  });
};

//admin or mod
IsModOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator" || roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Moderator Role!",
      });
    });
  });
};

const authJwt = {
  vertifyToken,
  isAdmin,
  IsMod,
  IsModOrAdmin,
};

module.exports = authJwt;
