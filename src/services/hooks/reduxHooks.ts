import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from 'react-redux';

import {AppDispatch, AppThunk} from "declarations/types";
import {RootState} from "declarations/rootState.ts";

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();