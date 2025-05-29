import bcrypt from "bcrypt";

const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
};

const comparePassword = async (
  password: string,
  hashPassword: string
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(password, hashPassword);
  return isMatch;
};

export { hashPassword, comparePassword };
