import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

export interface FirebaseUser {
  id: string;
  nome: string;
  sobrenome: string;
  email: string;
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
      await deleteDoc(doc(db, 'users', id));
      return true;
    } catch (err) {
      console.error('Error deleting user:', err);
      throw new Error('Failed to delete user');
    }
  };

  return { users, loading, error, deleteUser };
}