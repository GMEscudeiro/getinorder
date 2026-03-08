# getinorder
Plataforma de gerenciamento de tarefas.
## Tecnologias utilizadas
TypeScript, React, Next.js, HTML, TailwindCSS, Supabase, Nest.js.

## Componentes implementados
Os seguintes componentes foram implementados seguindo a abordagem Cheesman & Daniels:

1. Componente Disciplina:
- Descriçao: Responsavel por gerir o catalogo de disciplinas e anotacoes academicas
- Interfaces fornecidas: IDisciplinaService
- Interfaces requeridas: Nenhuma

2. Componente Tarefa:
- Descriçao: Responsavel por gerir as tarefas relacionadas as disciplinas
- Interfaces fornecidas: ITarefaService
- Interfaces requeridas: IDisciplinaService

## Comunicação entre componentes
A comunicação entre os componentes ocorre por meio de Interfaces  
O componente Tarefa define que precisa de um provedor que implemente a interface ITarefaService  
Em tempo de execução, o NestJS injeta a implementação de DisciplinaService no componente Tarefa

### Desacoplamento
O componente Tarefa, não importa a implementação de DisciplinaService, ele utiliza um Token de Injeção baseado em uma classe abstrata.  
Isso permite que a logica do componente Disciplina seja alterada sem que o componente Tarefa sofra alguma modificação.

## Como executar o projeto
Dependências: Node.js, npm

- Entre na pasta raiz e execute o comando abaixo para instalar as dependências:
```
npm run install-all
```
- Rode o comando abaixo para iniciar o projeto:
```
npm run dev
```
- A interface estará disponível em `http://localhost:5173`
