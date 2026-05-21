interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Cari produk..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ padding: "8px", width: "300px", fontSize: "16px", marginBottom: "16px" }}
    />
  );
}

export default SearchBar;