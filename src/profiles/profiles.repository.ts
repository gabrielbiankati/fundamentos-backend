import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class ProfilesRepository {
  constructor(private prisma: PrismaService) { }

  async findManyRecent(): Promise<Prisma.ProfileUncheckedCreateInput[] | null> {
    return await this.prisma.profile.findMany();
  }

  async findById(id: string): Promise<Prisma.ProfileUncheckedCreateInput | null> {
    return await this.prisma.profile.findUnique({
      where: {
        id,
      }
    });
  }

  async save(data: Prisma.ProfileUncheckedCreateInput): Promise<void> {
    await Promise.all([
      this.prisma.profile.update({
        where: {
          id: data.id?.toString(),
        },
        data,
      }),
    ]);
  }

  async create(data: Prisma.ProfileUncheckedCreateInput): Promise<void> {
    await this.prisma.profile.create({
      data,
    });
  }

  async delete(profile: Prisma.ProfileUncheckedCreateInput): Promise<void> {
    await this.prisma.profile.delete({
      where: {
        id: profile.id?.toString(),
      }
    });
  }
}