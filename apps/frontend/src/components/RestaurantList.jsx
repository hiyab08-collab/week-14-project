import { useCallback, useEffect, useState } from "react";
import { deleteRestaurant, fetchRestaurants } from "../api/restaurants";
import RestaurantCard from "./RestaurantCard";

export default function RestaurantList({ filters, refreshSignal, onView, onEdit }) {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadRestaurants = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetchRestaurants(filters);
      setRestaurants(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadRestaurants();
  }, [loadRestaurants, refreshSignal]);

  async function handleDelete(id) {
    try {
      await deleteRestaurant(id);
      setRestaurants((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

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
        <button type="button" className="btn btn-sm btn-outline-danger" onClick={loadRestaurants}>
          Try again
        </button>
      </div>
    );
  }

  if (restaurants.length === 0) {
    return (
      <div className="alert alert-secondary text-center" role="status">
        No matches on the menu yet. Try a different search or filter, or be the first to add one.
      </div>
    );
  }

  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
      {restaurants.map((restaurant) => (
        <div className="col" key={restaurant.id}>
          <RestaurantCard
            restaurant={restaurant}
            onView={onView}
            onEdit={onEdit}
            onDelete={handleDelete}
          />
        </div>
      ))}
    </div>
  );
}
