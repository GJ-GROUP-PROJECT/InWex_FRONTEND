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