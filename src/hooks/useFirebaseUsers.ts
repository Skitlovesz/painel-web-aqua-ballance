import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
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
      // Delete from Firestore first
      await deleteDoc(doc(db, 'users', id));
      
      // Then delete the authentication account
      await auth.deleteUser(uid);
      
      return true;
    } catch (err) {
      console.error('Error deleting user:', err);
      throw err;
    }
  };

  return { users, loading, error, deleteUser };
}