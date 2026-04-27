import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  async cadastrarTarefa(payload: any) {
    const { disciplinaId, usuarioId, membrosIds } = payload;

    // 1. Buscar disciplinas do usuario
    try {
      const respDisciplinas = await fetch(`http://127.0.0.1:3001/disciplina/usuario/${usuarioId}`);
      if (!respDisciplinas.ok) throw new Error('Falha HTTP serviço disciplina');
      const disciplinas = await respDisciplinas.json();

      // Checa se o disciplinaId desejado está na lista
      const temMatricula = disciplinas.some((d: any) => d.id === String(disciplinaId));
      if (!temMatricula) {
        throw new BadRequestException('Usuário não faz parte desta disciplina.');
      }
    } catch (e) {
      if (e instanceof BadRequestException) throw e;
      throw new InternalServerErrorException('Falha na comunicação com Disciplina-Service.');
    }

    // 2. Buscar usuários cadastrados
    try {
      const respUsuarios = await fetch(`http://127.0.0.1:3002/usuario`);
      if (!respUsuarios.ok) throw new Error('Falha HTTP serviço usuário');
      const usuarios = await respUsuarios.json();

      const todosIdsAtivos = usuarios.map((u: any) => String(u.id));
      
      // Checa se cada membro passado existe de fato no banco de dados
      const todosExistem = membrosIds.every((id: any) => todosIdsAtivos.includes(String(id)));
      if (!todosExistem) {
        throw new BadRequestException('Um ou mais membros reportados não estão cadastrados.');
      }
    } catch (e) {
      if (e instanceof BadRequestException) throw e;
      throw new InternalServerErrorException('Falha na comunicação com Usuario-Service.');
    }

    // 3. Tudo Validado! (Mock simulando o cadastro bem sucedido)
    return {
      status: 'sucesso',
      mensagem: 'Membros atribuídos e Tarefa cadastrada via Orquestração!'
    };
  }
  async obterDisciplinasProxy(userId: string) {
    const res = await fetch(`http://127.0.0.1:3001/disciplina/usuario/${userId}`);
    return res.json();
  }

  async obterUsuariosProxy() {
    const res = await fetch(`http://127.0.0.1:3002/usuario`);
    return res.json();
  }
}
