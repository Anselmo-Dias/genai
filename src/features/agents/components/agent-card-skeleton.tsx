import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function AgentCardSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Skeleton className="size-10 rounded-full" />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-full" />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-24 rounded-full" />
        </div>
      </CardContent>

      <CardFooter className="justify-end">
        <Skeleton className="h-7 w-24 rounded-md" />
      </CardFooter>
    </Card>
  )
}
