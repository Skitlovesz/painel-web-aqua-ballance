import { useState, useEffect } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

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

  const deleteUser = async (userUid: string) => {
    const functionUrl = `https://aquaballance-api.vercel.app/api/users/delete/${userUid}`;

    try {
      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ adminUid: 's3ZY9zHPBSfCZXpKRI7T' })
      });

      if (!response.ok) {
        console.log(response);
        throw new Error(`Erro: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
      console.log(data.message);
    } catch (error: any) {
      console.error('Erro ao deletar o usuário:', error.message);
    }
  };

  return { users, loading, error, deleteUser };
}