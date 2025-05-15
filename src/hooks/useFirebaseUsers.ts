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

  const deleteUser = async (id: string, uid?: string) => {
    try {
      // Busca o usuário na lista local para garantir o UID
      const localUser = users.find(u => u.id === id);
      const userUid = uid || localUser?.uid;

      if (!userUid) {
        throw new Error('UID do usuário não encontrado.');
      }

      // Chama a API de administração para excluir do Firestore e Auth
      const response = await fetch(`http://localhost:3000/delete-user/${userUid}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Erro ao excluir usuário no backend');
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