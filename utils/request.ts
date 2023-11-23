export interface UserRequest {
  username: string
  password: string
  email: string
  display_name: string
  phone: string
  roles: string[]
  user_attributes?: UserAttributesRequest
}

export interface UserAttributesRequest {
  positionId?: string
  manager_start_date?: string
  salary?: number
  address?: string
}

