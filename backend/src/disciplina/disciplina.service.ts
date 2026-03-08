import { Injectable } from '@nestjs/common';
import { IDisciplinaService } from './interfaces/disciplina.interface';
import { DadosAnotacaoDto } from './dto/dados-anotacao.dto';
import { Disciplina } from './entities/disciplina.entity';
import { Anotacao } from './entities/anotacao.entity';

const engSoftware = new Disciplina();
engSoftware.id = 1;
engSoftware.nome = "Engenharia de Software";

const orieObjetos = new Disciplina();
orieObjetos.id = 2;
orieObjetos.nome = "Orientacao a Objetos";

@Injectable()
export class DisciplinaService implements IDisciplinaService {
  private disciplinas = [engSoftware, orieObjetos];
  private idAnotacao = 1;

  obterNomeDisciplina(id: number): string {
    return this.disciplinas[id - 1].nome;
  }

  obterDisciplinaPeloId(id: number): Disciplina {
    return this.disciplinas[id - 1];
  }

  obterTodasDisciplinas(): Disciplina[] {
    return this.disciplinas;
  }

  criarAnotacao(dados: DadosAnotacaoDto): Anotacao {
    const anotacao = new Anotacao();
    anotacao.id = this.idAnotacao;
    anotacao.conteudo = dados.conteudo;
    anotacao.disciplinaId = dados.disciplinaId;
    anotacao.dataCriacao = new Date();
    this.idAnotacao++;
    return anotacao
  }
}
