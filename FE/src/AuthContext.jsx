import React, { createContext } from 'react';
import { useSelector } from 'react-redux';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // 리덕스 스토어에서 로그인 상태 확인
    const isAuthenticated = useSelector((state) => !!state.auth.object.userId);

    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
