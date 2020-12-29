import {NotFound, PageA, PageB} from 'pages'

export const routeConfig = [
  {path: 'a', element: <PageA />},
  {path: 'b', element: <PageB />},
  {path: '*', element: <NotFound />},
]
