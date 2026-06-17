# Roteamento — TanStack Router (Code-Based)

## Regras gerais

- Usamos **code-based routing**. NUNCA use file system routing.
- NUNCA instale ou configure o `@tanstack/router-plugin` no `vite.config.ts`.
- NUNCA crie arquivos dentro de `src/routes/` esperando que o TanStack os leia automaticamente.
- As rotas são definidas **manualmente** com `createRoute()` e montadas com `.addChildren()`.
- O nome dos arquivos é livre — o TanStack não lê os nomes, quem define a rota é o `path:` dentro do código.

---

## Estrutura de pastas

```
src/
├── main.tsx                          ← apenas renderiza <RouterProvider>
├── router/
│   ├── index.ts                      ← cria e exporta o router (createRouter)
│   ├── routeTree.ts                  ← monta e exporta a routeTree (addChildren)
│   ├── guards/
│   │   └── requireAuth.ts            ← funções de beforeLoad reutilizáveis
│   └── routes/
│       ├── root.route.tsx            ← rota raiz (createRootRoute + RootLayout)
│       ├── home.route.tsx
│       ├── login.route.tsx
│       ├── dashboard/
│       │   ├── _layout.route.tsx     ← layout pathless autenticado
│       │   ├── index.route.tsx
│       │   ├── settings.route.tsx
│       │   └── reports.route.lazy.tsx
│       └── posts/
│           ├── index.route.tsx
│           └── post-detail.route.tsx ← rota dinâmica ($postId)
├── layouts/
│   ├── RootLayout.tsx
│   └── DashboardLayout.tsx
```

---

## Responsabilidade de cada arquivo

| Arquivo | Responsabilidade |
|---|---|
| `main.tsx` | Só renderiza `<RouterProvider router={router} />` |
| `router/index.ts` | Cria o `router` com `createRouter`, registra o tipo global, exporta |
| `router/routeTree.ts` | Importa todas as rotas e monta a árvore com `.addChildren()` |
| `router/routes/*.route.tsx` | Define uma rota: `path`, `component`, `loader`, `beforeLoad` |
| `router/routes/**/_layout.route.tsx` | Layout pathless: usa `id` em vez de `path` |
| `router/routes/**/*.route.lazy.tsx` | Rota com lazy loading via `.lazy()` + `createLazyRoute` |
| `router/guards/*.ts` | Funções reutilizáveis para `beforeLoad` (ex: requireAuth) |
| `layouts/` | Componentes de layout (JSX puro, sem lógica de rota) |
| `pages/` | Componentes de página (JSX puro, sem lógica de rota) |
---

## main.tsx

```tsx
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
```

---

## router/index.ts

```ts
import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree'

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultPendingComponent: () => <p>Carregando...</p>,
  defaultErrorComponent: ({ error }) => <p>{error.message}</p>,
})
```

---

## router/routeTree.ts

```ts
import { rootRoute } from './routes/root.route'
import { homeRoute } from './routes/home.route'
import { loginRoute } from './routes/login.route'
import { dashboardLayoutRoute } from './routes/dashboard/_layout.route'
import { dashboardIndexRoute } from './routes/dashboard/index.route'
import { dashboardSettingsRoute } from './routes/dashboard/settings.route'
import { postsRoute } from './routes/posts/index.route'
import { postDetailRoute } from './routes/posts/post-detail.route'

export const routeTree = rootRoute.addChildren([
  homeRoute,
  loginRoute,
  dashboardLayoutRoute.addChildren([
    dashboardIndexRoute,
    dashboardSettingsRoute,
  ]),
  postsRoute.addChildren([
    postDetailRoute,
  ]),
])
```

---

## Padrão de uma rota simples

```tsx
// router/routes/home.route.tsx
import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './root.route'
import { HomePage } from '@/pages/HomePage'

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})
```

---

## Padrão de layout pathless (com guard)

Use `id` em vez de `path`. Não adiciona segmento na URL.
O `beforeLoad` roda antes de qualquer rota filha.

```tsx
// router/routes/dashboard/_layout.route.tsx
import { createRoute, Outlet, redirect } from '@tanstack/react-router'
import { rootRoute } from '../root.route'
import { authStore } from '@/store/auth'

export const dashboardLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'dashboard-layout',
  beforeLoad: () => {
    if (!authStore.isAuthenticated) {
      throw redirect({ to: '/login' })
    }
  },
  component: () => (
    <div style={{ display: 'flex' }}>
      <aside>{/* sidebar */}</aside>
      <main><Outlet /></main>
    </div>
  ),
})
```

---

## Padrão de rota dinâmica ($param)

```tsx
// router/routes/posts/post-detail.route.tsx
import { createRoute } from '@tanstack/react-router'
import { postsRoute } from './index.route'
import { PostDetailPage } from '@/pages/posts/PostDetailPage'

export const postDetailRoute = createRoute({
  getParentRoute: () => postsRoute,
  path: '$postId',           // captura /posts/123, /posts/meu-post, etc.
  loader: async ({ params }) => {
    const post = await fetchPost(params.postId)
    return { post }
  },
  component: PostDetailPage,
})

// Dentro do componente:
// const { postId } = postDetailRoute.useParams()
// const { post } = postDetailRoute.useLoaderData()
```

---

## Padrão de rota lazy (code splitting)

A rota tem dois arquivos:

```ts
// router/routes/dashboard/reports.route.lazy.tsx  ← arquivo 1: define a rota
import { createRoute } from '@tanstack/react-router'
import { dashboardLayoutRoute } from './_layout.route'

export const dashboardReportsRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: '/dashboard/reports',
  loader: async () => {
    const data = await fetchReports()
    return { reports: data }
  },
}).lazy(() =>
  import('./reports.component').then((m) => m.Route)
)
```

```ts
// router/routes/dashboard/reports.component.tsx  ← arquivo 2: componente lazy
import { createLazyRoute } from '@tanstack/react-router'

export const Route = createLazyRoute('/dashboard/reports')({
  component: DashboardReports,
  pendingComponent: () => <p>Carregando relatórios...</p>,
})

function DashboardReports() {
  const { reports } = Route.useLoaderData()
  return (
    <ul>
      {reports.map((r) => <li key={r.id}>{r.title}</li>)}
    </ul>
  )
}
```

---

## Padrão de guard reutilizável

```ts
// router/guards/requireAuth.ts
import { redirect } from '@tanstack/react-router'
import { authStore } from '@/store/auth'

export function requireAuth() {
  if (!authStore.isAuthenticated) {
    throw redirect({ to: '/login' })
  }
}

// Uso em qualquer rota:
// beforeLoad: requireAuth
```

---

## Convenções de nomenclatura

| Tipo | Nome do arquivo | Exemplo |
|---|---|---|
| Rota simples | `[nome].route.tsx` | `home.route.tsx` |
| Layout pathless | `_layout.route.tsx` | `_layout.route.tsx` |
| Rota dinâmica | `[recurso]-detail.route.tsx` | `post-detail.route.tsx` |
| Rota lazy (definição) | `[nome].route.lazy.tsx` | `reports.route.lazy.tsx` |
| Rota lazy (componente) | `[nome].component.tsx` | `reports.component.tsx` |
| Guard | `[nome].ts` | `requireAuth.ts` |

---

## O que NUNCA fazer

- ❌ Não colocar `createRoute` dentro de `pages/` ou `layouts/`
- ❌ Não criar o `router` dentro do `main.tsx`
- ❌ Não misturar lógica de rota (loader, beforeLoad) com o componente de página
- ❌ Não usar `@tanstack/router-plugin` no `vite.config.ts`
- ❌ Não esperar que o nome do arquivo defina a rota — quem define é o `path:` no código
- ❌ Não duplicar guards — centralize em `router/guards/`

## Ao adicionar uma nova rota

1. Crie o arquivo em `router/routes/[domínio]/[nome].route.tsx`
2. Crie o componente de página em `pages/[domínio]/[Nome]Page.tsx`
3. Importe e registre a rota no `router/routeTree.ts`
4. Se precisar de guard, importe de `router/guards/`
