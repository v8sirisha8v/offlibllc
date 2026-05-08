import { useState } from 'react';

/**
 * A custom hook to manage states from auth forms; login/setup.
 * Handles state for username, password, and provides change handlers.
 */
export function useAuthHook(initialUsername = '', initialPassword = '') {
  const [username, setUsername] = useState(initialUsername);
  const [password, setPassword] = useState(initialPassword); 
  const [rememberMe, setRememberMe] = useState(false); // Won't be used until we implement a way to store login tokens 

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRememberMeChange = (e) => setRememberMe(e.target.value);

  return {
    username,
    password,
    rememberMe,
    handleUsernameChange,
    handlePasswordChange,
    handleRememberMeChange
  };
}
