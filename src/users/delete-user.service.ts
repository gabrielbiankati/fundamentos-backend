import { Injectable, NotFoundException } from "@nestjs/common";
import { UsersRepository } from "./users.repository"; 

interface DeleteUserServiceRequest {
  id: string;
}

@Injectable()
export class DeleteUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
  }: DeleteUserServiceRequest): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    await this.usersRepository.delete(user);
  }
}