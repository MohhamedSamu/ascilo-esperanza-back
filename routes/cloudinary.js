const express = require("express");
const router = express.Router();
const cloudinaryService = require("../services/cloudinary");

router.get("/getFolder", async (req, res) => {
    try {
        let folderName = "preset_pacientes";
        let folder_preset = await cloudinaryService.createFolder(folderName);
        res.send({ msg: "success", return: folder_preset });
    } catch (e) {
        console.log("Error creating: " + e);
        res.status(400).send({ msg: "error", info: e });
        return;
    }
});



module.exports = router;
