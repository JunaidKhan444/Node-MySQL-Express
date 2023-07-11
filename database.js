import mysql from "mysql2";

import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

export const getNotes = async () => {
    const [rows] = await pool.query("SELECT * FROM notes");
    return rows;
}

export const getNote = async (id) => {
    // Prepared Statement
    const [rows] = await pool.query(`SELECT * FROM notes WHERE id= ?`, [id]);
    // First Element of Array
    return rows[0];
}

export const createNote = async (title, contents) => {
    const [result] = await pool.query(`INSERT INTO notes (title,contents) VALUES (?,?)`, [title, contents]);
    const id = result.insertId;
    return getNote(id);
}

// const notes = await getNotes();
// const note = await getNote(2);
// const result = await createNote("Name", "Junaid");
// console.log(notes);
