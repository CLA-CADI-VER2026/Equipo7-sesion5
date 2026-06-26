import { useState, useEffect } from "react";
import MateriaList from "./components/MateriaList";
import MateriaForm from "./components/MateriaForm";
import DocenteList from "./components/DocenteList";
import DocenteForm from "./components/DocenteForm";
import * as svc from "./services/directorioService";

export default function App() {
  // Estado para la navegación interna ('materias' o 'docentes')
  const [vista, setVista] = useState("materias");

  // Estados de datos
  const [materias, setMaterias] = useState([]);
  const [docentes, setDocentes] = useState([]);

  // Estados para edición
  const [materiaEditar, setMateriaEditar] = useState(null);
  const [docenteEditar, setDocenteEditar] = useState(null);

  // Mensajes globales de feedback
  const [mensaje, setMensaje] = useState("");

  // Funciones de carga coordinada
  const cargarMaterias = async () => {
    const datos = await svc.getAllMaterias();
    setMaterias(datos);
  };

  const cargarDocentes = async () => {
    const datos = await svc.getAllDocentes();
    setDocentes(datos);
  };

  // Cargar todo al arrancar la aplicación
  useEffect(() => {
    cargarMaterias();
    cargarDocentes();
  }, []);

  // Limpiar mensajes automáticamente después de unos segundos (opcional y cómodo)
  useEffect(() => {
    if (mensaje) {
      const timer = setTimeout(() => setMensaje(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [mensaje]);


  // ==========================================
  // MANEJADORES - MATERIAS
  // ==========================================
  const handleGuardarMateria = async (datos) => {
    if (materiaEditar) {
      await svc.updateMateria(materiaEditar.id, datos);
      setMensaje("Materia actualizada con éxito.");
    } else {
      await svc.createMateria(datos);
      setMensaje("Materia creada con éxito.");
    }
    setMateriaEditar(null);
    cargarMaterias();
    // Recargamos docentes también porque sus referencias de materia_id dependen de materias
    cargarDocentes(); 
  };

  const handleEliminarMateria = async (id) => {
    // Nota: Si una materia está asignada a un docente, el backend podría fallar 
    // por restricción de llave foránea a menos que lidiemos con ello.
    try {
      await svc.removeMateria(id);
      setMensaje(`Materia con ID ${id} eliminada.`);
      cargarMaterias();
      cargarDocentes();
    } catch (error) {
      setMensaje("No se pudo eliminar la materia. Asegúrate de que ningún docente la tenga asignada.");
    }
  };


  // ==========================================
  // MANEJADORES - DOCENTES
  // ==========================================
  const handleGuardarDocente = async (datos) => {
    if (docenteEditar) {
      await svc.updateDocente(docenteEditar.id, datos);
      setMensaje("Docente actualizado con éxito.");
    } else {
      await svc.createDocente(datos);
      setMensaje("Docente creado con éxito.");
    }
    setDocenteEditar(null);
    cargarDocentes();
  };

  const handleEliminarDocente = async (id) => {
    await svc.removeDocente(id);
    setMensaje(`Docente con ID ${id} eliminado.`);
    cargarDocentes();
  };


  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: "0 20px", fontFamily: "sans-serif" }}>
      <h1>Sistema de Control Escolar</h1>
      
      {/* Barra de navegación simple */}
      <nav style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <button 
          onClick={() => setVista("materias")} 
          style={{
            padding: "10px 20px",
            fontWeight: vista === "materias" ? "bold" : "normal",
            backgroundColor: vista === "materias" ? "#ddd" : "#f5f5f5",
            cursor: "pointer"
          }}
        >
          Sección Materias
        </button>
        <button 
          onClick={() => setVista("docentes")} 
          style={{
            padding: "10px 20px",
            fontWeight: vista === "docentes" ? "bold" : "normal",
            backgroundColor: vista === "docentes" ? "#ddd" : "#f5f5f5",
            cursor: "pointer"
          }}
        >
          Sección Docentes
        </button>
      </nav>

      {/* Alertas de operación */}
      {mensaje && (
        <div style={{ padding: "10px", backgroundColor: "#e6f4ea", color: "#137333", marginBottom: "20px", borderRadius: "4px" }}>
          {mensaje}
        </div>
      )}

      <hr />

      {/* Renderizado condicional según la pestaña activa */}
      {vista === "materias" ? (
        <section>
          <h2>Gestión de Materias</h2>
          <MateriaForm
            materiaEditar={materiaEditar}
            onGuardado={handleGuardarMateria}
            onCancelar={() => setMateriaEditar(null)}
          />
          <hr style={{ margin: "20px 0", borderStyle: "dashed" }} />
          <MateriaList
            materias={materias}
            onEditar={setMateriaEditar}
            onEliminar={handleEliminarMateria}
          />
        </section>
      ) : (
        <section>
          <h2>Gestión de Docentes</h2>
          <DocenteForm
            docenteEditar={docenteEditar}
            onGuardado={handleGuardarDocente}
            onCancelar={() => setDocenteEditar(null)}
          />
          <hr style={{ margin: "20px 0", borderStyle: "dashed" }} />
          <DocenteList
            docentes={docentes}
            onEditar={setDocenteEditar}
            onEliminar={handleEliminarDocente}
          />
        </section>
      )}
    </div>
  );
}