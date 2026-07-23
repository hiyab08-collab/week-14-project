import { useEffect, useState } from "react";
import { createRestaurant, fetchDietTypes, updateRestaurant } from "../api/restaurants";

const EMPTY_FORM = {
  name: "",
  description: "",
  address: "",
  phone: "",
  cuisineType: "",
  priceRange: "$$",
  dietTypeId: ""
};

export default function RestaurantForm({ editingRestaurant, onSaved, onCancel }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [dietTypes, setDietTypes] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchDietTypes()
      .then((res) => setDietTypes(res.data))
      .catch(() => setDietTypes([]));
  }, []);

  useEffect(() => {
    if (editingRestaurant) {
      setForm({
        name: editingRestaurant.name ?? "",
        description: editingRestaurant.description ?? "",
        address: editingRestaurant.address ?? "",
        phone: editingRestaurant.phone ?? "",
        cuisineType: editingRestaurant.cuisineType ?? "",
        priceRange: editingRestaurant.priceRange ?? "$$",
        dietTypeId: editingRestaurant.dietTypeId ?? ""
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [editingRestaurant]);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validate() {
    const nextErrors = [];
    if (!form.name.trim()) nextErrors.push("Name is required.");
    if (!form.address.trim()) nextErrors.push("Address is required.");
    if (!form.dietTypeId) nextErrors.push("Please choose a diet type.");
    return nextErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validate();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);
    setIsSubmitting(true);

    const payload = {
      ...form,
      dietTypeId: Number(form.dietTypeId)
    };

    try {
      if (editingRestaurant) {
        await updateRestaurant(editingRestaurant.id, payload);
      } else {
        await createRestaurant(payload);
      }
      setForm(EMPTY_FORM);
      onSaved();
    } catch (err) {
      setErrors([err.message]);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="card shadow-sm p-4" style={{ maxWidth: 560 }} onSubmit={handleSubmit}>
      <h2 className="h4 mb-3">{editingRestaurant ? "Edit Restaurant" : "Add a Restaurant"}</h2>

      {errors.length > 0 && (
        <div className="alert alert-danger" role="alert">
          {errors.map((message) => (
            <p className="mb-0" key={message}>{message}</p>
          ))}
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">Name *</label>
        <input
          type="text"
          className="form-control"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={3}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Address *</label>
        <input
          type="text"
          className="form-control"
          value={form.address}
          onChange={(e) => handleChange("address", e.target.value)}
          required
        />
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Phone</label>
          <input
            type="tel"
            className="form-control"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Cuisine</label>
          <input
            type="text"
            className="form-control"
            value={form.cuisineType}
            onChange={(e) => handleChange("cuisineType", e.target.value)}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Price range</label>
          <select
            className="form-select"
            value={form.priceRange}
            onChange={(e) => handleChange("priceRange", e.target.value)}
          >
            <option value="$">$</option>
            <option value="$$">$$</option>
            <option value="$$$">$$$</option>
            <option value="$$$$">$$$$</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Diet type *</label>
          <select
            className="form-select"
            value={form.dietTypeId}
            onChange={(e) => handleChange("dietTypeId", e.target.value)}
            required
          >
            <option value="">Select a diet type</option>
            {dietTypes.map((dietType) => (
              <option key={dietType.id} value={dietType.id}>
                {dietType.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-success" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : editingRestaurant ? "Save changes" : "Add restaurant"}
        </button>
        {editingRestaurant && (
          <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
