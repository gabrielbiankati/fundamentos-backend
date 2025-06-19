import { Injectable, NotFoundException } from "@nestjs/common";
import { UsersRepository } from "./users.repository";

export interface User {
  id: string;
  email: string;
  createdAt: string | Date | undefined;
  updatedAt: string | Date | null | undefined;
}

type FetchRecentUsersServiceResponse = {
  users: User[];
}

@Injectable()
export class FetchRecentUsersService {
  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<FetchRecentUsersServiceResponse> {
    const users = await this.usersRepository.findManyRecent();

    const newUsers: User[] = [];

    if (!users) {
      throw new NotFoundException("User not found");
    }

    for (const u of users) {
      newUsers.push({
        id: u.id?.toString() || "",
        email: u.email,
        createdAt: u.createdAt,
        updatedAt: u.updatedAt
      });
    }

    return {
      users: newUsers
    };
  }
}