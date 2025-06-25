import { Injectable, NotFoundException } from "@nestjs/common";
import { UsersRepository } from "./users.repository";

interface EditUserServiceRequest {
  id: string;
  email: string;
}

@Injectable()
export class EditUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    id,
  }: EditUserServiceRequest): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    user.email = email;

    await this.usersRepository.save(user);
  }
}