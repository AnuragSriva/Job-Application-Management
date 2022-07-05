import { configureStore } from '@reduxjs/toolkit'

export const ADD_LIST_ITEM_ACTION = 'ADD_LIST_ITEM'
export const EDIT_LIST_ITEM_ACTION = 'EDIT_LIST_ITEM'
export const DELETE_LIST_ITEM_ACTION = 'DELETE_LIST_ITEM'

const applicationListReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_LIST_ITEM_ACTION: {
      return [...state, action.payload]
    }
    case EDIT_LIST_ITEM_ACTION: {
      const { jobId, updatedData } = action.payload
      const updatedState = state.map((data) => {
        return data.jobId === jobId ? { jobId, ...updatedData } : data
      })
      return updatedState
    }
    case DELETE_LIST_ITEM_ACTION: {
      const jobId = action.payload
      const updatedState = state.filter((data) => data.jobId !== jobId)
      return updatedState
    }
    default: {
      return state
    }
  }
}

export const store = configureStore({ reducer: applicationListReducer })
