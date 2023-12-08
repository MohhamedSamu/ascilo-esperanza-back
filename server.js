const express = require("express");
const app = express();

app.use( express.json({limit: '50mb'}) );
app.use(express.urlencoded({extended:true}))

const authRouter = require("./routes/auth.js")
app.use("/", authRouter)

const doctoresRouter = require("./routes/doctores.js")
app.use("/doctores", doctoresRouter)

const pacientesRouter = require("./routes/pacientes.js")
app.use("/pacientes", pacientesRouter)

const citasRouter = require("./routes/cita.js")
app.use("/citas", citasRouter)

const cloudinaryRouter = require("./routes/cloudinary.js")
app.use("/cloudinary", cloudinaryRouter)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App is listening on PORT: ${PORT}`)
})