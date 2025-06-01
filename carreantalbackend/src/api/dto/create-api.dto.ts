import { IsNumber, IsString, Min} from "class-validator"

export class CreateApiDto {
    @IsString()
    license_plate_number: string
    @IsString()
    brand: string
    @IsString()
    model: string
    @IsNumber()
    @Min(0)
    daily_cost: number
}
