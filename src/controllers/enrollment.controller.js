import { Response } from "../utils/response.js";

import { createRecord, getAll, findRecord } from "../utils/dbdriver.js";
export const studentEnroll = async (req, res) => {
  try {
    const role = req.user.role;
    if (role !== "Student") {
      return Response(
        req,
        res,
        false,
        401,
        null,
        "Please login with a student account",
        null
      );
    }
    const studentId = req.user.id;
    const { courseId } = req.body;
    const existingUser = await findRecord(
      "enrollments",
      `studentId='${studentId}' AND courseId='${courseId}'`
    );
    if (existingUser.length > 0) {
      return Response(
        req,
        res,
        false,
        400,
        null,
        "student already enrolled in this course",
        null
      );
    }

    const payload = {
      studentId,
      courseId,
    };

    const result = await createRecord("enrollments", payload);

    return Response(
      req,
      res,
      true,
      201,
      result,
      "Student enrolled successfully",
      null
    );
  } catch (error) {
    console.log(error);
    return Response(req, res, false, 500, null, "Something went wrong", error);
  }
};
export const myAllCourse = async (req, res) => {
  try {
    const studentId = req.user.id;

    const enrollments = await getAll(
      "enrollments",
      `student_id='${studentId}'`
    );
    if (!enrollments || enrollments.length === 0) {
      return Response(
        req,
        res,
        true,
        200,
        "You have not enrolled in any courses",
        null
      );
    }
  } catch (error) {
    console.log(error);
    return Response(req, res, false, 500, null, "Something went wrong", error);
  }
};
export const instructorViewCourse = async (req, res) => {
  try {
    const role = req.user.role;
    const instructorId = req.user.id;

    if (role !== "instructor") {
      return Response(
        req,
        res,
        false,
        401,
        null,
        "Please login with an instructor account",
        null
      );
    }
    const course = await getAll("courses", `instructor_id='${instructorId}'`);

    if (!course || course.length === 0) {
      return Response(
        req,
        res,
        true,
        200,
        "You have not created any course yet",
        null
      );
    }
    const enrollments = await getAll(
      "enrollments",
      `course_id='${course[0].id}'`
    );

    return Response(
      req,
      res,
      true,
      200,
      enrollments,
      "Enrolled students",
      null
    );
  } catch (error) {
    console.log(error);
    return Response(req, res, false, 500, null, "Something went wrong", error);
  }
};
