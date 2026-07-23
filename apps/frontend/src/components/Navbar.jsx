export default function Navbar({ view, onNavigate, theme, onToggleTheme }) {
  return (
    <nav className="navbar navbar-expand-md bg-body-tertiary border-bottom mb-4">
      <div className="container flex-wrap">
        <div>
          <span className="navbar-brand d-flex align-items-center gap-2 fw-bold fs-3 mb-0">
            <span
              className="border border-2 rounded-circle d-inline-flex align-items-center justify-content-center"
              style={{ width: 42, height: 42, fontSize: "0.65rem" }}
            >
              EAT
            </span>
            KindTable
          </span>
          <p className="text-muted small mb-0 ms-1">
            Vegan, gluten-free &amp; kosher restaurants, verified.
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          <button
            type="button"
            className={`btn btn-sm ${view === "browse" ? "btn-success" : "btn-outline-secondary"}`}
            onClick={() => onNavigate("browse")}
          >
            Browse
          </button>
          <button
            type="button"
            className={`btn btn-sm ${view === "add" ? "btn-success" : "btn-outline-secondary"}`}
            onClick={() => onNavigate("add")}
          >
            Add Restaurant
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary rounded-circle"
            onClick={onToggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </nav>
  );
}
