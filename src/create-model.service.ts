import { Injectable } from "@nestjs/common";
import {ModelsRepository } from "./models.repository"

export interface Model {
  id: string;
  name: string;
  createdAt: string | Date | undefined;
  updatedAt: string | Date | null | undefined;
}

interface CreateModeltServiceRequest {
  name: string;
}

type CreateModelServiceResponse = {
  model: Model;
};

@Injectable()
export class CreateModelService {
  constructor(private modelsRepository: ModelsRepository) {}

  async execute({
    name
  }: CreateModeltServiceRequest): Promise<CreateModelServiceResponse> {
  const modelWithSameName = await this.modelsRepository.findByName(name);

  if (modelWithSameName) {
    throw new Error("Model already exists");
  }

  const model = {
    name
  }

  const newModel = await this.modelsRepository.create(model)

    return {
      model: {
        id: newModel.id?.toString() || "",
        name,
        createdAt: newModel.createdAt,
        updatedAt: newModel.updatedAt
      }
    }
  }
}