import { Module } from '@nestjs/common';
import { DisciplinaController } from './disciplina.controller';
import { DisciplinaService } from './disciplina.service';
import { IDisciplinaService } from './interfaces/disciplina.interface';

@Module({
  controllers: [DisciplinaController],
  providers: [{
    provide: IDisciplinaService,
    useClass: DisciplinaService
  }],
  exports: [IDisciplinaService]
})
export class DisciplinaModule { }
