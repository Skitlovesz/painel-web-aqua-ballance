import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { deleteUser } from 'firebase/auth';
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
          uid: doc.data().uid,
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

  const deleteUser = async (id: string, uid: string) => {
    try {
      // Primeiro deletamos do Firestore
      await deleteDoc(doc(db, 'users', id));
      
      // Depois tentamos deletar da autenticação usando uma função do Cloud Functions
      const response = await fetch(`https://us-central1-aquaballance-1b2ae.cloudfunctions.net/deleteUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid })
      });

      if (!response.ok) {
        throw new Error('Falha ao deletar usuário da autenticação');
      }

      return true;
    } catch (err) {
      console.error('Error deleting user:', err);
      throw err;
    }
  };

  return { users, loading, error, deleteUser };
}