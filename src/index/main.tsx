import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../tic-tac-toe/BoardStyle.css'
import {MainRouter} from "./MainRouter.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <MainRouter />
  </StrictMode>,
)