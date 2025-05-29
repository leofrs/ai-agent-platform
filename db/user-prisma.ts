import { prisma } from "./prisma-config";

export interface IRegister {
  name: string;
  email: string;
  password: string;
}

class UserPrisma {
  async register(data: IRegister): Promise<string> {
    try {
      const user = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
        },
      });

      if (!user) {
        return "User not created";
      }

      return "User created";
    } catch (error) {
      console.error("Error found at create user", error);
      return "User not created by internal error";
    }
  }

  async findByEmail(email: string): Promise<string> {
    try {
      const user = await prisma.user.findFirst({
        where: {
          email: email,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
      if (!user) {
        return "User not found";
      }
      return "user was created";
    } catch (error) {
      console.error("Error found at login user", error);
      return "Search user by email not found by internal error";
    }
  }
}

export default new UserPrisma();
