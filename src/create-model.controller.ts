import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { ZodValidationPipe } from "./pipes/zod-validation-pipe";
import { CreateModelService } from "./create-model.service";
import { z } from "zod";

const createModelBodySchema = z.object({
  name: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(createModelBodySchema);

type createModelBodySchema = z.infer<typeof createModelBodySchema>;

@Controller("/models")
export class CreateModelController {
  constructor(private createModel: CreateModelService) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(bodyValidationPipe) body: createModelBodySchema) {
    const { 
      name
    } = body;

    const model = await this.createModel.execute({
      name
    });

    return {
      model
    };
  }
}