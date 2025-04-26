const admin = require("firebase-admin");
const serviceAccount = require("./config/firebase-adminsdk.json"); // Download from Firebase console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "note-management-system-2b316.firebasestorage.app", // Your bucket name
});

const bucket = admin.storage().bucket();

module.exports = { admin, bucket };
