import { Injectable, NotFoundException } from "@nestjs/common";
import { ProfilesRepository } from "./profiles.repository"; 

export interface Profile {
  id: string;
  userId: string;
  avatarUrl?: string;
}

interface GetProfileByIdServiceRequest {
  id: string;
}

interface GetProfileByIdServiceResponse {
  profile: Profile;
}

@Injectable()
export class GetProfileByIdService {
  constructor(private profilesRepository: ProfilesRepository) {}

  async execute({
    id,
  }: GetProfileByIdServiceRequest): Promise<GetProfileByIdServiceResponse> {
    const profile = await this.profilesRepository.findById(id);

    if (!profile) {
      throw new NotFoundException("Profile not found.");
    }

    const newProfile = {
      id: profile.id,
      userId: profile.userId,
      avatarUrl: profile.avatarUrl,
      user: profile.user,
    };
    return { profile: newProfile };
  }
}