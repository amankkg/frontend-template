import {NotFound, PageA, PageB, UserPage, Users} from 'pages'

export const routeConfig = [
  {path: 'a', element: <PageA />},
  {path: 'b', element: <PageB />},
  {path: 'users', element: <Users />},
  {path: 'user/:id', element: <UserPage />},
  {path: '*', element: <NotFound />},
]
