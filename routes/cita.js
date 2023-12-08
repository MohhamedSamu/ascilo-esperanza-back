const express = require("express");
const router = express.Router();

const db = require("../data-config.js");

router.get("/getByDoctorEmail/:email", async (req, res) => {
  console.log("req.params.email", req.params.email)
  const snapshot = await db.citas.get();
  const list = snapshot.docs.map((cita) => ({ id: cita.id, ...cita.data() })).filter((cita) => cita.doctor.email == req.params.email);
  res.send({ msg: "success", return: list });
});

router.get("/getByPacienteEmail/:email", async (req, res) => {
  console.log("req.params.email", req.params.email)

  const snapshot = await db.citas.get();
  const list = snapshot.docs.map((cita) => ({ id: cita.id, ...cita.data() })).filter((cita) => cita.paciente.email == req.params.email);
  res.send({ msg: "success", return: list });
});

router.post("/newDoctorCita", async (req, res) => {
  delete req.body.id;
  const data = req.body;
  data.estado = "confirmada";

  let retMsg = await db.citas.add(data);

  console.log("nueva cita: ", retMsg);

  res.send({ msg: "success", return: retMsg });
});

router.post("/newPacienteCita", async (req, res) => {
  delete req.body.id;
  const data = req.body;
  data.estado = "pendiente";
  let retMsg = await db.citas.add(data);

  console.log("nueva cita: ", retMsg);

  res.send({ msg: "success", return: retMsg });
});

router.post("/confirmCita/:id", async (req, res) => {
  delete req.body.id;
  const data = {
    estado : "confirmada"
  };
  let retMsg = await db.citas.cita(id).update(data);
  res.send({ msg: "success", return: retMsg });
});

router.post("/rechazarCita/:id", async (req, res) => {
  delete req.body.id;
  const data = {
    estado : "rechazada"
  };
  let retMsg = await db.citas.cita(id).update(data);
  res.send({ msg: "success", return: retMsg });
});

router.post("/completarCita/:id", async (req, res) => {
  delete req.body.id;
  const data = {
    estado : "completar"
  };
  let retMsg = await db.citas.cita(id).update(data);
  res.send({ msg: "success", return: retMsg });
});

router
  .route("/:id")
  .put(async (req, res) => {
    const id = req.params.id;
    delete req.body.id;
    let retMsg = await db.citas.cita(id).update(req.body);
    res.send({ msg: "success", return: retMsg });
  })

module.exports = router;
