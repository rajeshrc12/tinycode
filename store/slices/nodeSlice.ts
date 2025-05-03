// store/slices/counterSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface NodeState {
  id: string | false;
}

const initialState: NodeState = {
  id: false,
};

const nodeSlice = createSlice({
  name: "node",
  initialState,
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    resetNode: () => initialState, // return the new state directly
  },
});

export const { setId, resetNode } = nodeSlice.actions;
export default nodeSlice.reducer;
