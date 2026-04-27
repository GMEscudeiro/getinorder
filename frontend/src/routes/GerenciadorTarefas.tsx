import React, { useState, useEffect } from 'react';

export const GerenciadorTarefas = () => {
  const [tarefas, setTarefas] = useState<any[]>([]);
  const [disciplinas, setDisciplinas] = useState<any[]>([]);
  const [usuarios, setUsuarios] = useState<any[]>([]);
  
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [disciplinaId, setDisciplinaId] = useState<string>('');
  const [membrosIds, setMembrosIds] = useState<string[]>([]);
  const [dataEntrega, setDataEntrega] = useState('');

  const buscarDisciplinas = async () => {
    try {
      const res = await fetch('http://localhost:3000/disciplinas/usuario/1'); // Fetch via Orquestrador usando Mock ID 1
      const data = await res.json();
      if (Array.isArray(data)) {
        setDisciplinas(data);
        if (data.length > 0) setDisciplinaId(String(data[0].id));
      }
    } catch (e) { console.error("Erro ao buscar disciplinas", e); }
  };

  const buscarUsuarios = async () => {
    try {
      const res = await fetch('http://localhost:3000/usuarios'); // Fetch via Orquestrador
      const data = await res.json();
      if (Array.isArray(data)) {
        setUsuarios(data);
      }
    } catch (e) { console.error("Erro ao buscar usuarios", e); }
  };

  useEffect(() => {
    buscarDisciplinas();
    buscarUsuarios();
  }, []);

  const handleMembrosChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setMembrosIds(selected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const novaTarefaReq = {
      usuarioId: '1', // ID fixo como pedido
      disciplinaId,
      membrosIds,
      titulo,
      descricao,
      dataEntrega,
    };

    const response = await fetch('http://localhost:3000/tarefa/cadastro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novaTarefaReq)
    });

    if (response.ok) {
      const data = await response.json();
      alert("Sucesso! " + data.mensagem);

      // Mock visual local para provar que o estado visual funciona
      const novaMockVisual = {
        id: Math.random(),
        titulo,
        descricao,
        disciplinaId,
        dataEntrega,
      };
      setTarefas(prev => [...prev, novaMockVisual]);
      setTitulo('');
      setDescricao('');
      setMembrosIds([]);
    } else {
      const erro = await response.json();
      alert("Falha na Orquestração: " + erro.message);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h2>📝 GetInOrder - Cadastro Orquestrado</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', padding: '20px', border: '1px solid #eee', background: '#fafafa', display: 'flex', flexDirection: 'column', gap: '15px', borderRadius: '8px' }}>
        <input
          placeholder="Título da Tarefa"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          required
          style={{ padding: '8px' }}
        />

        <textarea
          placeholder="Descrição da Tarefa"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
          required
          style={{ padding: '8px', minHeight: '60px' }}
        />

        <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '12px', marginBottom: '5px' }}>Disciplina</label>
                <select
                value={disciplinaId}
                onChange={e => setDisciplinaId(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                >
                <option value="" disabled>Selecione uma disciplina</option>
                {disciplinas.map(disc => (
                    <option key={disc.id} value={disc.id}>
                    {disc.codigo} - {disc.nome}
                    </option>
                ))}
                </select>
            </div>

            <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '12px', marginBottom: '5px' }}>Data de Entrega</label>
                <input
                    type="date"
                    value={dataEntrega}
                    onChange={e => setDataEntrega(e.target.value)}
                    required
                    style={{ width: '100%', boxSizing: 'border-box', padding: '8px' }}
                />
            </div>
        </div>

        <div>
            <label style={{ display: 'block', fontSize: '12px', marginBottom: '5px' }}>Membros da Equipe (Segure Ctrl ou Cmd para multi-seleção)</label>
            <select
                multiple
                value={membrosIds}
                onChange={handleMembrosChange}
                required
                style={{ width: '100%', minHeight: '100px', padding: '8px' }}
            >
                {usuarios.map(user => (
                    <option key={user.id} value={user.id}>
                        {user.nome} ({user.email})
                    </option>
                ))}
            </select>
        </div>

        <button type="submit" style={{ padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Submeter a Orquestração</button>
      </form>

      <hr />

      <h3>📋 Tarefas Ativas (Mocks Locais)</h3>
      <div style={{ display: 'grid', gap: '10px' }}>
        {tarefas.length === 0 && <p style={{ color: '#666' }}>Nenhuma tarefa recém criada.</p>}
        {tarefas.map(t => (
          <div
            key={t.id}
            style={{
              padding: '15px',
              borderLeft: '5px solid #007bff',
              background: '#ffffff',
              color: '#333333',
              borderRadius: '4px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <strong style={{ color: '#000' }}>{t.titulo}</strong>
            <p style={{ margin: '5px 0', fontSize: '14px' }}>{t.descricao}</p>
            <p style={{ fontSize: '13px', margin: '5px 0', color: '#555' }}>
              Disciplina: {disciplinas.find(d => String(d.id) === String(t.disciplinaId))?.nome || `ID ${t.disciplinaId}`}
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
