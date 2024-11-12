import { createRoot } from 'react-dom/client'
import { routes } from './routes.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { GlobalProvider } from './context/GlobalContext.tsx'

const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')!).render(
  <GlobalProvider>
    <RouterProvider router={router} />
  </GlobalProvider>
)
