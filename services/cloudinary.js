"use strict";

const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: 'dazgh9p2p', 
    api_key: '314367954923976', 
    api_secret: '_D7AIvYyQ_jg-7GnZih86GQOF4k' 
});

const cloudinaryService = {};

cloudinaryService.uploadCloudinaryImageUrl = async (folder, image) => {
    let result = [];
    try {
      result = await cloudinary.uploader.upload(image, { upload_preset: folder });
    } catch (e) {
      console.log("Error", e);
    }
    return result;
};

cloudinaryService.createFolder = async (folder) => {
    let result = [];
    try {

      result = await cloudinary.api.create_upload_preset({
        name: folder,
        folder: folder,
        allowed_formats: 'jpg, png',

      });

      console.log("Folder: ",result);
    } catch (e) {
      console.log("Error", e);
    }
    return result;
};

module.exports = cloudinaryService;
