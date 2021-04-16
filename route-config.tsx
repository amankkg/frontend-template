import { NotFound, PageA, PageB, Home } from 'pages'

export const routeConfig = [
  { path: '/', element: <Home /> },
  { path: '/a', element: <PageA /> },
  { path: '/b', element: <PageB /> },
  { path: '/*', element: <NotFound /> }
]
