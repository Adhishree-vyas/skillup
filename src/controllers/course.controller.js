import { Response } from "../utils/response.js";
import { createRecord, updateRecord, deleteById } from "../utils/dbdriver.js";

export const createCourse = async (req, res) => {
  try {
    const role = req.user.role;
    console.log(role);
    if (role !== "Instructor") {
      return Response(
        req,
        res,
        false,
        401,
        null,
        "pls login with instructor",
        null
      );
    }

    const instructorId = req.user.id; // instructor ID from auth middleware
    const { title, description, price } = req.body;

    // Build payload
    const payload = {
      title,
      description,
      price,
      instructorId,
    };

    // Insert into DB
    const result = await createRecord("courses", payload);

    return Response(
      req,
      res,
      true,
      201,
      result,
      "Course created successfully",
      null
    );
  } catch (error) {
    console.log(error);
    return Response(req, res, false, 500, null, "Something went wrong", error);
  }
};

export const updateCourse = async (req, res) => {
  try {
    const role = req.user.role;
    if (role !== "Instructor") {
      return Response(
        req,
        res,
        false,
        401,
        null,
        "pls login with instructor",
        null
      );
    }
    const instructorId = req.user?.id;
    const courseId = req.params?.id;

    const { title, description, price, category } = req.body;

    const payload = {};

    if (title) payload.title = title;
    if (description) payload.description = description;
    if (price) payload.price = price;
    if (category) payload.category = category;

    await updateRecord("courses", payload, "id = ? AND instructorId = ?", [
      courseId,
      instructorId,
    ]);
  
    return Response(
      req,
      res,
      true,
      200,
      null,
      "course updated successfully",
      null
    );
  } catch (error) {
    console.log(error);
    return Response(req, res, false, 500, null, "Something went wrong", error);
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const role = req.user.role;
    if (role !== "Instructor") {
      return Response(
        req,
        res,
        false,
        401,
        null,
        "pls login with instructor",
        null
      );
    }
 
    const courseId = req.params?.id;
    await deleteById("courses", courseId);
   

    return Response(
      req,
      res,
      true,
      200,
      null,
      "course deleted successfully",
      null
    );
  } catch (error) {
    console.log(error);
    return Response(req, res, false, 500, null, "Something went wrong", error);
  }
};
