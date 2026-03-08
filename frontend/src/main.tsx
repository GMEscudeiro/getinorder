import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GerenciadorTarefas } from './routes/GerenciadorTarefas.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GerenciadorTarefas />
  </StrictMode>,
)
