import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

// This is the provider and in there we are actually manage the user's data.
export const AuthProvider = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);
	const history = useHistory();

	// Whenever we re-navigate or whenever we add the user in there
	useEffect(() => {

		// Grab the user from firebase authentication
		auth.onAuthStateChanged((user) => {
			setUser(user);
			setLoading(false);

			// Re-navigate us to our chat application
			if(user) history.push("/chats");
		})
	}, [user, history]);

	const value = { user };


	return (
		<AuthContext.Provider value={value}>
			{!loading && children} 
		</AuthContext.Provider>
	)
};
