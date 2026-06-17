import { createRouter } from "@tanstack/react-router"
import { routeTree } from "./routeTree"

export const router = createRouter({
  routeTree,

  // Pré-carrega rotas quando o usuário passa o mouse em cima de um <Link>
  defaultPreload: 'intent',

  // Componente exibido enquanto um loader está buscando dados
  defaultPendingComponent: () => <p>Carregando...</p>,

  // Componente exibido quando uma rota lança um erro
  defaultErrorComponent: ({ error }) => (
    <div>
      <h2>Algo deu errado</h2>
      <pre>{error.message}</pre>
    </div>
  ),
})

// Registra o tipo do router para autocomplete e type-safety nos <Link>
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}
