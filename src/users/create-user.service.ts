import { Injectable } from "@nestjs/common";
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
    await this.usersRepository.create({ email })
  }
}