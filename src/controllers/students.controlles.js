import { pool } from "../db.js";

export const getStudents = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM estudiantes");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const getStudent = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM estudiantes WHERE cedula=?", [req.params.id]);
        if (rows.length <= 0) return res.status(404).json({ message: "Student not found" })
        res.send(rows[0])
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }

}

export const createStudents = async (req, res) => {
    try {
        const { id, name, lastname, email, address } = req.body;
        console.log(id)

        const [rows] = await pool.query('INSERT INTO estudiantes (cedula,nombre,apellido,correo,direccion)VALUES(?,?,?,?,?)', [id, name, lastname, email, address])
        res.send({ rows })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }

}

export const updateStudent = async (req, res) => {
    try {
        const { id } = req.params
        const { name, lastname, email, address } = req.body
        console.log(id, name);
        const [result] = await pool.query("UPDATE estudiantes SET nombre=IFNULL(?,nombre), apellido=IFNULL(?,apellido), correo=IFNULL(?, correo), direccion=IFNULL(?, direccion)  WHERE cedula=?", [name, lastname, email, address, id]);
        if (result.affectedRows <= 0) return res.status(404).json({ message: "Student not found" });
        const [rows] = await pool.query("SELECT * FROM estudiantes WHERE cedula=?", [req.params.id]);
        if (rows.length <= 0) return res.status(404).json({ message: "Student not found" })
        res.send(rows[0])
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }

}

export const deleterStudent = async (req, res) => {
    try {
        const [result] = await pool.query("DELETE FROM estudiantes WHERE cedula=?", [req.params.id]);
        if (result.affectedRows <= 0) return res.status(404).json({ message: "Student not found" });
        console.log(result);
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }

}