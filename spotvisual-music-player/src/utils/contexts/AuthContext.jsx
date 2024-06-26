import { createContext, useContext, useReducer } from 'react';
import { authReducer as reducer, initialState } from '../../redux/reducers/authReducer.js';

const AuthContext = createContext();

const useAuth = () => {
	return useContext(AuthContext);
}

const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	)
}

export { useAuth, AuthContext, AuthContextProvider as default }