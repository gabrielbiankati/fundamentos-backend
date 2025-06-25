import { Injectable } from "@nestjs/common";
import { Prisma, Profile } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class ProfilesRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<any> {
    return await this.prisma.profile.findUnique({
      where: {
        id
      },
      include: { user: true },
    });
  }

  async create(data: Prisma.ProfileUncheckedCreateInput): Promise<void> {
    await this.prisma.profile.create({
      data,
    });
  }

  async update(id: string, data: Prisma.ProfileUpdateInput): Promise<Profile> {
    return this.prisma.profile.update({
      where: { id },
      data,
    });
  }

  async save(data: Prisma.ProfileUpdateInput): Promise<void> {
    await Promise.all([
      this.prisma.profile.update({
        where: {
          id: data.id?.toString(),
        },
        data,
      }),
    ]);
  }
}