"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ApiService = class ApiService {
    constructor(db) {
        this.db = db;
    }
    create(createApiDto) {
        return this.db.cars.create({
            data: {
                ...createApiDto,
                created_at: new Date(Date.now())
            },
            select: {
                id: true,
                license_plate_number: true,
                brand: true,
                model: true,
                daily_cost: true,
                created_at: false,
                updated_at: false,
            }
        });
    }
    findAll() {
        return this.db.cars.findMany({
            select: {
                id: true,
                license_plate_number: true,
                brand: true,
                model: true,
                daily_cost: true,
                created_at: false,
                updated_at: false
            }
        });
    }
    async rent(id) {
        const cars = await this.db.cars.findUnique({
            where: {
                id: id
            }
        });
        if (cars == null) {
            throw new common_1.NotFoundException();
        }
        const rentals = await this.db.rentals.findMany({
            where: {
                car_id: id
            }
        });
        const now = new Date(Date.now());
        rentals.forEach(function (rent) {
            if (now >= rent.strat_date && now <= rent.end_date) {
                throw new common_1.ConflictException();
            }
        });
        return this.db.rentals.create({
            data: {
                cars: {
                    connect: {
                        id: id
                    }
                },
                strat_date: new Date(Date.now()),
                end_date: new Date(Date.now() + (1000 * 60 * 60 * 24 * 7))
            }
        });
    }
};
exports.ApiService = ApiService;
exports.ApiService = ApiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ApiService);
//# sourceMappingURL=api.service.js.map