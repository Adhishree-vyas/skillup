import bcrypt from "bcrypt";

// Password Hash Function
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
