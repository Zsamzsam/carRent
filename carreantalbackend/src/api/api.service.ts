import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateApiDto } from './dto/create-api.dto';
import { UpdateApiDto } from './dto/update-api.dto';
import { PrismaService } from 'src/prisma.service';
import { cars, rentals } from '@prisma/client';
import { throwError } from 'rxjs';

@Injectable()
export class ApiService {

  constructor(private readonly db: PrismaService){

  } 

  create(createApiDto: CreateApiDto) {
    return this.db.cars.create({
      data:{
        ...createApiDto,
        created_at: new Date(Date.now()) 
      },
      select:{
        id: true,
        license_plate_number: true,
        brand: true,
        model: true,
        daily_cost: true,
        created_at: false,
        updated_at: false,
    }});
  }

  findAll() {
    return this.db.cars.findMany({
      select:{
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


  async rent(id: number){
    const cars: cars = await this.db.cars.findUnique({
      where: {
        id: id
      }
    });

    if(cars == null){
      throw new NotFoundException();
    }

    const rentals : rentals[] = await this.db.rentals.findMany({
      where:{
        car_id: id
      }
    });

    const now = new Date(Date.now());
    rentals.forEach(function(rent){
      if(now >= rent.strat_date && now <= rent.end_date){
        throw new ConflictException();
      }
    })
  
    return this.db.rentals.create({
      data:{
        cars:{
          connect:{
            id:id
          }
        },
        strat_date: new Date(Date.now()),
        end_date: new Date(Date.now() + (1000 * 60 * 60 * 24 * 7))
      }
    })
  }
}
