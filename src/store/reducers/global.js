import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  contactlist: null,
  selectedContact:null
};

const globalSlice = createSlice({
  name: 'globalState',
  initialState,
  reducers: {
    updateContactListList(state, action) {
      state.contactlist = action.payload;
    },
  },
});
export const globalAction = globalSlice.actions;
export default globalSlice.reducer;
