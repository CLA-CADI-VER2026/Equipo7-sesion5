import { useState, useEffect } from "react";

export default function DocenteForm({ docenteEditar, onGuardado, onCancelar }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [materiaId, setMateriaId] = useState("");

  // Cargar datos cuando se va a editar
  useEffect(() => {
    if (docenteEditar) {
      setNombre(docenteEditar.nombre);
      setEmail(docenteEditar.email);
      setMateriaId(docenteEditar.materia_id ?? "");
    } else {
      setNombre(""); setEmail(""); setMateriaId("");
    }
  }, [docenteEditar]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convertimos materia_id a número o enviamos null si no se asigna ninguna
    const datosDocente = { 
      nombre, 
      email, 
      materia_id: materiaId === "" ? null : Number(materiaId) 
    };
    onGuardado(datosDocente);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{docenteEditar ? "Editar docente" : "Nuevo docente"}</h3>
      <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" required />
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
      <input type="number" value={materiaId} onChange={e => setMateriaId(e.target.value)} placeholder="ID Materia (Opcional)" />
      <button type="submit">Guardar</button>
      {docenteEditar && <button type="button" onClick={onCancelar}>Cancelar</button>}
    </form>
  );
}