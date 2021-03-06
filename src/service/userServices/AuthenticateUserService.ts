import { compare } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../../repositories/UsersRepositories";
import { sign } from "jsonwebtoken";
interface IAuthenticateRequest {
  email: string;
  password: string;
}

export class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);
    const user = await usersRepositories.findOne({ email });

    if (!user || !(password == user.password)) {
      throw new Error("Email/Password incorrect");
    }
    const token = sign(
      {
        userId: user.id,
      },
      "c4091bafbf665a34dadb0123c261f84b",
      {
        expiresIn: "1d",
        subject: user.id,
      }
    );

    return token;
  }
}
