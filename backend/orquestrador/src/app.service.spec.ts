import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { BadRequestException } from '@nestjs/common';

// Sobrescrevemos o fetch globalmente para os testes
global.fetch = jest.fn();

describe('AppService (Testes Unitários de Orquestração)', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
    jest.clearAllMocks(); // Limpa Mocks entre cada teste para não haver contaminação
  });

  it('deve aprovar a orquestração e retornar sucesso caso os contratos chequem verdadeiro', async () => {
    // 1º fetch: Simulando o retorno do Serviço de Disciplinas
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: '1', nome: 'Sistemas', codigo: 'S1' }],
    });
    // 2º fetch: Simulando o retorno do Serviço de Usuários
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: '2', nome: 'Bob' }, { id: '3', nome: 'Charlie' }],
    });

    const resultado = await service.cadastrarTarefa({
      disciplinaId: '1',
      usuarioId: '10', // o autor
      membrosIds: ['2', '3'] // os membros
    });

    expect(resultado.status).toBe('sucesso');
  });

  it('deve bloquear lançando erro caso o aluno não esteja na disciplina especificada', async () => {
    // 1º fetch: Simula as disciplinas que o aluno tem (não tem a disciplina 1)
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: '99', nome: 'Outra Disciplina' }],
    });

    // Validamos se jogar erro 400
    await expect(service.cadastrarTarefa({
      disciplinaId: '1',
      usuarioId: '10',
      membrosIds: ['2']
    })).rejects.toThrow(BadRequestException);
  });

  it('deve bloquear lançando erro caso os membros enviados não existam na base', async () => {
    // 1º fetch: Aprovamos Disciplina
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: '1', nome: 'Sistemas' }],
    });
    // 2º fetch: Usuário da base não contempla o membro procurado (ex: membro 99)
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: '2', nome: 'Bob' }],
    });

    // Validamos que a orquestração barra no step de Membros
    await expect(service.cadastrarTarefa({
      disciplinaId: '1',
      usuarioId: '10',
      membrosIds: ['99']
    })).rejects.toThrow(BadRequestException);
  });
});
