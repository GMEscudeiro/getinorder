export interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  disciplinaId: number;
  dataEntrega: string;
}

export interface CriarTarefaDto {
  titulo: string;
  descricao: string;
  disciplinaId: number;
  dataEntrega: string;
}

export interface Disciplina {
  id: number;
  nome: string;
}
