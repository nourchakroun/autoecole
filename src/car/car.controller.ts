
import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Put,
    Post,
    ParseIntPipe,
    UsePipes,
    ValidationPipe,
    HttpCode,
    Param,
    Delete
  } from '@nestjs/common';
  import { CarService } from './car.service';
  import { Car } from './entity/car.entity';
  import { Observable} from 'rxjs';
  


@Controller('car')
export class CarController {
constructor(private readonly carService:CarService) {}
 /*@Get("/")
  getCars(): string {
    return "cars";
  }*/
@Post('addcar')
async addcar(
  @Body('carcolor') carcolor: string,
  @Body('registrationNb') registrationNb: string,
  @Body('brand') brand: string,
  
) {
    return this.carService.create({
        carcolor,
        registrationNb,
        brand });
    }

    
@Get('/')
  async getAllCar(): Promise<Car[]> {
    return await this.carService.getAllCar();
  }

    @Get('/:id')
  async getCarById(@Param('id', ParseIntPipe) id: number): Promise<Car> {
    return await this.carService.getCarById(id);
  }

  @Delete(':id')
    async deleteOne(@Param('id', ParseIntPipe) id: number): Promise<Car> {
        return await this.carService.deleteOne(Number(id));
    }

    /*@Put(':id')
    updateOne(@Param('id',ParseIntPipe) id: number, @Body() car: Car): Observable<Car> {
        return this.carService.updateOne(Number(id), car);
    }*/
}


  

