"use client"

import { useEffect, useRef, useState } from "react"
import { Staff } from "@/lib/types/types"
import {
    ArrowLeft, UserRound, BadgeCheck,
    MapPin, Mail, Phone, UserPlus, Activity, Settings2, Trash2, ShieldCheck,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
    Sheet, SheetContent, SheetHeader, SheetTitle,
    SheetTrigger, SheetDescription, SheetFooter
} from "@/components/ui/sheet"
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useWarehouse } from "@/contexts/WarehouseContext"
import { useStaff, AssignRoleValues } from "@/contexts/StaffContext"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AssignWarehouseSchema, AssignWarehouseValues } from "@/lib/schemas/staff/assignWarehouse.schema"

type RoleKey = "is_manager" | "is_warehouse_staff" | "none"

const ROLE_OPTIONS: { key: RoleKey; label: string; description: string }[] = [
    { key: "is_manager", label: "Manager", description: "Full access to staff, warehouses & reports" },
    { key: "is_warehouse_staff", label: "Warehouse Staff", description: "Scoped to assigned warehouse operations" },
    { key: "none", label: "No Role", description: "Account exists but has no assigned role" },
]

const RoleBadge = ({ label, active }: { label: string; active: boolean }) => (
    <div className={`flex items-center justify-between p-4 rounded-xl transition-all border ${active
        ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-500"
        : "bg-zinc-900/30 border-zinc-800/50 text-zinc-600"
        }`}>
        <span className="text-xs font-bold tracking-tight">{label}</span>
        {active ? (
            <BadgeCheck className="h-4 w-4 text-emerald-500" />
        ) : (
            <div className="h-4 w-4 rounded-full border-2 border-zinc-800" />
        )}
    </div>
)

const PermissionToggle = ({
    label,
    description,
    checked,
    onChange,
}: {
    label: string
    description: string
    checked: boolean
    onChange: (val: boolean) => void
}) => (
    <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl border transition-all ${checked
            ? "bg-emerald-500/5 border-emerald-500/20"
            : "bg-zinc-900/40 border-zinc-800 hover:border-zinc-700"
            }`}
    >
        <div className="space-y-0.5 text-left">
            <p className={`text-xs font-bold ${checked ? "text-emerald-400" : "text-zinc-300"}`}>{label}</p>
            <p className="text-[10px] text-zinc-500">{description}</p>
        </div>
        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${checked ? "border-emerald-500 bg-emerald-500" : "border-zinc-700"
            }`}>
            {checked && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
        </div>
    </button>
)

const RoleSelector = ({
    selected,
    onChange,
}: {
    selected: RoleKey
    onChange: (key: RoleKey) => void
}) => (
    <div className="space-y-2">
        {ROLE_OPTIONS.map((role) => {
            const isActive = selected === role.key
            return (
                <button
                    key={role.key}
                    type="button"
                    onClick={() => onChange(role.key)}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl border transition-all ${isActive
                        ? "bg-blue-500/5 border-blue-500/20"
                        : "bg-zinc-900/40 border-zinc-800 hover:border-zinc-700"
                        }`}
                >
                    <div className="space-y-0.5 text-left">
                        <p className={`text-xs font-bold ${isActive ? "text-blue-400" : "text-zinc-300"}`}>
                            {role.label}
                        </p>
                        <p className="text-[10px] text-zinc-500">{role.description}</p>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${isActive ? "border-blue-500 bg-blue-500" : "border-zinc-700"}`}>
                        {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                </button>
            )
        })}
    </div>
)

const getRoleKey = (staff: Staff): RoleKey => {
    if (staff.is_manager) return "is_manager"
    if (staff.is_warehouse_staff) return "is_warehouse_staff"
    return "none"
}

const getRoleLabel = (key: RoleKey) =>
    ROLE_OPTIONS.find(r => r.key === key)?.label ?? "No Role"

export const getLatestAssignment = (staff: Staff) => {
    if (!staff.assignments?.length) return undefined
    return [...staff.assignments].sort((a, b) => b.id - a.id)[0]
}

const StaffPage = ({ staff }: { staff: Staff }) => {
    const router = useRouter()
    const { warehouses, fetchWarehouses } = useWarehouse()
    const { staffs, assignWarehouse, assignRole, deleteStaff } = useStaff()

    const liveStaff = staffs.find(s => s.id === staff.id) ?? staff
    const latestAssignment = getLatestAssignment(liveStaff)

    const form = useForm<AssignWarehouseValues>({
        resolver: zodResolver(AssignWarehouseSchema),
        defaultValues: {
            staff: liveStaff.id,
            warehouse: latestAssignment?.warehouse ?? undefined,
            can_manage_inventory: latestAssignment?.can_manage_inventory ?? false,
            can_create_orders: latestAssignment?.can_create_orders ?? false,
        }
    })

    const [selectedRole, setSelectedRole] = useState<RoleKey>(getRoleKey(liveStaff))
    const [savedRole, setSavedRole] = useState<RoleKey>(getRoleKey(liveStaff))

    const watchWarehouse = useWatch({ control: form.control, name: "warehouse" })
    const watchCanManage = useWatch({ control: form.control, name: "can_manage_inventory" })
    const watchCanCreate = useWatch({ control: form.control, name: "can_create_orders" })

    const prevSnapshotRef = useRef<string>("")

    useEffect(() => {
        const assignment = getLatestAssignment(liveStaff)
        const snapshot = JSON.stringify({
            id: liveStaff.id,
            assignmentId: assignment?.id,
            warehouse: assignment?.warehouse,
            can_manage_inventory: assignment?.can_manage_inventory,
            can_create_orders: assignment?.can_create_orders,
            is_manager: liveStaff.is_manager,
            is_warehouse_staff: liveStaff.is_warehouse_staff,
        })

        if (snapshot === prevSnapshotRef.current) return
        prevSnapshotRef.current = snapshot

        const timer = setTimeout(() => {
            form.reset({
                staff: liveStaff.id,
                warehouse: assignment?.warehouse ?? undefined,
                can_manage_inventory: assignment?.can_manage_inventory ?? false,
                can_create_orders: assignment?.can_create_orders ?? false,
            })
            setSelectedRole(getRoleKey(liveStaff))
        }, 0)

        return () => clearTimeout(timer)
    }, [form, liveStaff])

    useEffect(() => {
        if (warehouses.length === 0) fetchWarehouses()
    }, [warehouses.length, fetchWarehouses])

    const assignedWarehouse = warehouses.find(w => w.id === watchWarehouse)

    const handleSave = form.handleSubmit(async (data) => {
        const rolePayload: AssignRoleValues = {
            is_manager: selectedRole === "is_manager",
            is_warehouse_staff: selectedRole === "is_warehouse_staff",
            is_active: liveStaff.is_active ?? true,
        }
        await Promise.all([
            assignWarehouse(data, latestAssignment?.id),
            assignRole(liveStaff.user.id, rolePayload),
        ])
        setSavedRole(selectedRole)
    })

    const handleDelete = async () => {
        await deleteStaff(staff.id)
        router.back()
    }

    const activeRoleKey = savedRole

    return (
        <div className="mt-6 md:mt-10 w-full px-4 sm:px-6 md:px-10 pb-16 space-y-6 max-w-7xl mx-auto">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="text-zinc-500 hover:text-white hover:bg-zinc-900/50 -ml-2 transition-colors w-fit h-9 text-xs font-medium"
                >
                    <ArrowLeft className="mr-2 h-3.5 w-3.5" />
                    Back to Directory
                </Button>

                <div className="flex items-center gap-3">
                    <Badge className={`${liveStaff.is_confirmed ? "bg-blue-500/10 text-blue-400" : "bg-orange-500/10 text-orange-400"} border-none px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest`}>
                        {liveStaff.is_confirmed ? "Verified Member" : "Verification Pending"}
                    </Badge>

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size="sm" className="bg-zinc-100 hover:bg-white text-zinc-950 rounded-lg h-9 px-4 text-xs font-bold gap-2 shadow-lg shadow-white/5">
                                <Settings2 size={14} />
                                Manage Staff
                            </Button>
                        </SheetTrigger>

                        <SheetContent className="bg-zinc-950 border-none text-white w-full sm:max-w-sm px-0 flex flex-col">
                            <SheetHeader className="space-y-0.5 px-5 pt-4 shrink-0">
                                <SheetTitle className="text-xl! font-bold text-white">Manage Staff</SheetTitle>
                                <SheetDescription className="text-xs text-zinc-500">
                                    Update roles, warehouse, and status for {liveStaff.user?.fullname ?? "this staff member"}.
                                </SheetDescription>
                            </SheetHeader>

                            <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">

                                {/* Role Assignment */}
                                <div className="space-y-3">
                                    <p className="text-[10px] uppercase tracking-[0.2em] font-black text-zinc-600">Role</p>
                                    <RoleSelector selected={selectedRole} onChange={setSelectedRole} />
                                </div>

                                <Separator className="bg-zinc-800/60" />

                                {/* Permissions */}
                                <div className="space-y-3">
                                    <p className="text-[10px] uppercase tracking-[0.2em] font-black text-zinc-600">Permissions</p>
                                    <PermissionToggle
                                        label="Can Create Orders"
                                        description="Allowed to create and submit new orders"
                                        checked={watchCanCreate}
                                        onChange={(val) => form.setValue("can_create_orders", val)}
                                    />
                                    <PermissionToggle
                                        label="Can Manage Inventory"
                                        description="Full access to inventory and stock settings"
                                        checked={watchCanManage}
                                        onChange={(val) => form.setValue("can_manage_inventory", val)}
                                    />
                                </div>

                                <Separator className="bg-zinc-800/60" />

                                {/* Warehouse Assignment */}
                                <div className="space-y-3">
                                    <p className="text-[10px] uppercase tracking-[0.2em] font-black text-zinc-600">Warehouse Assignment</p>

                                    <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-2">
                                        <Label className="text-xs text-zinc-500">Assigned warehouse</Label>
                                        <Select
                                            value={watchWarehouse ? String(watchWarehouse) : "unassigned"}
                                            onValueChange={(val) => form.setValue("warehouse", val === "unassigned" ? (undefined as unknown as number) : Number(val))}
                                        >
                                            <SelectTrigger className="w-full bg-zinc-900 border-zinc-700 text-zinc-200 text-xs rounded-lg h-9 focus:ring-1 focus:ring-emerald-500/50">
                                                <SelectValue placeholder="Unassigned" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-zinc-900 border-zinc-700 text-zinc-200">
                                                <SelectItem value="unassigned" className="text-xs text-zinc-500">Unassigned</SelectItem>
                                                {warehouses.map((wh) => (
                                                    <SelectItem key={wh.id} value={String(wh.id)} className="text-xs">
                                                        #{wh.id} — {wh.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <Separator className="bg-zinc-800/60" />

                                {/* Danger Zone */}
                                <div className="space-y-3">
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <button className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl bg-red-500/5 border border-red-500/20 hover:bg-red-500/10 transition-colors group">
                                                <div className="space-y-0.5 text-left">
                                                    <p className="text-xs font-bold text-red-400">Remove Staff Member</p>
                                                    <p className="text-[10px] text-red-400/50">Permanently deletes this staff account</p>
                                                </div>
                                                <Trash2 size={14} className="text-red-500/40 group-hover:text-red-400 transition-colors shrink-0" />
                                            </button>
                                        </AlertDialogTrigger>

                                        <AlertDialogContent className="bg-zinc-950 border border-zinc-800 text-white">
                                            <AlertDialogHeader>
                                                <AlertDialogTitle className="text-white text-base font-bold">
                                                    Remove {liveStaff.user?.fullname ?? "this staff member"}?
                                                </AlertDialogTitle>
                                                <AlertDialogDescription className="text-zinc-500 text-xs">
                                                    This will permanently delete their staff account and revoke all access. This cannot be undone.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter className="gap-2">
                                                <AlertDialogCancel className="bg-transparent border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white text-xs h-9 rounded-lg">
                                                    Cancel
                                                </AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={handleDelete}
                                                    className="bg-red-500 hover:bg-red-600 text-white text-xs h-9 rounded-lg font-bold"
                                                >
                                                    Yes, Remove
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>

                            </div>

                            <SheetFooter className="px-5 py-4 border-t border-zinc-800 bg-zinc-950 shrink-0">
                                <Button
                                    onClick={handleSave}
                                    className="w-full h-8 text-xs rounded-lg bg-zinc-100 text-zinc-950 font-bold hover:bg-white"
                                >
                                    Save Changes
                                </Button>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">

                {/* Left: Profile Card */}
                <Card className="lg:col-span-4 bg-zinc-950 border-none rounded-2xl overflow-hidden h-full">
                    <CardContent className="p-8 flex flex-col h-full">
                        <div className="flex flex-col items-center text-center gap-4 mb-8">
                            <div className="w-20 h-20 rounded-full bg-zinc-900 flex items-center justify-center border-4 border-zinc-800/50 shadow-inner">
                                <UserRound size={36} className="text-zinc-700" />
                            </div>
                            <div className="space-y-1">
                                <h1 className="text-xl font-bold text-white tracking-tight">
                                    {liveStaff.user?.fullname || "Unnamed Staff"}
                                </h1>
                                <div className="flex items-center justify-center gap-2 text-zinc-500">
                                    <Mail size={12} />
                                    <span className="text-xs font-medium">{liveStaff.user?.email || "No email"}</span>
                                </div>
                            </div>
                        </div>

                        <Separator className="bg-zinc-900 mb-8" />

                        <div className="space-y-5 mt-auto">
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-zinc-500 flex items-center gap-2.5 font-medium"><Phone size={14} /> Contact</span>
                                <span className="text-zinc-200 font-bold">{liveStaff.user?.contact_number || "N/A"}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-zinc-500 flex items-center gap-2.5 font-medium"><UserPlus size={14} /> Staff ID</span>
                                <span className="text-zinc-300 font-mono bg-zinc-900 px-2.5 py-1 rounded text-[10px] border border-zinc-800">#{liveStaff.id}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-zinc-500 flex items-center gap-2.5 font-medium"><Activity size={14} /> Status</span>
                                <span className={`font-black uppercase text-[10px] tracking-[0.15em] ${liveStaff.user?.user_status === "active" ? "text-emerald-500" : "text-red-400"}`}>
                                    {liveStaff.user?.user_status ?? "offline"}
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-zinc-500 flex items-center gap-2.5 font-medium"><ShieldCheck size={14} /> Role</span>
                                <span className={`font-black uppercase text-[10px] tracking-[0.15em] ${activeRoleKey !== "none" ? "text-blue-400" : "text-zinc-600"}`}>
                                    {getRoleLabel(activeRoleKey)}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Right: Info Column */}
                <div className="lg:col-span-8 flex flex-col gap-5 h-full">

                    {/* Location Card */}
                    <Card className="bg-zinc-950 border-none p-6 rounded-2xl">
                        <p className="text-zinc-600 text-[10px] uppercase tracking-[0.25em] font-black mb-4">Primary Location</p>
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-xl border ${assignedWarehouse ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-zinc-900/50 text-zinc-600 border-zinc-800"}`}>
                                <MapPin size={20} />
                            </div>
                            <div>
                                <span className="text-xl font-bold text-white block leading-tight">
                                    {assignedWarehouse?.name ?? "Unassigned"}
                                </span>
                                <span className="text-zinc-500 text-xs font-bold mt-0.5 block">
                                    {assignedWarehouse ? `Warehouse #${assignedWarehouse.id}` : "No warehouse assigned"}
                                </span>
                            </div>
                        </div>
                    </Card>

                    {/* Access Control Card */}
                    <Card className="bg-zinc-950 border-none rounded-2xl overflow-hidden flex-1 flex flex-col">
                        <CardHeader className="p-6">
                            <div className="space-y-1">
                                <CardTitle className="text-base font-bold text-white tracking-tight">Access Control</CardTitle>
                                <p className="text-zinc-500 text-xs font-medium">Security roles and platform permissions</p>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 pt-0 flex-1">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full content-start">
                                <RoleBadge label="Manager" active={activeRoleKey === "is_manager"} />
                                <RoleBadge label="Warehouse Staff" active={activeRoleKey === "is_warehouse_staff"} />
                                <RoleBadge label="Can Create Orders" active={latestAssignment?.can_create_orders ?? false} />
                                <RoleBadge label="Can Manage Inventory" active={latestAssignment?.can_manage_inventory ?? false} />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default StaffPage