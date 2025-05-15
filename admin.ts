import express from 'express'
import admin from 'firebase-admin'
import { initializeApp, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

const serviceAccount = require('./serviceAccountKey.json')

initializeApp({
  credential: cert(serviceAccount)
})

const db = getFirestore()
const auth = getAuth()

const app = express()
app.use(express.json())

// Função utilitária para deletar usuário do Firestore e Auth pelo UID
async function deleteUserByUid(uid: string) {
  // Buscar documento do usuário pelo campo uid
  const usersRef = db.collection('users');
  const snapshot = await usersRef.where('uid', '==', uid).get();

  // Deletar todos os documentos encontrados (caso haja mais de um)
  const batch = db.batch();
  snapshot.forEach(doc => {
    batch.delete(doc.ref);
  });
  await batch.commit();

  // Deletar do Auth
  await auth.deleteUser(uid);
}

// Endpoint para deletar usuário pelo UID
app.delete('/delete-user/:uid', async (req, res) => {
  const { uid } = req.params;
  try {
    await deleteUserByUid(uid);
    res.status(200).send({ message: 'Usuário excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    res.status(500).send({ error: 'Erro ao excluir usuário.' });
  }
});

app.listen(3000, () => {
  console.log('Admin API rodando em http://localhost:3000')
})
