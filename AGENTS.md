# Padrão de Integração com API (React Query) — Features/Agenda

## Objetivo
Sempre que eu pedir para integrar com alguma rota de API, você **DEVE**:
1) Criar ou atualizar um `service` dentro de `features/<feature>/services`
2) Criar um hook de **query** ou **mutation** dentro de `features/<feature>/queries` consumindo esse service
3) Garantir **tipagem completa** (Request/Response e parâmetros) e **nomes consistentes**.

---

## Estrutura da feature (exemplo)
features/agenda/
- components/
- hooks/
- keys/
- pages/
- queries/
- services/
- store/
- types/

---

## Regra principal
### ✅ Sempre separar responsabilidades
- **services/**: somente funções que fazem chamada HTTP (api.get/post/put/delete), sem React, sem estado.
- **queries/**: hooks do React Query (`useQuery`, `useMutation`) que chamam o service e definem `queryKey`, `enabled`, `staleTime`, invalidations etc.
- **types/**: tipos de Request/Response (e tipos de domínio), usados por services e queries.
- **keys/**: chaves do React Query (queryKey) centralizadas.

---

## 1) Types (tipagem obrigatória)
Sempre que integrar uma rota nova, crie (ou reaproveite) tipos em:
`features/<feature>/types/*.ts`

Exemplo:

```ts
export type ExampleARequest = {
  id: string;
  page?: number;
};

export type ExampleAResponse = {
  items: Array<{ id: string; title: string }>;
  total: number;
};
```

> Regra: **toda função do service recebe um tipo Request** e retorna `Promise<Response>`.

---

## 2) Service (criar ou adicionar função)
Sempre que eu pedir uma integração, você deve:
- Criar um arquivo `features/<feature>/services/<feature>.service.ts` **OU**
- Apenas **adicionar uma função** no service existente.

### Padrão do service (obrigatório)

```ts
import { api } from "@/services/api";

export const agendaService = {
  async exampleA(data: ExampleARequest): Promise<ExampleAResponse> {
    const response = await api.post(`/`, data);
    return response.data;
  },

  async exampleB(data: ExampleBRequest): Promise<ExampleBResponse> {
    const response = await api.post(`/`, data);
    return response.data;
  },
};
```

### Regras do service
- Nome do objeto: `<feature>Service`
- Nome das funções: verbo + contexto
- Retorno sempre `return response.data`
- Sem lógica de cache

---

## 3) Keys (queryKey centralizada)

```ts
export const agendaKeys = {
  all: ["agenda"] as const,
  getAll: ["agenda", "getAll"] as const,
  getById: (id: string) => ["agenda", "getById", id] as const,
};
```

---

## 4) Queries (hooks do React Query)

### Query

```ts
export function useAgendaGetAll(params: ExampleARequest) {
  return useQuery({
    queryKey: [...agendaKeys.getAll, params] as const,
    queryFn: async () => agendaService.exampleA(params),
  });
}
```

### Mutation

```ts
export function useAgendaCreate() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: ExampleBRequest) =>
      agendaService.exampleB(data),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: agendaKeys.all });
    },
  });
}
```

---

## Checklist obrigatório

1. Criar tipos Request/Response
2. Criar ou atualizar service
3. Criar query ou mutation
4. Usar keys

---

# Padrão obrigatório para respostas paginadas da API

Toda rota de listagem paginada **DEVE** retornar o mesmo envelope que as demais rotas da API, com `data` sendo um objeto contendo `items`, `total`, `page` e `limit`. **Nunca** retornar um array diretamente em `data` quando a rota for paginada.

## Formato obrigatório

```json
{
  "status": 200,
  "token": "jwt-renovado-ou-null",
  "err": 0,
  "msg": "",
  "data": {
    "items": [ /* registros da página atual */ ],
    "total": 123,
    "page": 1,
    "limit": 10
  }
}
```

## Regras

- O envelope externo (`status`, `token`, `err`, `msg`, `data`) é o mesmo de todas as respostas da API.
- `data.items`: array com os registros **da página atual** (não o conjunto completo).
- `data.total`: número total de registros disponíveis em todas as páginas (não o número de páginas). O front calcula `totalPages = Math.ceil(total / limit)`.
- `data.page`: página atual, **1-indexada**.
- `data.limit`: tamanho da página efetivamente usado.
- Query params de entrada esperados: `?page=<number>&limit=<number>` (ambos opcionais, com defaults `page=1`, `limit=10`).
- Rotas que retornam **todos os registros sem paginação** (ex.: `GET /resource/parent/:parentId`) podem retornar `data` como array direto — esse é o único caso aceitável de array em `data`.

## Exemplo de tipo TS consumido pelo front

```ts
export type ResourceGetAllResponse = {
  status: number;
  token: string | null;
  err: number;
  data: {
    items: ResourceListItem[];
    total: number;
    page: number;
    limit: number;
  };
  msg: string;
};
```

---

## Padrão obrigatório para criação de Tabelas (React + TS) a partir de um Schema

Sempre que eu pedir para criar uma tabela, eu vou te passar apenas o schema (Zod). Você deve criar todo o resto seguindo exatamente o padrão abaixo.

### Stack e dependências (fixas)

Use sempre:

- React + TypeScript
- `zod`
- `@tanstack/react-table`
- `@dnd-kit`
- `shadcn/ui`
- `lucide-react`

### Entrada

Eu sempre vou fornecer:

```ts
export const schema = z.object({
  id: z.number(),
  // outros campos
})
```

Você deve inferir o tipo:

```ts
type RowData = z.infer<typeof schema>
```

### Saída obrigatória

Você deve gerar:

1. Schema + RowData
2. DragHandle
3. Columns
4. DraggableRow
5. `XxxTable` component — arquivo separado dentro de `components/` da respectiva feature

### Recursos obrigatórios

**Drag and Drop**

- `DndContext`
- `closestCenter`
- `restrictToVerticalAxis`
- `arrayMove`

**React Table State**

- `data`
- `sorting`
- `filters`
- `pagination`
- `selection`
- `visibility`

**Colunas padrão**

1. Drag
2. Select
3. Data fields
4. Actions

**Footer**

- Page size select
- Pagination
- Selected rows counter

**Empty State** — texto fixo: `Nenhum item encontrado`

---

### Regra obrigatória para uso de componentes base do shadcn/ui — `Card`

Ao usar `Card`, `CardHeader`, `CardContent` e `CardFooter` do shadcn/ui:

- Não alterar `padding`, `margin`, `gap`, `py`, `px` ou a estrutura base do componente com classes sobrescrevendo o padrão do shadcn.
- A customização visual deve acontecer dentro do conteúdo interno, usando wrappers adicionais quando necessário.
- Se precisar de grid, stacks ou agrupamentos visuais, criar uma `div` interna dentro de `CardContent`, em vez de estilizar o `CardContent` diretamente.

---

### Regra obrigatória para estados de carregamento (Skeleton)

**Princípio:** quando dados estão sendo carregados da API (`isLoading`), somente os elementos cujo conteúdo vem da API devem ser substituídos por `<Skeleton />` do shadcn/ui. Elementos estáticos permanecem visíveis.

**O que recebe Skeleton:**

- Linhas/células de tabelas (dados dinâmicos)
- Valores numéricos vindos da API (ex: `<Skeleton className="inline-block h-4 w-8 align-middle" />`)
- Conteúdo de cards/dialogs que dependem de fetch

**O que NÃO recebe Skeleton:**

- Títulos de página
- Labels e headers de coluna da tabela
- Inputs de busca, botões de ação, seletores de colunas
- Paginação e footer da tabela
- Qualquer elemento que não depende de dados da API

**Exemplo — Tabela com loading:**

```tsx
if (isLoading) {
  return (
    <section>
      <header>
        <h1>Listagem de Pacientes</h1> {/* estático, visível */}
        <p>Total de registros: <Skeleton className="inline-block h-4 w-8 align-middle" /></p>
      </header>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Paciente</TableHead> {/* estático, visível */}
            <TableHead>CPF</TableHead>      {/* estático, visível */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell><Skeleton className="h-4 w-32" /></TableCell>
              <TableCell><Skeleton className="h-4 w-28" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
}
```

# Regra obrigatória para criação de commits

## Padrão
Sempre que eu pedir para criar um commit, a mensagem **DEVE** seguir o padrão **Conventional Commits**:

```
<type>(<scope opcional>): <descrição curta em minúsculo>

<corpo opcional explicando o "porquê">
```

### Tipos permitidos
- `feat`: nova funcionalidade
- `fix`: correção de bug
- `refactor`: refatoração sem mudança de comportamento
- `style`: ajustes visuais/formatação (sem lógica)
- `docs`: documentação
- `test`: testes
- `chore`: tarefas de manutenção, build, dependências
- `perf`: melhorias de performance

### Regras
- A descrição deve estar em português, no imperativo e começar em letra minúscula.
- Scope é opcional, mas quando usado deve refletir a feature afetada (ex.: `feat(agenda): ...`, `fix(professional): ...`).
- Prefira descrever o **porquê** no corpo da mensagem, não apenas o **o quê**.

## Arquivos que NUNCA devem ser commitados
- `settings.local.json` (em qualquer diretório, incluindo `.claude/settings.local.json`)
- Qualquer outro arquivo que contenha configurações ou credenciais locais.

Ao fazer `git add`, sempre adicionar arquivos de forma explícita por nome — nunca usar `git add -A` ou `git add .` — para evitar incluir acidentalmente `settings.local.json` ou arquivos sensíveis.
