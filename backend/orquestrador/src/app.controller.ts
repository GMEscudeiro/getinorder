import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('tarefa/cadastro')
  async cadastrarTarefa(@Body() body: any) {
    return this.appService.cadastrarTarefa(body);
  }

  @Get('disciplinas/usuario/:userId')
  async obterDisciplinasProxy(@Param('userId') userId: string) {
    return this.appService.obterDisciplinasProxy(userId);
  }

  @Get('usuarios')
  async obterUsuariosProxy() {
    return this.appService.obterUsuariosProxy();
  }
}
