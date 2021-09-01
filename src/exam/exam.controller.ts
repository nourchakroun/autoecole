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
    Delete,
   
  } from '@nestjs/common';
  import { ExamService } from './exam.service';
  import { Exam } from './entity/exam.entity';
  import { Observable} from 'rxjs';
@Controller('exam')
export class ExamController {
constructor(private readonly examService:ExamService) {}
@Post('addexam')
async addexam(
    @Body('type') type: number,
    @Body('date') date: Date,
    @Body('duration') duration:number,
    @Body('monitorCin')monitorCin:string,)

{
    return this.examService.create({
       type,date,duration,monitorCin});
    }

    @Get('/')
    async getAllQuestion(): Promise<Exam[]> {
      return await this.examService.getAllExam();
    }
  
      @Get('/:id')
    async getQuestionById(@Param('id', ParseIntPipe) id: number): Promise<Exam> {
      return await this.examService.getExamById(id);
    }
  
    @Delete(':id')
      async deleteOne(@Param('id', ParseIntPipe) id: number): Promise<Exam> {
          return await this.examService.deleteOne(Number(id));
      }
  }

