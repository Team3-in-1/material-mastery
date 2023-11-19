export interface Category {
    _id: string
    category_name: string
    category_description: string
    parent_category: any
    createdAt: string
    updatedAt: string
    __v: number
}

export interface Product {
    _id: string
    product_name: string
    product_thumb: string
    product_description: string
    product_price: number
    product_quantity: number
    product_brand: string
    product_unit: string
    product_ratingAverage: number
    product_categories: string[]
    createdAt: string
    updatedAt: string
    product_slug: string
    __v: number
}

export interface Comment {
    _id: string
    comment_productId: string
    comment_userId: string
    comment_content: string
    comment_left: number
    comment_right: number
    comment_parentId: string
    createdAt: string
    updatedAt: string
    __v: number        
}