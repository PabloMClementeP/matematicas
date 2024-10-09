import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';

interface User {
  name: string;
  avatar: string;
  score: number;
  topScore: number;
  isLogued: boolean;
}

interface UserContextType {
  user: User | null;
  updateUser: (updatedUser: Partial<User>) => void;
  logoutUser: () => void;
}

const defaultUser: User = {
  name: '',
  avatar: '',
  score: 0,
  topScore: 0,
  isLogued: false,
};

const defaultContextValue: UserContextType = {
  user: null,  // Inicialmente no hay usuario logueado
  updateUser: () => {},
  logoutUser: () => {},
};

const UserContext = createContext<UserContextType>(defaultContextValue);

export const useUserContext = () => useContext(UserContext);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Función para obtener los usuarios del localStorage
  const getStoredUsers = () => {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : [];
  };

  // Función para guardar usuarios en localStorage
  const saveUsersToLocalStorage = (users: User[]) => {
    localStorage.setItem('users', JSON.stringify(users));
  };

  const updateUser = (updatedUser: Partial<User>) => {
    setUser(prevUser => {
      const currentUser = prevUser || defaultUser;  // Aseguramos que prevUser nunca sea null
  
      const newUser = {
        ...currentUser,
        ...updatedUser,
        // Actualiza el topScore solo si el nuevo score es mayor que el topScore anterior
        topScore: updatedUser.score && updatedUser.score > currentUser.topScore
          ? updatedUser.score
          : currentUser.topScore,
      };
      
      // Guardar los datos actualizados del usuario en el localStorage
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = storedUsers.map((u: User) =>
        u.name === newUser.name ? newUser : u
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      return newUser;
    });
  };

  const logoutUser = () => {
    if (!user) return;

    const users = getStoredUsers();
    const existingUserIndex = users.findIndex((u: User) => u.name === user.name);

    if (existingUserIndex !== -1) {
      // Actualizamos solo el campo isLogued a false para el usuario que se desloguea
      users[existingUserIndex].isLogued = false;
      saveUsersToLocalStorage(users);
    }

    // Desloguear el usuario actual
    setUser(null);
  };

  const value = useMemo(() => ({ user, updateUser, logoutUser }), [user]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
