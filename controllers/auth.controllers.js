const config = require("../config/auth.config");
const db = require("../modlels");
const User = db.User;
const Role = db.Role;
const jwt = require("jsonwebtoken");
//  bcrypt ใช้สำหรับการเข้ารหัส
const bcrypt = require("bcryptjs");
// {Op} {}สลายโครงสร้าง ให้เหลือ op
const {Op} = require("sequelize");


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
        password: bcrypt.hashSync(password,9),
    };
    //Save user in the DB
    await User.create(newUser).then((user) => {
        if (req.body.roles) {
            Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles
                    }
                }
            }).then(roles => {
                user.setRoles(roles).then(() => {
                    res.send({ message: "User was registered successfully!" });
                })
            })

    }else{
        //set defautl rple to "user" id=1
        user.setRoles([1]).then(()=>{
            res.send({ message: "User was registered successfully!" });
        })
    }
    }).catch(err => {
        res
          .status(500)
          .send({
            message:
              err.message ||
              "Some error occurred while creating the user.",
          });
    });
}
