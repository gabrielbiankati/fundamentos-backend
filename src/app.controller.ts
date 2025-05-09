import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, Req } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from './pipes/zod-validation-pipe';

export function isValidCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g, '');

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += +cpf.charAt(i) * (10 - i);
  let rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== +cpf.charAt(9)) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += +cpf.charAt(i) * (11 - i);
  rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  return rev === +cpf.charAt(10);
}

enum Status {
  APROVADO = 'APROVADO',
  NEGADO = 'NEGADO',
  PENDENTE = 'PENDENTE'
}

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

const bodyValidationPipe = new ZodValidationPipe(createProductBodySchema); //instacia utilizando classe, utilizando o schema criado anteriormente
type CreateProductBodySchema = z.infer<typeof createProductBodySchema>; //infer vai ser do tipo do esquema, permitindo que o body acesse da forma correta

const updateProductBodySchema = z.object({
  name: z.string().min(3).optional(),
  model: z.string().min(3).optional(),
  dateManufacture: z.string().date().optional(),
  year: z.number().min(4).optional(),
  brand: z.string().min(3).optional(),
  email: z.string().email().optional(),
  cpf: z.string()
  .regex(/^\d{11}$/, {
    message: "CPF deve conter exatamente 11 dígitos numéricos",
  })
  .refine(isValidCPF, {
    message: "CPF Invalid",
  }),
});


const updateBodyValidationPipe = new ZodValidationPipe(updateProductBodySchema); //instacia utilizando classe, utilizando o schema criado anteriormente
type UpdateProductBodySchema = z.infer<typeof updateProductBodySchema>; //infer vai ser do tipo do esquema, permitindo que o body acesse da forma correta

const updateStatusBodyProductBodySchema = z.object({
  status: z.enum([Status.APROVADO, Status.NEGADO], {
    message: "Status must be 'APROVADO' or 'NEGADO ",
  }),
});

const updateStatusBodyValidationPipe = new ZodValidationPipe(updateStatusBodyProductBodySchema); //instacia utilizando classe, utilizando o schema criado anteriormente
type UpdateStatusProductBodySchema = z.infer<typeof updateStatusBodyProductBodySchema>; //infer vai ser do tipo do esquema, permitindo que o body acesse da forma correta


@Controller('/products')
export class AppController {
  private products: any[] = [];

  constructor() {}

  @Post()
  @HttpCode(201) // Anotação para o erro
  create(@Body(bodyValidationPipe) body: CreateProductBodySchema) {
    return 'create';
  }

  @Get(':id')
  @HttpCode(200)
  findById(@Param('id') id: string) {
    return 'produtos';
  }

  @Put(':id')
  @HttpCode(204)
  update(
  @Param('id') id : string,
  @Body(updateBodyValidationPipe) body: UpdateProductBodySchema) {

  }

  @Patch(':id/status')
  @HttpCode(204)
  updateStatus(@Param('id') id: string, 
  @Body(updateStatusBodyValidationPipe) body: UpdateStatusProductBodySchema) {

  }

  @Delete(':id')
  @HttpCode(200)
  remove(@Param('id') id: string) {

  }


}
