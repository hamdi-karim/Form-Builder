import { useAppSelector } from "../store/hooks";
import type { RootState } from "../store/store";

export function GeneratedForm() {
  const rows = useAppSelector((state: RootState) => state.formSlice.rows);

  return (
    <>
      <h1>Generated Form</h1>
      <form className="generated-form" aria-label="Generated form">
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
