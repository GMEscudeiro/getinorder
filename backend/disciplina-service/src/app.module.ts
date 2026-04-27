import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DisciplinaModule } from './disciplina/disciplina.module';

@Module({
  imports: [DisciplinaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
