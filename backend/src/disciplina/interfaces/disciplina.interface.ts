import { DadosAnotacaoDto } from "../dto/dados-anotacao.dto";
import { Anotacao } from "../entities/anotacao.entity";
import { Disciplina } from "../entities/disciplina.entity";

export abstract class IDisciplinaService {
  abstract obterNomeDisciplina(id: number): string;
  abstract obterDisciplinaPeloId(id: number): Disciplina;
  abstract obterTodasDisciplinas(): Disciplina[];
  abstract criarAnotacao(dados: DadosAnotacaoDto): Anotacao;
}
