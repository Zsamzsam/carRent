import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiService } from './api.service';
import { CreateApiDto } from './dto/create-api.dto';
import { UpdateApiDto } from './dto/update-api.dto';

@Controller('api/cars')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post()
  create(@Body() createApiDto: CreateApiDto) {
    return this.apiService.create(createApiDto);
  }

  
  @Post(":id/rent")
  createRent(@Param("id") id:string){
    return this.apiService.rent(+id);
  }

  @Get()
  findAll() {
    return this.apiService.findAll();
  }


}
