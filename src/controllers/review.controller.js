import {
  createRecord,
  getRecord,
  updateRecord,
  deleteRecord,
  getfirst,
} from "../utils/prisma_query.js";
import { Response } from "../utils/response.js";

//const prisma = new PrismaClient();

export const addReview = async (req, res) => {
  try {
    const { courseId, rating, comment } = req.body;
    const studentId = req.user?.id;
    const role = req.user.role;

    if (role !== "Student") {
      return Response(
        req,
        res,
        false,
        401,
        null,
        "Only students can add reviews",
        null
      );
    }
    const isEnrolled = await getfirst("reviews", { courseId, studentId });

    if (!isEnrolled) {
      return Response(
        req,
        res,
        false,
        403,
        null,
        "You are not enrolled in this course",
        null
      );
    }

    // Create review payload
    const payload = {
      courseId,
      studentId,
      rating,
      comment,
    };

    await createRecord("reviews", payload);

    return Response(
      req,
      res,
      true,
      201,
      null,
      "Review added successfully",
      null
    );
  } catch (error) {
    console.log("Add Review Error:", error);
    return Response(req, res, false, 500, null, "Something went wrong", error);
  }
};
export const getCourseReviews = async (req, res) => {
  try {
    const { courseId } = req.params;

    const reviews = await getRecord("reviews", { courseId });

    return Response(
      req,
      res,
      true,
      200,
      reviews,
      "Reviews fetched successfully",
      null
    );
  } catch (error) {
    console.log("Get Reviews Error:", error);
    return Response(req, res, false, 500, null, "Something went wrong", error);
  }
};

export const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    const studentId = req.user?.id;
    const role = req.user.role;

    if (role !== "Student") {
      return Response(
        req,
        res,
        false,
        401,
        null,
        "Only students can update reviews",
        null
      );
    }
    const review = await getfirst("reviews", { reviewId, studentId });

    if (!review) {
      return Response(
        req,
        res,
        false,
        403,
        null,
        "You are not authorized to update this review",
        null
      );
    }

    // Build update payload
    const payload = {};
    if (rating) payload.rating = rating;
    if (comment) payload.comment = comment;
    await prisma.reviews.update({
      where: {
        id: Number(reviewId),
      },
      data: payload,
    });

    return Response(
      req,
      res,
      true,
      200,
      null,
      "Review updated successfully",
      null
    );
  } catch (error) {
    console.log("Update Review Error:", error);
    return Response(req, res, false, 500, null, "Something went wrong", error);
  }
};

export const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params?.id;
    const studentId = req.user?.id;

    const role = req.user.role;

    if (role !== "Student") {
      return Response(
        req,
        res,
        false,
        401,
        null,
        "Only students can delete reviews",
        null
      );
    }
    const review = await getfirst("review", { reviewId, studentId });

    if (!review) {
      return Response(
        req,
        res,
        false,
        403,
        null,
        "You are not authorized to delete this review",
        null
      );
    }
    await deleteRecord("reviews", reviewId);

    return Response(
      req,
      res,
      true,
      200,
      null,
      "Review deleted successfully",
      null
    );
  } catch (error) {
    console.log("Delete Review Error:", error);
    return Response(req, res, false, 500, null, "Something went wrong", error);
  }
};
