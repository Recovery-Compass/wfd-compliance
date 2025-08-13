import { createRoot } from 'react-dom/client'
import React from 'react'
import './index.css'
import WfdDashboard from './pages/WfdDashboard'

createRoot(document.getElementById('root')!).render(
  <WfdDashboard />
)
