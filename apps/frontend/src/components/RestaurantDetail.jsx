import { useEffect, useState } from "react";
import { fetchRestaurant } from "../api/restaurants";

const HEADER_CLASS = {
  Vegan: "bg-success",
  "Gluten-Free": "bg-warning",
  Kosher: "bg-primary"
};

const STAMP_EMOJI = {
  Vegan: "🌱",
  "Gluten-Free": "🌾",
  Kosher: "✡️"
};

export default function RestaurantDetail({ restaurantId, onBack, onEdit }) {
  const [restaurant, setRestaurant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetchRestaurant(restaurantId)
      .then((res) => setRestaurant(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [restaurantId]);

  if (isLoading) {
    return (
      <div className="text-center text-muted py-5" role="status">
        <div className="spinner-border text-success mb-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Setting the table...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger d-flex flex-column align-items-start gap-2" role="alert">
        <p className="mb-0">{error}</p>
        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={onBack}>
          Back to browse
        </button>
      </div>
    );
  }

  const dietName = restaurant.dietType?.name ?? "Unknown";
  const headerClass = HEADER_CLASS[dietName] ?? "bg-secondary";
  const stampEmoji = STAMP_EMOJI[dietName] ?? "";

  return (
    <div className="card shadow-sm rounded-4 overflow-hidden" style={{ maxWidth: 480 }}>
      <div className={`card-header ${headerClass} text-white border-0 py-2 px-3`}>
        <span className="fw-semibold small text-uppercase">
          {stampEmoji} {dietName}
        </span>
      </div>

      <div className="card-body">
        <h2 className="h4">{restaurant.name}</h2>

        {restaurant.description && (
          <p className="text-muted">{restaurant.description}</p>
        )}

        <dl className="row small mb-0">
          <dt className="col-6 text-uppercase text-muted" style={{ fontSize: "0.7rem" }}>Address</dt>
          <dt className="col-6 text-uppercase text-muted" style={{ fontSize: "0.7rem" }}>Cuisine</dt>
          <dd className="col-6">{restaurant.address}</dd>
          <dd className="col-6">{restaurant.cuisineType || "—"}</dd>

          <dt className="col-6 text-uppercase text-muted" style={{ fontSize: "0.7rem" }}>Phone</dt>
          <dt className="col-6 text-uppercase text-muted" style={{ fontSize: "0.7rem" }}>Price</dt>
          <dd className="col-6">{restaurant.phone || "—"}</dd>
          <dd className="col-6">{restaurant.priceRange}</dd>
        </dl>
      </div>

      <div className="card-footer bg-transparent border-top-0 pt-0 pb-3 px-3 d-flex gap-2">
        <button type="button" className="btn btn-outline-secondary" onClick={onBack}>
          Back to browse
        </button>
        <button type="button" className="btn btn-success" onClick={() => onEdit(restaurant)}>
          Edit
        </button>
      </div>
    </div>
  );
}
