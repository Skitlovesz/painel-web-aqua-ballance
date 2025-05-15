import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';

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
  const auth = getAuth();

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
      const userData = userSnapshot.data();

      if (!userSnapshot.exists()) {
        throw new Error('User not found');
      }

      // Delete user data from Firestore
      await deleteDoc(userDocRef);

      // Note: In a production environment, you would need to:
      // 1. Re-authenticate the user before deletion
      // 2. Handle the deletion of the Firebase Auth user through a secure backend
      // 3. Implement proper error handling for various edge cases

      return true;
    } catch (err) {
      console.error('Error deleting user:', err);
      throw err; // Propagate the error to be handled by the UI
    }
  };

  return { users, loading, error, deleteUser };
}