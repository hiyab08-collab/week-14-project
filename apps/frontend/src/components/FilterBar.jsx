import { useEffect, useState } from "react";
import { fetchDietTypes } from "../api/restaurants";

export default function FilterBar({ onFilterChange }) {
  const [dietTypes, setDietTypes] = useState([]);
  const [search, setSearch] = useState("");
  const [diet, setDiet] = useState("");

  useEffect(() => {
    fetchDietTypes()
      .then((res) => setDietTypes(res.data))
      .catch(() => setDietTypes([]));
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onFilterChange({ search: search.trim(), diet });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [search, diet, onFilterChange]);

  return (
    <div className="row g-2 mb-4">
      <div className="col-md-8">
        <input
          type="text"
          className="form-control"
          placeholder="Search restaurants by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search restaurants"
        />
      </div>
      <div className="col-md-4">
        <select
          className="form-select"
          value={diet}
          onChange={(e) => setDiet(e.target.value)}
          aria-label="Filter by diet type"
        >
          <option value="">All diet types</option>
          {dietTypes.map((dietType) => (
            <option key={dietType.id} value={dietType.name}>
              {dietType.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
