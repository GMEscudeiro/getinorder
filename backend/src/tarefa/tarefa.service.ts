import { Injectable, NotFoundException } from '@nestjs/common';
import { DisciplinaService } from 'src/disciplina/disciplina.service';
import { ITarefa, ITarefaService } from './interfaces/tarefa.interface';
import { DadosTarefaDto } from './dto/dados-tarefa.dto';
import { IDisciplinaService } from 'src/disciplina/interfaces/disciplina.interface';
import { Tarefa } from './entities/tarefa.entity';


@Injectable()
export class TarefaService implements ITarefaService {
  constructor(private readonly disciplinaInterface: IDisciplinaService) { }

  private tarefas: Tarefa[] = [];
  private idTarefa = 1;

  cadastrarTarefa(dados: DadosTarefaDto): Tarefa {
    if (!this.disciplinaInterface.obterDisciplinaPeloId(dados.disciplinaId)) {
      throw new NotFoundException("Disciplina nao existe!");
    }
    const tarefa = new Tarefa();
    tarefa.id = this.idTarefa;
    tarefa.disciplinaId = dados.disciplinaId;
    tarefa.dataEntrega = new Date();
    tarefa.descricao = dados.descricao;
    tarefa.titulo = dados.titulo;
    this.tarefas.push(tarefa);
    this.idTarefa++;
    return tarefa;
  }

  obterTarefaPeloId(id: number): Tarefa {
    if (!this.tarefas[id - 1]) {
      throw new NotFoundException("Tarefa nao encontrada")
    }
    else {
      return this.tarefas[id - 1];
    }
  }

  obterTodasTarefas(): Tarefa[] {
    return this.tarefas;
  }

  obterTituloTarefa(id: number): string {
    return this.tarefas[id - 1].titulo;
  }
}
