// Espelha user.type.ts do mobileXGenAI_Portal.
export type User = {
  email: string
  enabled: boolean
  first_name: string
  full_name: string
  last_name: string
  name: string
  role_profile_name: string
  user_image: string
  user_type: string
  username: string
  enabled_customization?: boolean
  instructions?: string
  nickname?: string
  tone?: string
  about_me?: string
  client?: string
  client_data: {
    allow_favorite_threads?: 0 | 1
    allow_delete_threads?: 0 | 1
    client_name: string
    creation: string
    log_conversation: 0 | 1
    name: string
  }
}
