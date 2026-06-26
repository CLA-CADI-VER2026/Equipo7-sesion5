import mysql.connector

# Configuración de la conexión
conn = mysql.connector.connect(
    host="127.0.0.1",
    user="root",
    password="contrasena",
    database="directorio",
    port=3306
)
cursor = conn.cursor(dictionary=True)

# ==========================================
# OPERACIONES PARA MATERIAS (CRUD)
# ==========================================

# CREATE (Materia)
def crear_materia(clave, nombre, creditos):
    cursor.execute(
        "INSERT INTO materias (clave, nombre, creditos) VALUES (%s, %s, %s)",
        (clave, nombre, creditos)
    )
    conn.commit()
    print(f"Materia creada con id: {cursor.lastrowid}")

# READ (Todas las materias)
def leer_materias():
    cursor.execute("SELECT * FROM materias")
    for m in cursor.fetchall():
        print(m)

# READ (Materia por id)
def leer_materia(id):
    cursor.execute("SELECT * FROM materias WHERE id = %s", (id,))
    print(cursor.fetchone())

# UPDATE (Créditos de una materia)
def actualizar_creditos_materia(id, nuevos_creditos):
    cursor.execute(
        "UPDATE materias SET creditos = %s WHERE id = %s",
        (nuevos_creditos, id)
    )
    conn.commit()
    print(f"Filas afectadas en materias: {cursor.rowcount}")

# DELETE (Materia)
def eliminar_materia(id):
    cursor.execute("DELETE FROM materias WHERE id = %s", (id,))
    conn.commit()
    print(f"Filas eliminadas en materias: {cursor.rowcount}")


# ==========================================
# OPERACIONES PARA DOCENTES (CRUD)
# ==========================================

# CREATE (Docente)
def crear_docente(nombre, email, materia_id):
    cursor.execute(
        "INSERT INTO docentes (nombre, email, materia_id) VALUES (%s, %s, %s)",
        (nombre, email, materia_id)
    )
    conn.commit()
    print(f"Docente creado con id: {cursor.lastrowid}")

# READ (Todos los docentes)
def leer_docentes():
    cursor.execute("SELECT * FROM docentes")
    for d in cursor.fetchall():
        print(d)

# READ (Docente por id)
def leer_docente(id):
    cursor.execute("SELECT * FROM docentes WHERE id = %s", (id,))
    print(cursor.fetchone())

# UPDATE (Materia asignada a un docente)
def actualizar_materia_docente(id, nuevo_materia_id):
    cursor.execute(
        "UPDATE docentes SET materia_id = %s WHERE id = %s",
        (nuevo_materia_id, id)
    )
    conn.commit()
    print(f"Filas afectadas en docentes: {cursor.rowcount}")

# DELETE (Docente)
def eliminar_docente(id):
    cursor.execute("DELETE FROM docentes WHERE id = %s", (id,))
    conn.commit()
    print(f"Filas eliminadas en docentes: {cursor.rowcount}")


# Prueba manual
if __name__ == "__main__":
    print("--- Todas las materias ---")
    leer_materias()

    print("\n--- Crear nueva materia ---")
    # Intentamos crear una materia de ejemplo
    crear_materia("TC1030", "Programación Orientada a Objetos", 8)

    print("\n--- Leer materia id 1 ---")
    leer_materia(1)

    print("\n--- Actualizar créditos de la materia id 1 ---")
    actualizar_creditos_materia(1, 10)
    leer_materia(1)

    print("\n\n--- Todos los docentes ---")
    leer_docentes()

    print("\n--- Crear nuevo docente ---")
    # Nota: Se pasa '1' como materia_id asumiendo que ya existe la materia con ID 1.
    # Como la tabla acepta materia_id como opcional (NULL), también podría ser None.
    crear_docente("Armando Silva", "armando@tec.mx", 1)

    print("\n--- Leer docente id 1 ---")
    leer_docente(1)

    print("\n--- Actualizar materia asignada al docente id 1 ---")
    # Desasignamos la materia temporalmente pasando None (NULL en MySQL)
    actualizar_materia_docente(1, None)
    leer_docente(1)

    cursor.close()
    conn.close()