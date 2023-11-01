const admin = require('firebase-admin');
var serviceAccount = require("./creds.json");
const { getFirestore } = require('firebase-admin/firestore');

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = getFirestore();

module.exports.doctores = db.collection('doctores')
module.exports.admin = admin
