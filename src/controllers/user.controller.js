import bcrypt from "bcrypt";
import { userSchema } from "../validators/user.validator.js";
import {
  createUser,
  getAll,
  getById,
  updateUser,
  deleteUser,
} from "../repositories/user.repository.js";

export const create = async (req, res) => {
  try {
    await userSchema.validate(req.body);
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashPassword;
    const user = await createUser(req.body);
    res.status(201).send(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(400)
      .json({ error: "Failed to create user", details: error.message });
  }
};

export const get = async (req, res) => {
  try {
    const users = await getAll();
    res.status(200).send(users);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const getId = async (req, res) => {
  try {
    const user = await getById(Number(req.params.id));
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const updateUsr = async (req, res) => {
  try {
    const user = await updateUser(Number(req.params.id), req.body);
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const deleteUserById = async (req, res) => {
  try {
    await deleteUser(Number(req.params.id));
    res.status(204).send();
  } catch (e) {
    res.status(400).send(e);
  }
};
