import { Injectable } from '@nestjs/common';

export interface DadosUsuario {
  id: string;
  username: string;
  nome: string;
  email: string;
}

@Injectable()
export class UsuarioService {
  getTodosUsuarios(): DadosUsuario[] {
    // Mock Retornando a mensagem contendo DadosUsuario
    return [
      { id: '1', username: 'alice123', nome: 'Alice', email: 'alice@fei.edu.br' },
      { id: '2', username: 'bob_master', nome: 'Bob', email: 'bob@fei.edu.br' },
      { id: '3', username: 'charlie_z', nome: 'Charlie', email: 'charlie@fei.edu.br' }
    ];
  }
}
