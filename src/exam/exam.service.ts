import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exam } from './entity/exam.entity';
import { Observable, from, throwError } from 'rxjs';
import { switchMap, map, catchError} from 'rxjs/operators';

@Injectable()
export class ExamService {
    constructor(
    @InjectRepository(Exam) private readonly examRepository: Repository<Exam>,
  ) {}
  async create(data: any): Promise<Exam> {
    return this.examRepository.save(data);
  }

  async findOne(condition: any): Promise<Exam> {
    return this.examRepository.findOne(condition);
  }

  async getAllExam(): Promise<Exam[]> {
    return await this.examRepository
    .createQueryBuilder('c')
    .getMany();
  }

  async getExamById(id: number): Promise<Exam> {
    return await this.examRepository.findOne(id);
  }

  async deleteOne(id: number): Promise<any> {
    return await (this.examRepository.delete(id));
}

}

