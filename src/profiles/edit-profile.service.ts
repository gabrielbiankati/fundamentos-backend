import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { ProfilesRepository } from "./profiles.repository";

interface EditProfileServiceRequest {
  id: string;
  avatarUrl: string;
}

@Injectable()
export class EditProfileService {
  constructor(private profilesRepository: ProfilesRepository) {}

  async execute({ id, avatarUrl }: EditProfileServiceRequest): Promise<void> {
    const profile = await this.profilesRepository.findById(id);

    if (!profile) {
      throw new NotFoundException("Profile not found.");
    }

    await this.profilesRepository.save({id,  avatarUrl});
  }
}