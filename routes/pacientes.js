const express = require("express");
const router = express.Router();
const cloudinaryService = require("../services/cloudinary");

const db = require("../data-config.js");

router.get("/", async (req, res) => {
  const snapshot = await db.pacientes.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.send({ msg: "success", return: list });
});

router.get("/getByEmail/:email", async (req, res) => {
  const snapshot = await db.pacientes.get();
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })).filter((doc) => doc.email == req.params.email);
  res.send({ msg: "success", return: list });
});

router.post("/", async (req, res) => {
  const data = req.body;
  let folderName = "preset_pacientes";
  let uploadPic = await cloudinaryService.uploadCloudinaryImageUrl(folderName, req.body.picture);
  try {
    let userWithSameEmail = await db.admin
      .auth()
      .getUserByEmail(req.body.email);
      console.log({ msg: "error", info: "Email ya usado"}, userWithSameEmail)

    res.status(400).send({ msg: "error", info: "Email ya usado" });
  } catch (error) {
    if (error.code == "auth/user-not-found") {
      let retMsg2 = await db.admin.auth().createUser({
        email: req.body.email,
        password: req.body.password,
        emailVerified: true,
        disabled: false,
        displayName: "paciente",
      });

      delete req.body.password;

      data.picture = uploadPic.secure_url;

      let retMsg = await db.pacientes.add(data);

      res.send({ msg: "success", return: retMsg, return2: retMsg2 });
    } else {
      console.error(error);
    }
  }
});

router
  .route("/:id")
  .get(async (req, res) => {
    const id = req.params.id;
    const snapshot = await db.pacientes.get();
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
    let retMsg = await db.pacientes.doc(id).update(req.body);
    res.send({ msg: "success", return: retMsg });
  })
  .delete(async (req, res) => {
    const id = req.params.id;
    let retMsg = await db.pacientes.doc(id).delete();
    res.send({ msg: "success", return: retMsg });
  });

module.exports = router;
