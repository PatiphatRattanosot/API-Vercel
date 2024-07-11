const Restaurent = require("../modlels/restaurent.model");
//Create and save a new restaurent
exports.create = async (req, res) => {
  const { title, type, img } = req.body;

  //Validate
  if (!req.body.title || !req.body.img || !req.body.type) {
    res.status(400).send({ message: "Name, Type or Image can not be empty" });
    return;
  }
  await Restaurent.findOne({ where: { title: req.body.title } }).then(
    (restaurent) => {
      if (restaurent) {
        res.status(400).send({ message: "Restaurent already exists! " });
        return;
      }
      //Create a restaurent
      const newRestaurent = {
        title: title,
        type: type,
        img: img,
      };
      Restaurent.create(newRestaurent)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Some error occurred while creating the Restaurent.",
          });
        });
    }
  );
};

// Get all restaurent
exports.getAll = async (req, res) => {
  await Restaurent.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Restaurent.",
      });
    });
};

//Get by ID
exports.getById = async (req, res) => {
  const id = req.params.id;
  console.log(req.params.id);
  await Restaurent.findByPk(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Not found Restaurent with id " + id });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Restaurent with id=" + id,
      });
    });
};

//update Restaurent
exports.update = async (req, res) => {
  const id = req.params.id;
  await Restaurent.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Restaurent was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Restaurent with id=${id}. Maybe Restaurent was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Restaurent with id=" + id,
      });
    });
};

//delete Restaurent
exports.delete = async (req, res) => {
  const id = req.params.id;
  await Restaurent.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Restaurent was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Restaurent with id=${id}. Maybe Restaurent was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Restaurent with id=" + id,
      });
    });
};
