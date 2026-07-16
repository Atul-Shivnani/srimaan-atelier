import { StrictMode } from 'react'
import type { ComponentType } from 'react'
import { createRoot } from 'react-dom/client'
import 'lenis/dist/lenis.css'
import './index.css'
import App from './App.tsx'
import AppV2 from './AppV2.tsx'
import Locations from './Locations.tsx'
import LocationsV2 from './LocationsV2.tsx'

const routes: Record<string, ComponentType> = {
  '/': App,
  '/v2': AppV2,
  '/locations': Locations,
  '/locations-v2': LocationsV2,
}

const path = window.location.pathname.replace(/\/+$/, '') || '/'
const Root = routes[path] ?? App

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
