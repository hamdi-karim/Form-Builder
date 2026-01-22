import { useAppSelector, useAppDispatch } from "../store/hooks";
import { submitForm, resetForm } from "../features/formSlice";
import type { RootState } from "../store/store";

export function GeneratedForm() {
  const rows = useAppSelector((state: RootState) => state.formSlice.rows);
  const isSubmitted = useAppSelector((state: RootState) => state.formSlice.isSubmitted);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(submitForm());
  };

  const handleBackToBuilder = () => {
    dispatch(resetForm());
  };

  if (isSubmitted) {
    return (
      <div className="success-page">
        <h1>✓ Form Submitted Successfully!</h1>
        <p>Thank you for your submission.</p>
        <button className="btn-primary" onClick={handleBackToBuilder}>
          Back to Form Builder
        </button>
      </div>
    );
  }

  return (
    <>
      <h1>Generated Form</h1>
      <form className="generated-form" aria-label="Generated form" onSubmit={handleSubmit}>
        {rows.map((row) => (
          <div key={row.id} style={{ marginBottom: "1rem" }}>
            <label htmlFor={`input-${row.id}`}>{row.label}</label>
            <input
              id={`input-${row.id}`}
              type={row.type}
              placeholder={row.placeholder}
              required
            />
          </div>
        ))}
        <button type="submit" className="btn-primary">Submit</button>
      </form>
    </>
  );
}
