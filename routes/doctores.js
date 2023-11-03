const express = require("express");
const router = express.Router();

const db = require("../data-config.js");

router.get("/", async (req, res) => {
  const snapshot = await db.doctores.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.send({ msg: "success", return: list });
});

router.post("/", async (req, res) => {
  const data = req.body;

  try {
    let userWithSameEmail = await db.admin
      .auth()
      .getUserByEmail(req.body.email);

    let retMsg2 = await db.admin.auth().createUser({
      email: req.body.email,
      password: req.body.password,
      emailVerified: true,
      disabled: false,
      displayName: "doctor",
    });

    delete req.body.password;

    let retMsg = await db.doctores.add(data);

    console.log("nueva cuenta: ", retMsg2);

    res.send({ msg: "success", return: retMsg, return2: retMsg2 });
  } catch (error) {
    res.status(400).send({ msg: "error", info: "Email ya usado" });
    console.error(error);
  }
});

router
  .route("/:id")
  .get(async (req, res) => {
    const id = req.params.id;
    const snapshot = await db.doctores.get();
    const retMsg = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((doc) => doc.id == id);
    res.send({ msg: "success", return: retMsg });
  })
  .put(async (req, res) => {
    const id = req.params.id;
    delete req.body.id;
    delete req.body.password;
    delete req.body.email;
    let retMsg = await db.doctores.doc(id).update(req.body);
    res.send({ msg: "success", return: retMsg });
  })
  .delete(async (req, res) => {
    const id = req.params.id;
    let retMsg = await db.doctores.doc(id).delete();
    res.send({ msg: "success", return: retMsg });
  });

module.exports = router;
