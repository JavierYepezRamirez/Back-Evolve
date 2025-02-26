const admin = require("firebase-admin");
require("dotenv").config(); 

const serviceAccount1 = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID_PAGOS,
  private_key: process.env.FIREBASE_PRIVATE_KEY_PAGOS.replace(/\\n/g, "\n"),
  client_email: process.env.FIREBASE_CLIENT_EMAIL_PAGOS
};

const serviceAccount2 = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID_CLIENTES,
  private_key: process.env.FIREBASE_PRIVATE_KEY_CLIENTES.replace(/\\n/g, "\n"),
  client_email: process.env.FIREBASE_CLIENT_EMAIL_CLIENTES
};

// Pagos
const app1 = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount1),
  databaseURL: "https://pagos-4c4bb-default-rtdb.firebaseio.com/"
}, "app1");

// Clientes y empleados
const app2 = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount2),
  databaseURL: "https://usuarios-1c993-default-rtdb.firebaseio.com/"
}, "app2");

module.exports = { app1, app2 };


