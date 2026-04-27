import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            cadastrarTarefa: jest.fn().mockResolvedValue({ status: 'sucesso' })
          }
        }
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('POST /tarefa/cadastro', () => {
    it('deve chamar a camada de orquestração do Service via Controller', async () => {
      const payload = { disciplinaId: '1', usuarioId: '1', membrosIds: ['2'] };
      
      const resposta = await appController.cadastrarTarefa(payload);
      
      expect(resposta.status).toBe('sucesso');
      expect(appService.cadastrarTarefa).toHaveBeenCalledWith(payload);
    });
  });
});
