import { Module } from '@nestjs/common';
import { TarefaController } from './tarefa.controller';
import { TarefaService } from './tarefa.service';
import { DisciplinaModule } from 'src/disciplina/disciplina.module';

@Module({
  imports: [DisciplinaModule],
  controllers: [TarefaController],
  providers: [TarefaService]
})
export class TarefaModule { }
