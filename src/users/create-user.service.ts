import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";  

interface CreateUserServiceRequest {
  email: string;
}

@Injectable()
export class CreateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
  }: CreateUserServiceRequest): Promise<void> {
    const userWithSameName = await this.usersRepository.findByEmail(email);

    if (userWithSameName) {
      throw new BadRequestException("User with this email already exists.");
    }

    await this.usersRepository.create({ email })
  }
}