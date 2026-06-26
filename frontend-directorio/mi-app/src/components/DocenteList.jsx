export default function DocenteList({ docentes, onEditar, onEliminar }) {
  return (
    <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>ID</th><th>Nombre</th><th>Email</th><th>ID Materia</th><th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {docentes.map(d => (
          <tr key={d.id}>
            <td>{d.id}</td>
            <td>{d.nombre}</td>
            <td>{d.email}</td>
            <td>{d.materia_id ? d.materia_id : "Sin asignar"}</td>
            <td>
              <button onClick={() => onEditar(d)}>Editar</button>
              <button onClick={() => onEliminar(d.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}