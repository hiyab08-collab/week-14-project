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

export default function RestaurantCard({ restaurant, onView, onEdit, onDelete }) {
  const dietName = restaurant.dietType?.name ?? "Unknown";
  const headerClass = HEADER_CLASS[dietName] ?? "bg-secondary";
  const stampEmoji = STAMP_EMOJI[dietName] ?? "";

  function handleDelete() {
    const confirmed = window.confirm(
      `Remove "${restaurant.name}" from the directory? This can't be undone.`
    );
    if (confirmed) {
      onDelete(restaurant.id);
    }
  }

  return (
    <div className="card h-100 shadow-sm rounded-4 overflow-hidden hover-lift">
      <div className={`card-header ${headerClass} text-white border-0 py-2 px-3`}>
        <span className="fw-semibold small text-uppercase">
          {stampEmoji} {dietName}
        </span>
      </div>

      <div className="card-body d-flex flex-column">
        <h3 className="card-title h5">{restaurant.name}</h3>

        {restaurant.description && (
          <p className="card-text text-muted small">{restaurant.description}</p>
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

      <div className="card-footer bg-transparent border-top-0 pt-0 pb-3 px-3 d-flex gap-2 flex-wrap">
        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => onView(restaurant.id)}>
          View
        </button>
        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => onEdit(restaurant)}>
          Edit
        </button>
        <button type="button" className="btn btn-sm btn-outline-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
