import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { deleteUser as deleteAuthUser } from 'firebase/auth';
import { db, auth } from '../firebase';

export interface FirebaseUser {
  id: string;
  nome: string;
  sobrenome: string;
  email: string;
  uid: string;
}

export function useFirebaseUsers() {
  const [users, setUsers] = useState<FirebaseUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'users'));
    
    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        const usersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as FirebaseUser[];
        setUsers(usersData);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching users:', err);
        setError('Failed to fetch users');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const deleteUser = async (id: string) => {
    try {
      // Primeiro, encontramos o usuário no Firestore
      const userDoc = await doc(db, 'users', id);
      const userSnapshot = await userDoc.get();
      
      if (!userSnapshot.exists) {
        throw new Error('Usuário não encontrado');
      }

      const userData = userSnapshot.data();
      const uid = userData?.uid;

      if (!uid) {
        throw new Error('UID do usuário não encontrado');
      }

      // Deletamos o documento do Firestore
      await deleteDoc(doc(db, 'users', id));

      // Deletamos o usuário da autenticação
      const currentUser = auth.currentUser;
      if (currentUser && currentUser.uid === uid) {
        await deleteAuthUser(currentUser);
      }

      return true;
    } catch (err) {
      console.error('Error deleting user:', err);
      if (err instanceof Error) {
        throw new Error(`Erro ao excluir usuário: ${err.message}`);
      } else {
        throw new Error('Erro ao excluir usuário');
      }
    }
  };

  return { users, loading, error, deleteUser };
}