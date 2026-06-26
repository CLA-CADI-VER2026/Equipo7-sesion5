import { useState, useEffect } from "react";

export default function MateriaForm({ materiaEditar, onGuardado, onCancelar }) {
  const [clave, setClave] = useState("");
  const [nombre, setNombre] = useState("");
  const [creditos, setCreditos] = useState("");

  // Cargar datos cuando se va a editar
  useEffect(() => {
    if (materiaEditar) {
      setClave(materiaEditar.clave);
      setNombre(materiaEditar.nombre);
      setCreditos(materiaEditar.creditos ?? "");
    } else {
      setClave(""); setNombre(""); setCreditos("");
    }
  }, [materiaEditar]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convertimos créditos a número o enviamos null si está vacío
    const datosMateria = { 
      clave, 
      nombre, 
      creditos: creditos === "" ? null : Number(creditos) 
    };
    onGuardado(datosMateria);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{materiaEditar ? "Editar materia" : "Nueva materia"}</h3>
      <input value={clave} onChange={e => setClave(e.target.value)} placeholder="Clave" required />
      <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" required />
      <input type="number" value={creditos} onChange={e => setCreditos(e.target.value)} placeholder="Créditos" />
      <button type="submit">Guardar</button>
      {materiaEditar && <button type="button" onClick={onCancelar}>Cancelar</button>}
    </form>
  );
}