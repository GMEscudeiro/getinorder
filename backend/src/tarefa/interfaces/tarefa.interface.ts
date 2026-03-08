import { DadosTarefaDto } from "../dto/dados-tarefa.dto";
import { Tarefa } from "../entities/tarefa.entity";

export interface ITarefa {
  id: number;
  titulo: string;
  disciplinaId: number;
  descricao: string;
  dataEntrega: Date;
}

export abstract class ITarefaService {
  abstract cadastrarTarefa(dados: DadosTarefaDto): Tarefa;
  abstract obterTodasTarefas(): Tarefa[];
  abstract obterTarefaPeloId(id: number): Tarefa;
  abstract obterTituloTarefa(id: number): string;
}
