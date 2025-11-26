import { Response } from "../utils/response.js";
import { createRecord, updateRecord } from "../utils/dbdriver.js";
import { validate } from "../middleware/custom.middleware.js";

import { createCourseValidator } from "../validators/course.validator.js";
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
    const instructorId = req.user.id; // from auth middleware
    const courseId = req.params.id; // from auth middleware

    const { title, description, price, category } = req.body;

    //  Build update payload (only name & password allowed
    const payload = {};

    if (title) payload.title = title;
    if (description) payload.description = description;
    if (price) payload.price = price;
    if (category) payload.category = category;
    //await updateRecord("courses", payload, `id=${instructorId.Id}`);

    await updateRecord("courses", payload, "id = ? AND instructor_id = ?", [
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
