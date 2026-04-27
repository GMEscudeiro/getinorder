import { Controller, Get } from '@nestjs/common';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  getTodosUsuarios() {
    return this.usuarioService.getTodosUsuarios();
  }
}
