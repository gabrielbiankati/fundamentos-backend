import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { Category } from "@prisma/client";

export interface Product {
    id: string;
    name: string;
    description?: string | null;
    price: number;
    inStock: number;
    isAvailable: boolean;
    category: Category;
    tags: string[];
    createdAt: string | Date | null | undefined;
    updatedAt: string | Date | null | undefined;
}

type FetchRecentProductServiceResponse = {
    products: Product[];
};

@Injectable()
export class FetchRecentProductService {
    constructor(private productRepository: ProductsRepository) {}

    async execute(): Promise<FetchRecentProductServiceResponse> {
        const products = await this.productRepository.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

        const formattedProducts: Product[] = products.map((product) => ({
            id: product.id?.toString() || "",
            name: product.name,
            description: product.description,
            price: product.price,
            inStock: product.inStock,
            isAvailable: product.isAvailable,
            category: product.category,
            tags: product.tags,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        }));

        return {
            products: formattedProducts,
        };
    }
}
