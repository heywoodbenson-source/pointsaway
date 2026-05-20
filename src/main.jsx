import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import PointsAway from './PointsAway'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PointsAway />
  </StrictMode>
)