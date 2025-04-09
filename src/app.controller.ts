import { Body, Controller, Post } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from './pipes/zod-validation-pipe';

const createProductBodySchema = z.object({
  name: z.string().min(3),
  model: z.string().min(3),
  dateManufacture: z.string().date(),
  year: z.number().min(4),
  brand: z.string().min(3),
  email: z.string().email(),
  cpf: z.string().regex(/^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/, "CPF INVALID"),
});

const bodyValidationPipe = new ZodValidationPipe(createProductBodySchema); //instacia utilizando classe, utilizando o schema criado anteriormente

type CreateProductBodySchema = z.infer<typeof createProductBodySchema>; //infer vai ser do tipo do esquema, permitindo que o body acesse da forma correta

@Controller('/products')
export class AppController {
  constructor() {}

  @Post()
  create(@Body(bodyValidationPipe) body: CreateProductBodySchema): string {
    return 'create';
  }
}
