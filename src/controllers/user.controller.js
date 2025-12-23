import {
  getRecord,
  createRecord,
  updateRecord,
} from "../utils/prisma_query.js";
import { Response } from "../utils/response.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";
import { sendWelcomeEmail } from "../utils/email.js";

export const getUserById = async (req, res) => {
  try {
    const id = req.user?.id;
    const user = await getRecord("user", { id });

    if (!user) {
      return Response(req, res, false, 404, null, "user not found", null);
    }
    return Response(req, res, true, 200, user, "success", null);
  } catch (error) {
    console.log("Error--->", error);
    return Response(req, res, false, 500, null, " something went wrong", error);
  }
};

export const createUser = async (req, res) => {
  try {
    const payload = req.body;
    const email = payload?.email;
    const existingUser = await getRecord("user", { email });

    console.log(existingUser, "existingUser");
    if (existingUser) {
      return Response(
        req,
        res,
        false,
        400,
        null,
        "email alredy registerd",
        null
      );
    }

    payload.password = await hashPassword(payload.password);

    const result = await createRecord("user", payload);
    await sendWelcomeEmail(email, payload.name);

    return Response(
      req,
      res,
      true,
      200,
      null,
      "user registered successfully & welcome email is sent",
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

    const user = await getRecord("user", { email });
    if (!user) {
      return Response(req, res, false, 404, null, "user does not exist", null);
    }

    const isMatch = await comparePassword(password, user?.password);
    if (!isMatch) {
      return Response(req, res, false, 401, null, "Invalid password", null);
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return Response(req, res, true, 200, { token }, "Login successful", null);
  } catch (error) {
    console.log("Error--->", error);
    return Response(req, res, false, 500, null, "Something went wrong", error);
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, password } = req.body;

    const payload = {};

    if (name) payload.name = name;
    if (password) payload.password = await hashPassword(password);
    if (req.file) {
      payload.profileImage = `uploads/${req.file.filename}`;
      console.log(req.file);
      //console.log("Stored path:", payload.profileImage);
    }
    if (Object.keys(payload).length === 0) {
      return Response(req, res, false, 400, null, "Nothing to update", null);
    }
    await updateRecord("user", userId, payload);
    console.log("Stored path:", payload.profileImage);

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
    console.log("Error--->", error);
    return Response(req, res, false, 500, null, "Something went wrong", error);
  }
};
