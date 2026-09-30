import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
}

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            const exists = state.items.some(item => item.id === action.payload.id)
            if (!exists) {
                state.items.push(action.payload)
            }
        },
        removeFromWishlist: (state, action) => {
            const id = typeof action.payload === 'object' ? action.payload.id : action.payload
            state.items = state.items.filter(item => item.id !== id)
        },
        toggleWishlist: (state, action) => {
            const product = action.payload
            const index = state.items.findIndex(item => item.id === product.id)
            if (index >= 0) {
                state.items.splice(index, 1)
            } else {
                state.items.push(product)
            }
        },
        clearWishlist: (state) => {
            state.items = []
        }
    }
})

export const { addToWishlist, removeFromWishlist, toggleWishlist, clearWishlist } = wishlistSlice.actions

export default wishlistSlice.reducer
