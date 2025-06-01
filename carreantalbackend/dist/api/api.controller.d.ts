import { ApiService } from './api.service';
import { CreateApiDto } from './dto/create-api.dto';
export declare class ApiController {
    private readonly apiService;
    constructor(apiService: ApiService);
    create(createApiDto: CreateApiDto): import(".prisma/client").Prisma.Prisma__carsClient<{
        id: number;
        license_plate_number: string;
        brand: string;
        model: string;
        daily_cost: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    createRent(id: string): Promise<{
        id: number;
        car_id: number;
        strat_date: Date;
        end_date: Date;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        license_plate_number: string;
        brand: string;
        model: string;
        daily_cost: number;
    }[]>;
}
