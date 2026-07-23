import { useCallback, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import FilterBar from "./components/FilterBar";
import RestaurantList from "./components/RestaurantList";
import RestaurantForm from "./components/RestaurantForm";
import RestaurantDetail from "./components/RestaurantDetail";

export default function App() {
  const [view, setView] = useState("browse");
  const [filters, setFilters] = useState({ search: "", diet: "" });
  const [editingRestaurant, setEditingRestaurant] = useState(null);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const [refreshSignal, setRefreshSignal] = useState(0);
  const [theme, setTheme] = useState(() => localStorage.getItem("kindtable-theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("kindtable-theme", theme);
  }, [theme]);

  function handleToggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  const handleFilterChange = useCallback((next) => {
    setFilters(next);
  }, []);

  function handleView(id) {
    setSelectedRestaurantId(id);
    setView("detail");
  }

  function handleEdit(restaurant) {
    setEditingRestaurant(restaurant);
    setView("add");
  }

  function handleSaved() {
    setEditingRestaurant(null);
    setRefreshSignal((n) => n + 1);
    setView("browse");
  }

  function handleCancelEdit() {
    setEditingRestaurant(null);
    setView("browse");
  }

  function handleBackToBrowse() {
    setSelectedRestaurantId(null);
    setView("browse");
  }

  function handleNavigate(nextView) {
    if (nextView === "add") {
      setEditingRestaurant(null);
    }
    setView(nextView);
  }

  return (
    <div className="min-vh-100 bg-body text-body">
      <Navbar view={view} onNavigate={handleNavigate} theme={theme} onToggleTheme={handleToggleTheme} />

      <main className="container pb-5">
        {view === "browse" && (
          <>
            <FilterBar onFilterChange={handleFilterChange} />
            <RestaurantList
              filters={filters}
              refreshSignal={refreshSignal}
              onView={handleView}
              onEdit={handleEdit}
            />
          </>
        )}

        {view === "detail" && (
          <RestaurantDetail
            restaurantId={selectedRestaurantId}
            onBack={handleBackToBrowse}
            onEdit={handleEdit}
          />
        )}

        {view === "add" && (
          <RestaurantForm
            editingRestaurant={editingRestaurant}
            onSaved={handleSaved}
            onCancel={handleCancelEdit}
          />
        )}
      </main>
    </div>
  );
}
