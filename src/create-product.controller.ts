import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { ZodValidationPipe } from "./pipes/zod-validation-pipe";
import { z } from "zod";
import { isValidCPF } from "./app.controller";
import { CreateProductService } from "./create-product.service";

const createProductBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  inStock: z.number(),
  isAvailable: z.boolean(),
  category: z.enum(["ELECTRONICS", "FASHION", "FOOD", "MATERIAL"]),
  tags: z.array(z.string()),
});

const bodyValidationPipe = new ZodValidationPipe(createProductBodySchema);
type CreateProductBodySchema = z.infer<typeof createProductBodySchema>;

@Controller('/products')
export class CreateProductController {
    constructor(private createProduct: CreateProductService) {}

    @Post()
    @HttpCode(201)
    async handle(@Body(bodyValidationPipe) body: CreateProductBodySchema) {
      const {
        name,
        description,
        price,
        inStock,
        isAvailable,
        category,
        tags,
      } = body

      const product = await this.createProduct.execute({
        name,
        description,
        price,
        inStock,
        isAvailable,
        category,
        tags,
      });

      return {product};
    }
}