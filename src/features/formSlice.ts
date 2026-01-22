import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { FormRow, InitialStateType } from "./formTypes";

const initialState: InitialStateType = {
  rows: [
    {
      id: "0",
      type: "password",
      placeholder: "",
      label: "",
    },
  ],
  formType: "Builder",
  isSubmitted: false,
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    switchFormType: (state) => {
      state.formType = state.formType === "Builder" ? "Generated" : "Builder";
    },

    addInputRow: (state, action: PayloadAction<FormRow>) => {
      state.rows.push(action.payload);
    },

    updateInputRow: (state, action: PayloadAction<FormRow>) => {
      const rowIndex = state.rows.findIndex(
        (row) => row.id === action.payload.id,
      );
      state.rows[rowIndex] = action.payload;
    },

    removeInputRow: (state, action: PayloadAction<string>) => {
      state.rows = state.rows.filter((row) => row.id !== action.payload);
    },

    submitForm: (state) => {
      state.isSubmitted = true;
    },

    resetForm: (state) => {
      state.isSubmitted = false;
      state.formType = "Builder";
    },
  },
});

export const { switchFormType, addInputRow, updateInputRow, removeInputRow, submitForm, resetForm } =
  formSlice.actions;

export default formSlice.reducer;
