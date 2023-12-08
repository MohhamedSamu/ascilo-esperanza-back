const express = require("express");
const router = express.Router();

const db = require("../data-config.js");

router.get("/getByDoctorEmail/:email", async (req, res) => {
  console.log("req.body.email", req.body.email)
  const snapshot = await db.citas.get();
  const list = snapshot.docs.map((cita) => ({ id: cita.id, ...cita.data() })).filter((cita) => cita.doctor.email == req.params.email);
  res.send({ msg: "success", return: list });
});

router.get("/getByPacienteEmail/:email", async (req, res) => {
  console.log("req.body.email", req.body.email)
  const snapshot = await db.citas.get();
  const list = snapshot.docs.map((cita) => ({ id: cita.id, ...cita.data() })).filter((cita) => cita.paciente.email == req.params.email);
  res.send({ msg: "success", return: list });
});

router.post("/newDoctorCita", async (req, res) => {
  const data = req.body;
  data.estado = "confirmada";

  let retMsg = await db.citas.add(data);

  console.log("nueva cita: ", retMsg);

  res.send({ msg: "success", return: retMsg });
});

router.post("/newPacienteCita", async (req, res) => {
  const data = req.body;
  data.estado = "pendiente";

  let retMsg = await db.citas.add(data);

  console.log("nueva cita: ", retMsg);

  res.send({ msg: "success", return: retMsg });
});

router
  .route("/:id")
  .get(async (req, res) => {
    const id = req.params.id;
    const snapshot = await db.citas.get();
    const retMsg = snapshot.docs
      .map((cita) => ({ id: cita.id, ...cita.data() }))
      .filter((cita) => cita.id == id);
    res.send({ msg: "success", return: retMsg });
  })
  .put(async (req, res) => {
    const id = req.params.id;
    delete req.body.id;
    delete req.body.password;
    delete req.body.email;
    let retMsg = await db.citas.cita(id).update(req.body);
    res.send({ msg: "success", return: retMsg });
  })
  .delete(async (req, res) => {
    const id = req.params.id;
    let retMsg = await db.citas.cita(id).delete();
    res.send({ msg: "success", return: retMsg });
  });

module.exports = router;
