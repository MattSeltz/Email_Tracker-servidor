import { Request, Response } from "express";

import { pool } from "../db/db";

export const getData = async (req: Request, res: Response) => {
  const { userId } = req.query;

  try {
    const { rows } = await pool.query(
      "SELECT * FROM emails WHERE user_id = $1 ORDER BY id ASC",
      [userId]
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export const getOneData = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const { rows } = await pool.query("SELECT * FROM emails WHERE id = $1", [
      id,
    ]);
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export const postData = async (req: Request, res: Response) => {
  const { email, rubro, userId } = req.body;

  try {
    const { rows } = await pool.query(
      "INSERT INTO emails (email, rubro, user_id) VALUES ($1, $2, $3) ON CONFLICT (email, user_id) DO NOTHING",
      [email, rubro, userId]
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
      "UPDATE emails SET email = $1, rubro = $2 WHERE id = $3",
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
    const { rows } = await pool.query("DELETE FROM emails WHERE id = $1", [id]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export const updateIsSend = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { send } = req.body;

  try {
    const { rows } = await pool.query(
      "UPDATE emails SET send = $1 WHERE id = $2",
      [send, id]
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
