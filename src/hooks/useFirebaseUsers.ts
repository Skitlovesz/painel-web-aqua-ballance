import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { getAuth, deleteUser } from 'firebase/auth';
import { db, auth } from '../firebase';

export interface FirebaseUser {
  id: string;
  nome: string;
  sobrenome: string;
  email: string;
  uid?: string;
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
      // Get reference to the user document
      const userDocRef = doc(db, 'users', id);
      
      // Get the user data
      const userSnapshot = await getDoc(userDocRef);
      
      if (!userSnapshot.exists()) {
        throw new Error('Usuário não encontrado');
      }

      const userData = userSnapshot.data();
      
      if (!userData.uid) {
        throw new Error('UID do usuário não encontrado');
      }

      try {
        // Primeiro, deletamos os dados do Firestore
        await deleteDoc(userDocRef);
        
        // Depois, tentamos deletar a conta de autenticação
        const authUser = await auth.getUser(userData.uid);
        if (authUser) {
          await auth.deleteUser(userData.uid);
        }
      } catch (authError) {
        console.error('Erro ao deletar conta de autenticação:', authError);
        throw new Error('Não foi possível deletar completamente o usuário. Por favor, contate o suporte.');
      }

      return true;
    } catch (err) {
      console.error('Error deleting user:', err);
      throw err;
    }
  };

  return { users, loading, error, deleteUser };
}