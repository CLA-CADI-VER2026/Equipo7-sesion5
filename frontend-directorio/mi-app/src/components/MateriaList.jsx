export default function MateriaList({ materias, onEditar, onEliminar }) {
  return (
    <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>ID</th><th>Clave</th><th>Nombre</th><th>Créditos</th><th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {materias.map(m => (
          <tr key={m.id}>
            <td>{m.id}</td>
            <td>{m.clave}</td>
            <td>{m.nombre}</td>
            <td>{m.creditos}</td>
            <td>
              <button onClick={() => onEditar(m)}>Editar</button>
              <button onClick={() => onEliminar(m.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}