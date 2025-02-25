require("dotenv").config();
const admin = require("firebase-admin");
const { GoogleAuth } = require("google-auth-library");

async function getFirebaseAdminApp(databaseURL, clientId, clientSecret, refreshToken) {
  const auth = new GoogleAuth({
    credentials: {
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
    },
    scopes: ["https://www.googleapis.com/auth/firebase.database"],
  });

  const client = await auth.getClient();
  const accessToken = await client.getAccessToken();

  return admin.initializeApp({
    credential: admin.credential.accessToken(accessToken),
    databaseURL: databaseURL,
  });
}

async function initializeApps() {
  // Pagos
  const app1 = await getFirebaseAdminApp(
    "https://crud-jgarrix99-default-rtdb.firebaseio.com/",
    process.env.CLIENT_ID_1,
    process.env.CLIENT_SECRET_1,
    process.env.FIREBASE_REFRESH_TOKEN_1
  );

  // Clientes y empleados
  const app2 = await getFirebaseAdminApp(
    "https://backend-mvc-5dc03-default-rtdb.firebaseio.com/",
    process.env.CLIENT_ID_2,
    process.env.CLIENT_SECRET_2,
    process.env.FIREBASE_REFRESH_TOKEN_2
  );

  return { app1, app2 };
}

module.exports = initializeApps;

