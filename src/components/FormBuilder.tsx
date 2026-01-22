import { useAppSelector, useAppDispatch } from "../store/hooks";
import type { RootState } from "../store/store";
import { addInputRow } from "../features/formSlice";
import { FieldRow } from "./FieldRow";

export function FormBuilder() {
  const rows = useAppSelector((state: RootState) => state.formSlice.rows);
  const dispatch = useAppDispatch();

  const handleAddFirst = () => {
    dispatch(addInputRow({
      id: crypto.randomUUID(),
      type: "text",
      label: "",
      placeholder: "",
    }));
  };

  return (
    <>
      <h1>Form Builder</h1>
      {rows.length === 0 ? (
        <button className="btn-add" onClick={handleAddFirst}>
          + Add First Field
        </button>
      ) : (
        rows.map((row) => (
          <FieldRow key={row.id} row={row} />
        ))
      )}
    </>
  );
}
