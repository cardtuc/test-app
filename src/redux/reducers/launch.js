import { createReducer } from '@reduxjs/toolkit';
import { setAllLaunches, setSelectedLaunch, clearSelectedLaunch } from '../actions';

export const initialState = {
  allLaunches: [],
  selectedLaunch: null
};

const launchReducer = createReducer(initialState, {
  [setAllLaunches]: (state, { payload }) => {
    state.allLaunches = payload;
  },
  [setSelectedLaunch]: (state, { payload }) => {
    state.selectedLaunch = payload;
  },
  [clearSelectedLaunch]: (state) => {
    state.selectedLaunch = null;
  }
});

export default launchReducer;
