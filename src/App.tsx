import "./App.css";
import { switchFormType } from "./features/formSlice";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import type { RootState } from "./store/store";
import { FormBuilder, GeneratedForm } from "./components";

function App() {
  const rows = useAppSelector((state: RootState) => state.formSlice.rows);
  const formType = useAppSelector((state: RootState) => state.formSlice.formType);
  const isSubmitted = useAppSelector((state: RootState) => state.formSlice.isSubmitted);
  const dispatch = useAppDispatch();

  const isFormValid = rows.length > 0 && rows.every((row) => row.label.trim() !== "");

  const handleFormTypeSwitch = () => {
    if (formType === "Builder" && !isFormValid) return;
    dispatch(switchFormType());
  };

  return (
    <div className="app">
      {formType === "Builder" && <FormBuilder />}
      {formType === "Generated" && <GeneratedForm />}

      {formType === "Builder" && !isFormValid && (
        <p className="error-message">
          Please add at least one field and fill in all labels.
        </p>
      )}

      {!isSubmitted && (
        <button
          className="btn-primary"
          onClick={handleFormTypeSwitch}
          disabled={formType === "Builder" && !isFormValid}
        >
          {formType === "Builder" ? "Save" : "Edit"}
        </button>
      )}
    </div>
  );
}

export default App;
