const express = require("express");
const app = express();

app.use(express.json())

app.use(express.urlencoded({extended:true}))

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`App is listening on PORT: ${PORT}`)
})