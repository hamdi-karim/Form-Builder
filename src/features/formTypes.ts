export interface FormRow {
  id: string;
  type: InputType;
  label: string;
  placeholder: string;
}


export interface InitialStateType {
  rows: FormRow[];
  formType: FormType;
}

export type FormType = "Builder" | "Generated";
export type InputType = "text" | "password";
