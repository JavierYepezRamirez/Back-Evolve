const admin = require("firebase-admin");

const serviceAccount1 = require("./serviceAccountKey1.json"); // Para Pagos igual cambiar
const serviceAccount2 = require("./serviceAccountKey2.json"); // Para Clientes y empleados, cambiar

// Pagos
const app1 = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount1),
  databaseURL: "https://crud-jgarrix99-default-rtdb.firebaseio.com/"//link de realtime
}, "app1");

// Clientes y empleados
const app2 = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount2),
  databaseURL: "https://backend-mvc-5dc03-default-rtdb.firebaseio.com/"//link de realtime
}, "app2");

module.exports = { app1, app2 };
