import { CreateApiDto } from './dto/create-api.dto';
import { PrismaService } from 'src/prisma.service';
export declare class ApiService {
    private readonly db;
    constructor(db: PrismaService);
    create(createApiDto: CreateApiDto): import(".prisma/client").Prisma.Prisma__carsClient<{
        id: number;
        license_plate_number: string;
        brand: string;
        model: string;
        daily_cost: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        license_plate_number: string;
        brand: string;
        model: string;
        daily_cost: number;
    }[]>;
    rent(id: number): Promise<{
        id: number;
        car_id: number;
        strat_date: Date;
        end_date: Date;
    }>;
}
