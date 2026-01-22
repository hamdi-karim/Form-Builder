import { useAppDispatch } from "../store/hooks";
import { updateInputRow, addInputRow, removeInputRow } from "../features/formSlice";
import type { FormRow } from "../features/formTypes";
import type { InputType } from "../features/formTypes";

interface FieldRowProps {
  row: FormRow;
}

export function FieldRow({ row }: FieldRowProps) {
  const dispatch = useAppDispatch();

  const handleTypeChange = (type: InputType) => {
    dispatch(updateInputRow({ ...row, type }));
  };

  const handleLabelChange = (label: string) => {
    dispatch(updateInputRow({ ...row, label }));
  };

  const handlePlaceholderChange = (placeholder: string) => {
    dispatch(updateInputRow({ ...row, placeholder }));
  };

  const handleRemove = () => {
    if (confirm("Are you sure you want to remove this field?")) {
      dispatch(removeInputRow(row.id));
    }
  };

  const handleAdd = () => {
    dispatch(addInputRow({
      id: crypto.randomUUID(),
      type: "text",
      label: "",
      placeholder: "",
    }));
  };

  return (
    <div className="field-row" role="group" aria-label="Form field configuration">
      <label htmlFor={`type-${row.id}`}>Field Type</label>
      <select
        id={`type-${row.id}`}
        value={row.type}
        onChange={(e) => handleTypeChange(e.target.value as InputType)}
      >
        <option value="text">Text</option>
        <option value="password">Password</option>
      </select>

      <label htmlFor={`label-${row.id}`}>Label</label>
      <input
        id={`label-${row.id}`}
        value={row.label}
        onChange={(e) => handleLabelChange(e.target.value)}
        placeholder="Enter field label"
      />

      <label htmlFor={`placeholder-${row.id}`}>Placeholder</label>
      <input
        id={`placeholder-${row.id}`}
        value={row.placeholder}
        onChange={(e) => handlePlaceholderChange(e.target.value)}
        placeholder="Enter placeholder text"
      />

      <div className="field-actions">
        <button className="btn-remove" onClick={handleRemove} aria-label="Remove field">X</button>
        <button className="btn-add" onClick={handleAdd} aria-label="Add new field">+</button>
      </div>
    </div>
  );
}
