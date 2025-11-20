export const Response = (
  req,
  res,
  success = false,
  statusCode = 200,
  data = null,
  message = null,
  error = null
) => {
  return res.status(statusCode).json({
    success: success,
    data: data !== null ? data : null,
    message: message !== null ? message : null,
    error: error !== null ? error : null,
  });
};
