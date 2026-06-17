import { ArrowRightIcon, FileTextIcon, WrenchIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { ReportProblemDialog } from "./report-problem-dialog"
import { type Agent } from "../types/agent.type"

function getInitials(title: string) {
  const parts = title.trim().split(/\s+/)
  const initials = (parts[0]?.[0] ?? "") + (parts[parts.length - 1]?.[0] ?? "")
  return initials.toUpperCase() || "IA"
}

type AgentCardProps = {
  agent: Agent
}

export function AgentCard({ agent }: AgentCardProps) {
  const documentsCount = agent.documents?.length ?? 0

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex min-w-0 items-center gap-3">
          <Avatar size="lg">
            {agent.icon ? (
              <AvatarImage src={agent.icon} alt={agent.title} />
            ) : null}
            <AvatarFallback>{getInitials(agent.title)}</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-col">
            <CardTitle className="truncate">{agent.title}</CardTitle>
            <CardDescription className="truncate">
              {agent.description}
            </CardDescription>
          </div>
        </div>
        <CardAction>
          <ReportProblemDialog agent={agent} />
        </CardAction>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{agent.type}</Badge>
          <Badge variant="outline">{agent.model_friendly_name}</Badge>
          {agent.hasTools ? (
            <Badge variant="secondary" className="gap-1">
              <WrenchIcon className="size-3" />
              Ferramentas
            </Badge>
          ) : null}
          {documentsCount > 0 ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="secondary" className="gap-1">
                  <FileTextIcon className="size-3" />
                  {documentsCount}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                {`Esse agente possui ${documentsCount} documento${
                  documentsCount > 1 ? "s" : ""
                }`}
              </TooltipContent>
            </Tooltip>
          ) : null}
        </div>
      </CardContent>

      <CardFooter className="justify-end">
        {/* TODO: navegar para /private/chat/:name quando a rota de chat existir. */}
        <Button size="sm" variant="secondary">
          Acessar
          <ArrowRightIcon />
        </Button>
      </CardFooter>
    </Card>
  )
}
