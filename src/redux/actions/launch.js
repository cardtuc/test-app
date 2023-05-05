import { createAction } from '@reduxjs/toolkit';

export const setAllLaunches = createAction('LAUNCH/SET_ALL_LAUNCHES');
export const setSelectedLaunch = createAction('LAUNCH/SET_SELECTED_LAUNCH');
export const clearSelectedLaunch = createAction('LAUNCH/CLEAR_SELECTED_LAUNCH');
