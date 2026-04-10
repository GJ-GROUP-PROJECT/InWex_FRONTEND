export type Roles = {
    admin: boolean
    business: boolean
    manager: boolean
    warehouse_staff: boolean
}

export type UserData = {
    id: number
    avatar: string
    fullname: string
    email: string
    contact_number: number
    roles: Roles
}

export type Users = {
    id: number
    slug: string
    fullname: string
    email: string
    contact_number: number
    user_status: string
    is_warehouse_staff: boolean
    is_manager: boolean
    is_active: boolean
}

export type Product = {
    id: number
    name: string
    slug: string
    sku: string
    description: string
    unit_of_measure: string
    barcode: string
    cost_price: string
    selling_price: string
    image: string
    total_stock: number
    warehouse_stocks: Stock
    is_perishable: boolean
    created_at: string
    updated_at: string
    category: number
    owner: number
    status: string
}

export type Category = {
    id: number
    name: string
    description: string
}

export type Stock = {
    id: number
    quantity: number
}

export type Warehouse = {
    id: number
    name: string
    company: number
    created_at: string
}

export type Section = {
    id: number
    name: string
    warehouse: string
    created_at: string
}

export type Assignment = {
    id: number
    staff: number
    warehouse: number
    can_manage_inventory: boolean
    can_create_orders: boolean
    assigned_at: string
}

export type Staff = {
    id: number
    fullname: string
    contact_number: string
    company: number
    warehouse: number
    sections: number
    is_confirmed: boolean
    is_manager: boolean
    is_warehouse_staff: boolean
    is_active: boolean
    user: Users
    assignments: Assignment[]
}

export type Orders = {
    id: number
    reference: string
    order_type: "Inbound" | "Outbound"
    status: "Requested" | "In_Progress" | "Delivered" | "Returned" | "Cancelled"
    notes: string
    created_at: string
    client: string
    items: OrderItems[]
}

export type OrderItems = {
    id: number
    product: Product
    quantity: number
    unit_price: string
    expiry_date?: string
}

export type OrderStatusCount = {
    request: number
    in_progress: number
    delivered: number
    return: number
}