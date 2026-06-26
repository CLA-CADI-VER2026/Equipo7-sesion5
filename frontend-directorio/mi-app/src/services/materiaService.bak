const URL_BASE = "hhttps://glorious-space-succotash-jgjrvppxjpvcjg49-5173.app.github.dev";

// ==========================================
// SERVICIOS PARA MATERIAS
// ==========================================

export async function getAllMaterias() {
  const r = await fetch(`${URL_BASE}/materias`);
  return r.json();
}

export async function getOneMateria(id) {
  const r = await fetch(`${URL_BASE}/materias/${id}`);
  return r.json();
}

export async function createMateria(data) {
  const r = await fetch(`${URL_BASE}/materias`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return r.json();
}

export async function updateMateria(id, data) {
  const r = await fetch(`${URL_BASE}/materias/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return r.json();
}

export async function removeMateria(id) {
  const r = await fetch(`${URL_BASE}/materias/${id}`, { method: "DELETE" });
  return r.json();
}

// ==========================================
// SERVICIOS PARA DOCENTES
// ==========================================

export async function getAllDocentes() {
  const r = await fetch(`${URL_BASE}/docentes`);
  return r.json();
}

export async function getOneDocente(id) {
  const r = await fetch(`${URL_BASE}/docentes/${id}`);
  return r.json();
}

export async function createDocente(data) {
  const r = await fetch(`${URL_BASE}/docentes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return r.json();
}

export async function updateDocente(id, data) {
  const r = await fetch(`${URL_BASE}/docentes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return r.json();
}

export async function removeDocente(id) {
  const r = await fetch(`${URL_BASE}/docentes/${id}`, { method: "DELETE" });
  return r.json();
}