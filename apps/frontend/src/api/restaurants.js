const API_BASE = "http://localhost:3001/api";

async function handleResponse(response) {
  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(body.message || "Something went wrong. Please try again.");
  }

  return body;
}

export async function fetchRestaurants({ diet, search } = {}) {
  const params = new URLSearchParams();
  if (diet) params.set("diet", diet);
  if (search) params.set("search", search);

  const query = params.toString();
  const response = await fetch(`${API_BASE}/restaurants${query ? `?${query}` : ""}`);
  return handleResponse(response);
}

export async function fetchRestaurant(id) {
  const response = await fetch(`${API_BASE}/restaurants/${id}`);
  return handleResponse(response);
}

export async function createRestaurant(data) {
  const response = await fetch(`${API_BASE}/restaurants`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return handleResponse(response);
}

export async function updateRestaurant(id, data) {
  const response = await fetch(`${API_BASE}/restaurants/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return handleResponse(response);
}

export async function deleteRestaurant(id) {
  const response = await fetch(`${API_BASE}/restaurants/${id}`, {
    method: "DELETE"
  });
  return handleResponse(response);
}

export async function fetchDietTypes() {
  const response = await fetch(`${API_BASE}/diet-types`);
  return handleResponse(response);
}
