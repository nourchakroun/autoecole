import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './entity/session.entity';
import { Observable, from, throwError } from 'rxjs';
import { switchMap, map, catchError} from 'rxjs/operators';


@Injectable()
export class SessionService {
    constructor(
        @InjectRepository(Session) private readonly sessionRepository: Repository<Session>,
      ) {}
      async create(data: any): Promise<Session> {
        return this.sessionRepository.save(data);
      }
    
      async findOne(condition: any): Promise<Session> {
        return this.sessionRepository.findOne(condition);
      }
    
      async getAllSession(): Promise<Session[]> {
        return await this.sessionRepository
        .createQueryBuilder('c')
        .getMany();
      }
    
      async getSessionById(id: number): Promise<Session> {
        return await this.sessionRepository.findOne(id);
      }
    
      async deleteOne(id: number): Promise<any> {
        return await (this.sessionRepository.delete(id));
    }
    
    }

