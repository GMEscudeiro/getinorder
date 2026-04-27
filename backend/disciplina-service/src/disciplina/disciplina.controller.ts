import { Controller, Get, Param } from '@nestjs/common';
import { DisciplinaService } from './disciplina.service';

@Controller('disciplina')
export class DisciplinaController {
  constructor(private readonly disciplinaService: DisciplinaService) {}

  @Get('usuario/:userId')
  obterDisciplinasDoUsuario(@Param('userId') userId: string) {
    return this.disciplinaService.obterDisciplinasDoUsuario(userId);
  }
}
