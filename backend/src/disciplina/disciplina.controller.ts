import { Controller, Get } from '@nestjs/common';
import { IDisciplinaService } from './interfaces/disciplina.interface';


@Controller('disciplina')
export class DisciplinaController {
  constructor(private readonly disciplinaService: IDisciplinaService) { }

  @Get()
  listarTodas() {
    return this.disciplinaService.obterTodasDisciplinas();
  }
}

