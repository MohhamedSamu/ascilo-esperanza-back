const admin = require('firebase-admin');
var serviceAccount = require("./creds.json");
const { getFirestore } = require('firebase-admin/firestore');

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = getFirestore();

module.exports.doctores = db.collection('doctores')
module.exports.pacientes = db.collection('pacientes')
module.exports.citas = db.collection('citas')
module.exports.admin = admin
