import { configureStore } from '@reduxjs/toolkit'
import rootReducer from 'reducers/index.ts'

const initialState = {
	ingredients: []
}

const store = configureStore({
	rootReducer,
	initialState
})

export default store;