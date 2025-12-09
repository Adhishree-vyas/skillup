import { Response } from "../utils/response.js";
import { paginatedResult, applyFilters } from "../utils/pagination.js";
import {
  getAll,
  deleteRecord,
  countUsers,
  countEnrollments,
  countCourses,
} from "../utils/prisma_query.js";

export const viewAllUsers = async (req, res) => {
  try {
    const role = req.user?.role;

    if (role !== "Admin") {
      return Response(
        req,
        res,
        false,
        401,
        null,
        "login with admin role",
        null
      );
    }
    const result = await getAll("users");

    const { page, perpage } = req.query;

    const filters = {
      name: req.query.name,
      email: req.query.email,
      role: req.query.role,
    };

    const filteredResult = await applyFilters(result, filters);

    const data = await paginatedResult(filteredResult, page, perpage);

    return Response(
      req,
      res,
      true,
      200,
      data,
      "Users fetched successfully",
      null
    );
  } catch (error) {
    console.log(error);
    return Response(req, res, false, 500, null, "Something went wrong", error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const role = req.user.role;

    if (role !== "Admin") {
      return Response(
        req,
        res,
        false,
        401,
        null,
        "You are not authorized",
        null
      );
    }

    const userId = req.params.id;

    await deleteRecord("users", userId);

    return Response(
      req,
      res,
      true,
      200,
      null,
      "User deleted successfully",
      null
    );
  } catch (error) {
    console.log(error);
    return Response(req, res, false, 500, null, "Something went wrong", error);
  }
};

export const deleteCourseAdmin = async (req, res) => {
  try {
    const role = req.user.role;

    if (role !== "Admin") {
      return Response(
        req,
        res,
        false,
        401,
        null,
        "Please login as admin",
        null
      );
    }

    const courseId = req.params.id;

    await deleteRecord("courses", courseId);

    return Response(
      req,
      res,
      true,
      200,
      null,
      "Course deleted successfully",
      null
    );
  } catch (error) {
    console.log(error);
    return Response(req, res, false, 500, null, "Something went wrong", error);
  }
};

export const dashboardSummary = async (req, res) => {
  try {
    const role = req.user?.role;

    if (role !== "Admin") {
      return Response(req, res, 403, false, "Access denied: Admin only");
    }
    const [totalUsers, totalCourses, totalEnrollments] = await Promise.all([
      countUsers(),
      countCourses(),
      countEnrollments(),
    ]);

    return Response(req, res, true, 200, "Dashboard Summary", {
      totalUsers,
      totalCourses,
      totalEnrollments,
    });
  } catch (err) {
    console.log("Dashboard Error:", err);
    return Response(req, res, false, 500, "Internal Server Error", err);
  }
};
