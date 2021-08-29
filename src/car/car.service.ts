import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './entity/car.entity';
import { Observable, from, throwError } from 'rxjs';
import { switchMap, map, catchError} from 'rxjs/operators';

@Injectable()
export class CarService {

  constructor(
    @InjectRepository(Car) private readonly carRepository: Repository<Car>,
  ) {}
  async create(data: any): Promise<Car> {
    return this.carRepository.save(data);
  }

  async findOne(condition: any): Promise<Car> {
    return this.carRepository.findOne(condition);
  }

  async getAllCar(): Promise<Car[]> {
    return await this.carRepository
    .createQueryBuilder('c')
    .getMany();
  }

  async getCarById(id: number): Promise<Car> {
    return await this.carRepository.findOne(id);
  }

  async deleteOne(id: number): Promise<any> {
    return await (this.carRepository.delete(id));
}

 /*updateOne(id: number, car: Car): Observable<Car> {
  delete car.carcolor;
  delete car.registrationNb;
  delete car.brand;

  return from(this.carRepository.update(id, car)).pipe(
      switchMap(() => this.findOne(id))
  );
}*/

}


