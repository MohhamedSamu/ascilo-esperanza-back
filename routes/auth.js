const express = require("express");
const router = express.Router();

const db = require('../data-config.js')

router.post("/signup", async (req, res) => {
  let retMsg = await db.admin.auth().createUser({
    email: req.body.email,
    password: req.body.password,
    emailVerified: false,
    disabled: false,
  })
  res.json(retMsg);
});

router.post("/signin", async (req, res) => {
  try {
    let retMsg = await db.admin.auth().getUserByEmail(req.body.email)
    res.json(retMsg);
  }catch (error) {
    res.status(400).send({ msg: "error", info: "Email no existe" });
  }
});

router.post("/resetPassword", async (req, res) => {
  let retMsg = await db.admin.auth().generatePasswordResetLink(req.body.email)
  res.json(retMsg);
});

module.exports = router;
