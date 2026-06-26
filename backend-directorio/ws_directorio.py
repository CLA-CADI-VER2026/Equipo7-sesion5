from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app, origins="*")

def get_connection():
    return mysql.connector.connect(
        host="127.0.0.1",
        user="root",
        password="contrasena",
        database="directorio",
        port=3306
    )

# ==========================================
# ENDPOINTS PARA MATERIAS
# ==========================================

# GET /materias: obtener todas
@app.route("/materias", methods=["GET"])
def get_all_materias():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM materias")
    resultado = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(resultado), 200

# GET /materias/<id>: obtener una
@app.route("/materias/<int:id>", methods=["GET"])
def get_one_materia(id):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM materias WHERE id = %s", (id,))
    materia = cursor.fetchone()
    cursor.close()
    conn.close()
    if not materia:
        return jsonify({"error": "Materia no encontrada"}), 404
    return jsonify(materia), 200

# POST /materias: crear
@app.route("/materias", methods=["POST"])
def create_materia():
    data = request.get_json()
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO materias (clave, nombre, creditos) VALUES (%s, %s, %s)",
        (data["clave"], data["nombre"], data.get("creditos", None))
    )
    conn.commit()
    nuevo_id = cursor.lastrowid
    cursor.close()
    conn.close()
    return jsonify({"mensaje": "Materia creada", "id": nuevo_id}), 201

# PUT /materias/<id>: actualizar
@app.route("/materias/<int:id>", methods=["PUT"])
def update_materia(id):
    data = request.get_json()
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE materias SET clave=%s, nombre=%s, creditos=%s WHERE id=%s",
        (data["clave"], data["nombre"], data.get("creditos", None), id)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"mensaje": "Materia actualizada"}), 200

# DELETE /materias/<id>: eliminar
@app.route("/materias/<int:id>", methods=["DELETE"])
def delete_materia(id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM materias WHERE id = %s", (id,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"mensaje": "Materia eliminada"}), 200


# ==========================================
# ENDPOINTS PARA DOCENTES
# ==========================================

# GET /docentes: obtener todos
@app.route("/docentes", methods=["GET"])
def get_all_docentes():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM docentes")
    resultado = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(resultado), 200

# GET /docentes/<id>: obtener uno
@app.route("/docentes/<int:id>", methods=["GET"])
def get_one_docente(id):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM docentes WHERE id = %s", (id,))
    docente = cursor.fetchone()
    cursor.close()
    conn.close()
    if not docente:
        return jsonify({"error": "Docente no encontrado"}), 404
    return jsonify(docente), 200

# POST /docentes: crear
@app.route("/docentes", methods=["POST"])
def create_docente():
    data = request.get_json()
    conn = get_connection()
    cursor = conn.cursor()
    # Usamos .get("materia_id", None) ya que este campo puede ser nulo (NULL)
    cursor.execute(
        "INSERT INTO docentes (nombre, email, materia_id) VALUES (%s, %s, %s)",
        (data["nombre"], data["email"], data.get("materia_id", None))
    )
    conn.commit()
    nuevo_id = cursor.lastrowid
    cursor.close()
    conn.close()
    return jsonify({"mensaje": "Docente creado", "id": nuevo_id}), 201

# PUT /docentes/<id>: actualizar
@app.route("/docentes/<int:id>", methods=["PUT"])
def update_docente(id):
    data = request.get_json()
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE docentes SET nombre=%s, email=%s, materia_id=%s WHERE id=%s",
        (data["nombre"], data["email"], data.get("materia_id", None), id)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"mensaje": "Docente actualizado"}), 200

# DELETE /docentes/<id>: eliminar
@app.route("/docentes/<int:id>", methods=["DELETE"])
def delete_docente(id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM docentes WHERE id = %s", (id,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"mensaje": "Docente eliminado"}), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)