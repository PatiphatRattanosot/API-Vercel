const User = require("../modlels/user.model");
const Role = require("../modlels/role.model");
const { Op } = require("sequelize");

checkDuplicateUsernameOrEmail = async (req, 
    res, next) => {
  console.log(req.body);
  const { username, email } = req.body;
  //cheack username
  await User.findOne({
    where: { username: username },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!",
      });
      return;
    }
    //cheack email
    User.findOne({
      where: { email: email },
    }).then((user) => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!",
        });
        return;
      }
      next();
    });
  });
};
//Cheack roles are valid
checkRolesExisted = async (req, res, next) => {
  if (req.body.roles) {
    // เอา req.body.roles ไปเปรียบเทียบกับ rolesใน DB
    Role.findAll({
      where: {
        name: {
          [Op.or]: req.body.roles,
        },
      },
    }).then((roles) => {
      if (roles.length != req.body.roles.length) {
        res.status(400).send({
          message: "Failed! Role does not exist!",
        });
        return;
      }
      next();
    });
  } else {
    next();
  }
};

const verifySignUp = {
  checkRolesExisted,
  checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;
