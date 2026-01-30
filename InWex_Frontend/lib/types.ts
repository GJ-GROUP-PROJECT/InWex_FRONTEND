export type Roles = {
    admin: boolean
    business: boolean
    manager: boolean
    warehouse_staff: boolean
}

export type UserData = {
    fullname: string
    email: string
    avatar: string
    roles: Roles
}

export type Product = {
    id: number
    name: string
    sku: string
    description: string
    unit_of_measure: string
    barcode: number
    cost_price: number
    selling_price: number
    image: string
    stock: number
    created_at: string
    updated_at: string
    category: string
    owner: number
}