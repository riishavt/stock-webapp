import { createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Storage } from '../../utils/storage';

type initialState = {
    scrip: string
}

const initialState: initialState = {
    scrip: '',
}

export const scripSlice = createSlice({
    name: 'scrip',
    initialState,
    reducers: {
        setScrip: (state: any, action: PayloadAction<string>) => {
            Storage.save('scrip', JSON.stringify(action.payload));
            state.scrip = action.payload;
        }
    }
})

export const { setScrip } = scripSlice.actions;

