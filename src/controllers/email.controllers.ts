import { Request, Response } from "express";

import { pool } from "../db/db";

export const getData = async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query("SELECT * FROM email");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export const getOneData = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const { rows } = await pool.query("SELECT * FROM email WHERE id = $1", [
      id,
    ]);
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export const postData = async (req: Request, res: Response) => {
  const { email, rubro } = req.body;

  try {
    const { rows } = await pool.query(
      "INSERT INTO email (email, rubro) VALUES ($1, $2)",
      [email, rubro]
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export const putData = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, rubro } = req.body;

  try {
    const { rows } = await pool.query(
      "UPDATE email SET email = $1, rubro = $2 WHERE id = $3",
      [email, rubro, id]
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export const deleteData = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const { rows } = await pool.query("DELETE FROM email WHERE id = $1", [id]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
