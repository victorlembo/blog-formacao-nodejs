const express = require("express");
const router = express.Router();
const Admin = require("./User");
const bcrypt = require("bcryptjs");

router.get("/admin/users", (req, res) => {
  Admin.findAll().then((users) => {
    res.render("admin/users/index", {
      users: users,
    });
  });
});

router.get("/admin/users/create", (req, res) => {
  res.render("admin/users/create");
});

router.post("/users/create", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  Admin.findOne({
    where: {
      email: email,
    },
  }).then((user) => {
    if (user == undefined) {
      Admin.create({
        email: email,
        password: hash,
      })
        .then(() => {
          res.redirect("/");
        })
        .catch((err) => {
          res.redirect("/");
        });
    } else {
      res.redirect("/admin/users/create");
    }
  });

  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);
});

router.get("/login", (req, res) => {
  res.render("admin/users/login");
});

router.post("/authenticate", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  Admin.findOne({
    where: {
      email: email,
    },
  }).then((user) => {
    if (user != undefined) {
      //Validar senha
      var validate = bcrypt.compareSync(password, user.password);

      if (validate) {
        req.session.user = {
          id: user.id,
          email: user.email,
        };
        res.redirect("/admin/articles");
      } else {
        res.redirect("/login");
      }
    } else {
      res.redirect("/login");
    }
  });
});

router.get("/logout", (req, res) => {
  req.session.user = undefined;
  res.redirect("/");
});

module.exports = router;
