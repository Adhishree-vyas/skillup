import { getById, createRecord, updateRecord } from "../utils/prismautill.js";
import { Response } from "../utils/response.js";
import { registerSchema } from "../validators/users.validator.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";
import { json } from "express";

export const getUserById = async (req, res) => {
  try {
    console.log(req.user, "user data");
    const id = req.user?.id;
    const user = await getById("user", id);

    if (!user) {
      console.log("user does not exist");
      return Response(req, res, false, 404, null, "user not found", null);
    }
    console.log("user exist");
    return Response(req, res, true, 200, user, "success", null);
  } catch (error) {
    // res.status(500).json({ message: "Error", error });
    return Response(req, res, false, 500, null, " something went wrong", error);
  }

  //const hash = await hashedPassword(password);
};

export const createUser = async (req, res) => {
  try {
    const payload = req.body; // {name, email, password, role}
    const existingUser = await getById("user", `email='${payload.email}'`);

    if (existingUser.length > 0) {
      return Response(req, res, false, 400, null, "Email already exists", null);
    }
    payload.password = await hashPassword(payload.password);

    const result = await createRecord("user", payload);
    return Response(
      req,
      res,
      true,
      200,
      null,
      "user registered successfully",
      null
    );
  } catch (error) {
    console.log(error);
    return Response(req, res, false, 500, null, " something went wrong", error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await getById("user", `email='${email}'`);

    if (user.length === 0) {
      return Response(req, res, false, 400, null, "user does not exist", null);
    }

    const foundUser = user[0];

    const isMatch = await comparePassword(password, foundUser.password);
    if (!isMatch) {
      return Response(req, res, false, 400, null, "Invalid password", null);
    }

    const token = generateToken({
      id: foundUser.id,
      email: foundUser.email,
      role: foundUser.role,
    });

    return Response(req, res, true, 200, { token }, "Login successful", null);
  } catch (error) {
    console.log(error);
    return Response(req, res, false, 500, null, "Something went wrong", error);
  }
};
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware
    const { name, password } = req.body;

    //  Build update payload (only name & password allowed
    const payload = {};

    if (name) payload.name = name;
    if (password) {
      payload.password = await hashPassword(password);

      await updateRecord("user", payload, `id=${userId}`);
    }

    return Response(
      req,
      res,
      true,
      200,
      null,
      "Profile updated successfully",
      null
    );
  } catch (error) {
    console.log(error);
    return Response(req, res, false, 500, null, "Something went wrong", error);
  }
};
