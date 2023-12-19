import { Bill_Address, Customer_In_Bill, Supplier } from "./object"

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

interface Item_Products {
  price: number,
  quantity: number,
  productId: string
}
export interface Bill_Import_Request {
  bill_note: string
  tax: number,
  supplier: Supplier
  products: Item_Products[]
  bill_payment: {
    infomation: "đã thanh toán trước"
  }
  bill_address: Bill_Address
  bill_image: string
}

export interface Bill_Export_Request {
  bill_note: string
  customer: Customer_In_Bill
  products: Item_Products[]
  bill_payment: {
    method: 'in store'
  }
  bill_address: Bill_Address
}