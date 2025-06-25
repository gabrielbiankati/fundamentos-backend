import { Injectable, NotFoundException } from "@nestjs/common";
import { UsersRepository } from "./users.repository"; 
import { Profile } from "@prisma/client";

export interface User {
  id: string;
  email: string;
  profile?: Profile;
  createdAt: string | Date | undefined;
  updatedAt: string | Date | null | undefined;
}

interface GetUserByIdServiceRequest {
  id: string;
}

type GetUserByIdServiceResponse = {
  users: User;
}

@Injectable()
export class GetUserByIdService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
  }: GetUserByIdServiceRequest): Promise<GetUserByIdServiceResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const newUser: User = {
      id: user.id?.toString() || "",
      email: user.email,
      profile: user.profile || undefined,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return {
      users: newUser
    };
  }
}