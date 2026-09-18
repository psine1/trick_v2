import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      // Usa tus credenciales del archivo .json de Firebase Admin SDK
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const listUsers = await admin.auth().listUsers();
      const users = listUsers.users.map(userRecord => ({
        uid: userRecord.uid,
        email: userRecord.email,
      }));
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching users' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
