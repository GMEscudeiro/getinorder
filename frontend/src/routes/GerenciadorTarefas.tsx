import React, { useState, useEffect } from 'react';
import type { Tarefa } from '../types/index';
import type { Disciplina } from '../types/index';

export const GerenciadorTarefas = () => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [titulo, setTitulo] = useState('');
  const [disciplinaId, setDisciplinaId] = useState<number | string>('');
  const [dataEntrega, setDataEntrega] = useState('');

  const buscarTarefas = async () => {
    try {
      const res = await fetch('http://localhost:3000/tarefa');
      const data = await res.json();
      if (Array.isArray(data)) setTarefas(data);
    } catch (e) { console.error("Erro ao buscar tarefas", e); }
  };

  const buscarDisciplinas = async () => {
    try {
      const res = await fetch('http://localhost:3000/disciplina');
      const data = await res.json();
      if (Array.isArray(data)) {
        setDisciplinas(data);
        if (data.length > 0) setDisciplinaId(data[0].id);
      }
    } catch (e) { console.error("Erro ao buscar disciplinas", e); }
  };

  useEffect(() => {
    buscarTarefas();
    buscarDisciplinas();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const novaTarefaReq = {
      titulo,
      disciplinaId: Number(disciplinaId),
      dataEntrega,
      descricao: "Tarefa criada via interface React"
    };

    const response = await fetch('http://localhost:3000/tarefa/cadastrar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novaTarefaReq)
    });

    if (response.ok) {
      const tarefaCriada = await response.json();
      setTarefas(prev => [...prev, tarefaCriada]);
      setTitulo('');
    } else {
      const erro = await response.json();
      alert(erro.message);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>📝 GetInOrder - Cadastro de Tarefas</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', padding: '15px', border: '1px solid #eee', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input
          placeholder="Título da Tarefa"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          required
        />

        <select
          value={disciplinaId}
          onChange={e => setDisciplinaId(Number(e.target.value))}
          required
        >
          <option value="" disabled>Selecione uma disciplina</option>
          {disciplinas.map(disc => (
            <option key={disc.id} value={disc.id}>
              {disc.nome}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={dataEntrega}
          onChange={e => setDataEntrega(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>

      <hr />

      <h3>📋 Tarefas Ativas</h3>
      <div style={{ display: 'grid', gap: '10px' }}>
        {tarefas.length === 0 && <p style={{ color: '#666' }}>Nenhuma tarefa encontrada.</p>}
        {tarefas.map(t => (
          <div
            key={t.id}
            style={{
              padding: '15px',
              borderLeft: '5px solid #007bff',
              background: '#ffffff', // Força fundo branco
              color: '#333333',      // Força texto cinza muito escuro (quase preto)
              borderRadius: '4px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)' // Sombra leve para destacar do fundo da página
            }}
          >
            <strong style={{ color: '#000' }}>{t.titulo}</strong>
            <p style={{ fontSize: '13px', margin: '5px 0', color: '#555' }}>
              Disciplina: {disciplinas.find(d => d.id === t.disciplinaId)?.nome || `ID ${t.disciplinaId}`}
            </p>
            <p style={{ fontSize: '12px', color: '#888', margin: 0 }}>
              Entrega: {new Date(t.dataEntrega).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
