const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost/v1/api'
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || 'your api key'
const USER_COOKIE_NAME = process.env.NEXT_PUBLIC_USER_COOKIE_NAME || 'user'
const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost/v1/api'

const NOMINATIM_BASE_URL = process.env.NEXT_PUBLIC_NOMINATIM_BASE_URL || ''
const DEFAULT_AVATAR =
  'https://res.cloudinary.com/dqcsednbr/image/upload/v1732502600/360_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5_pyvagm.jpg'

export const constant = {
  BASE_URL,
  API_KEY,
  USER_COOKIE_NAME,
  SOCKET_URL,
  NOMINATIM_BASE_URL,
  DEFAULT_AVATAR,
}
