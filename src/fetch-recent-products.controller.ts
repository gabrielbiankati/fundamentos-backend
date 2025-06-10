import { Controller, Get, HttpCode } from "@nestjs/common";
import { FetchRecentProductService } from "./fetch-recent-product.service";

@Controller("/products")
export class FetchRecentProductController {
  constructor(private fetchRecentProduct: FetchRecentProductService) {}

  @Get("/recent")
  @HttpCode(200)
  async handle() {
    const { products } = await this.fetchRecentProduct.execute();
    return { products };
  }
}
