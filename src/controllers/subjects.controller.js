import {
  createSubject,
  getAll,
  getById,
  updateSubject,
  deleteSubject,
} from "../repositories/subjects.repository.js";

export const create = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'O campo "name" é obrigatório.' });
  }

  try {
    const subject = await createSubject(req.body);
    res.status(201).send(subject);
  } catch (error) {
    console.error("Error creating subject:", error);
    res.status(400).send(error);
  }
};

export const get = async (req, res) => {
  try {
    const subjects = await getAll();
    res.status(200).send(subjects);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const getSubjectById = async (req, res) => {
  try {
    const subject = await getById(Number(req.params.id));
    res.status(200).send(subject);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const update = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const subject = await updateSubject(Number(id), data);
    res.status(200).send(subject);
  } catch (error) {
    console.error("Error updating subject:", error);
    res.status(400).send(error);
  }
};

export const deleteSubjectById = async (req, res) => {
  try {
    await deleteSubject(Number(req.params.id));
    res.status(204).send({ message: "Subject deleted successfully" });
  } catch (e) {
    res.status(400).send(e);
  }
};
