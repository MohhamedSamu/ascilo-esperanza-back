const express = require("express");
const app = express();

app.use(express.json())

app.use(express.urlencoded({extended:true}))

const authRouter = require("./routes/auth.js")
app.use("/", authRouter)

const doctoresRouter = require("./routes/doctores.js")
app.use("/doctores", doctoresRouter)

const pacientesRouter = require("./routes/pacientes.js")
app.use("/pacientes", pacientesRouter)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App is listening on PORT: ${PORT}`)
})