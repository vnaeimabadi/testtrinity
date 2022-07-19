import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  contactlist: null,
  selectedContact:null
};

const globalSlice = createSlice({
  name: 'globalState',
  initialState,
  reducers: {
    setContact(state, action) {
      state.contactlist = action.payload;
    },
    updateSelectedContact(state, action) {
      state.selectedContact = action.payload;
    },
    updateContactList(state, action) {
      const tempData=state.contactlist.map((el,_)=>{
        return action.payload.id===el.id?action.payload:el
      })
      state.contactlist = tempData;
    },
  },
});
export const globalAction = globalSlice.actions;
export default globalSlice.reducer;
