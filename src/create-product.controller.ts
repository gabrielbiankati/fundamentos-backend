import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { ZodValidationPipe } from "./pipes/zod-validation-pipe";
import { z } from "zod";
import { isValidCPF } from "./app.controller";

const createProductBodySchema = z.object({
  name: z.string().min(3),
  model: z.string().min(3),
  dateManufacture: z.string().date(),
  year: z.number().min(4),
  brand: z.string().min(3),
  email: z.string().email(),
  cpf: z.string()
  .regex(/^\d{11}$/, {
    message: "CPF deve conter exatamente 11 dígitos numéricos",
  })
  .refine(isValidCPF, {
    message: "CPF Invalid",
  }),
});

const bodyValidationPipe = new ZodValidationPipe(createProductBodySchema);
type CreateProductBodySchema = z.infer<typeof createProductBodySchema>;

@Controller('/products')
export class CreateProductController {
    constructor() {}

    @Post()
    @HttpCode(201)
    async handle(@Body(bodyValidationPipe) body: CreateProductBodySchema) {

    }
}