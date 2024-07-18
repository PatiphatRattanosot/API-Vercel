const config = require("../config/auth.config");
const db = require("../modlels");
const User = db.User;
const Role = db.Role;
const jwt = require("jsonwebtoken");
//  bcrypt ใช้สำหรับการเข้ารหัส
const bcrypt = require("bcryptjs");
// {Op} {}สลายโครงสร้าง ให้เหลือ op
const { Op } = require("sequelize");

//Register
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  //Validate
  if (!username || !email || !password) {
    res.status(400).send({ message: "Pls provide all fields" });
    return;
  }
  //Prepare user data
  const newUser = {
    username,
    email,
    password: bcrypt.hashSync(password, 9),
  };
  //Save user in the DB
  await User.create(newUser)
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        //set defautl rple to "user" id=1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user.",
      });
    });
};
//Signin
exports.signIn = async (req, res) => {
  const { username, email, password } = req.body;
  //chaeck user
  if (!username || !password) {
    return res.status(400).send({ message: "Pls provide all fields" });
  }
  // SQL Select * from User where username ="username" :
  await User.findOne({
    where: {
      username: username,
    },
  }).then((user) => {
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }
    const token = jwt.sign({ id: user.username }, config.secret, {
      expiresIn: "1 days", // : 86400 = 24 hours
    })
    //add role
    const authorities = [];
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        authorities.push("ROLE_" + roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user.username,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token,
      });
    });

  }).catch(err => {
    res.status(500).send({ message: err.message });
  })
};
