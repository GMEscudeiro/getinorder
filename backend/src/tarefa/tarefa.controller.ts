import { Body, Controller, Get, Post } from '@nestjs/common';
import { TarefaService } from './tarefa.service';

@Controller('tarefa')
export class TarefaController {
  constructor(private readonly tarefaService: TarefaService) { }

  @Post('cadastrar')
  cadastrar(@Body() dados: any) {
    return this.tarefaService.cadastrarTarefa(dados);
  }

  @Get()
  listarTodas() {
    return this.tarefaService.obterTodasTarefas();
  }
}
