import { createSlice } from '@reduxjs/toolkit'

const getInitialUser = () => {
    if (typeof window !== 'undefined') {
        try {
            const stored = localStorage.getItem('nexusmart_user')
            if (stored) {
                return JSON.parse(stored)
            }
        } catch {
            // ignore JSON parse error
        }
    }
    return null
}

const initialState = {
    user: getInitialUser(),
    isAuthenticated: !!getInitialUser(),
    isAuthModalOpen: false,
    authMode: 'signup', // 'signin' or 'signup'
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
            state.isAuthenticated = !!action.payload
            state.isAuthModalOpen = false
            if (typeof window !== 'undefined' && action.payload) {
                try {
                    localStorage.setItem('nexusmart_user', JSON.stringify(action.payload))
                } catch {
                    // ignore
                }
            }
        },
        logout: (state) => {
            state.user = null
            state.isAuthenticated = false
            if (typeof window !== 'undefined') {
                try {
                    localStorage.removeItem('nexusmart_user')
                } catch {
                    // ignore
                }
            }
        },
        openAuthModal: (state, action) => {
            state.isAuthModalOpen = true
            state.authMode = action.payload === 'signin' ? 'signin' : 'signup'
        },
        closeAuthModal: (state) => {
            state.isAuthModalOpen = false
        },
        setAuthMode: (state, action) => {
            state.authMode = action.payload === 'signin' ? 'signin' : 'signup'
        }
    }
})

export const { setUser, logout, openAuthModal, closeAuthModal, setAuthMode } = authSlice.actions

export default authSlice.reducer
