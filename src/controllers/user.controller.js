import { getById, createRecord } from "../utils/dbdriver.js";
import { Response } from "../utils/response.js";
import { registerSchema } from "../validators/users.validator.js";
import { hashPassword } from "../utils/bcrypt.js";

export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await getById("user", id);

    if (!user) {
      console.log("user does not exist");
      return Response(req, res, false, 404, null, "user not found", null);
    }
    console.log("user exist");
    return Response(req, res, true, 200, user, "success", null);
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }

  const hashedPassword = await hashedPassword(password);
};

export const createUser = async (req, res) => {
  try {
    const payload = req.body; // {name, email, password, role}
    const result = await createRecord("user", payload);
    console.log("user registered");

    return res
      .status(201)
      .json({ message: "User registered successfully", data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
