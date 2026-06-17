export type AgentsImprovePromptRequest = {
  currentPrompt: string
}

export type AgentsImprovePromptResponse = {
  current_prompt: string
  improved_prompt: string
  model: string
}
