import { useMutation } from "@tanstack/react-query"

import { leadsService } from "../services/leads.service"
import type { LeadsCreateRequest } from "../types/leads.types"

export function useLeadsCreate() {
  return useMutation({
    mutationFn: (data: LeadsCreateRequest) => leadsService.create(data),
  })
}
