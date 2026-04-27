import { Injectable } from '@nestjs/common';

export interface DadosDisciplina {
  id: string;
  nome: string;
  codigo: string;
}

@Injectable()
export class DisciplinaService {
  obterDisciplinasDoUsuario(userId: string): DadosDisciplina[] {
    // Mock Retornando a mensagem contendo DadosDisciplina
    return [
      { id: '1', nome: 'Sistemas Distribuídos', codigo: 'CCB123' },
      { id: '2', nome: 'Engenharia de Software', codigo: 'CCB456' }
    ];
  }
}
