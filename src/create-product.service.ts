// SERVICE OR USECASE

import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

interface Product {
    name: string,
    model: string,
    dateManufacture: string,
    year: string,
    brand: string,
    email: string,
    cpf: string
}

interface CreateProductServiceRequest {
    name: string,
    model: string,
    dateManufacture: string,
    year: string,
    brand: string,
    email: string,
    cpf: string
}

type CreateProductServiceResponse = {
    product: CreateProductService;
}

@Injectable()
export class CreateProductService {
    constructor(private prisma: PrismaService) { }

    async execute({
        name,
        model,
        dateManufacture,
        year,
        brand,
        email,
        cpf

    }: CreateProductServiceRequest): Promise<CreateProductServiceResponse> {

        return new Promise(() => {});

    }
}