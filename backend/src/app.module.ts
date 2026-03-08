import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DisciplinaModule } from './disciplina/disciplina.module';
import { TarefaModule } from './tarefa/tarefa.module';

@Module({
  imports: [DisciplinaModule, TarefaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
