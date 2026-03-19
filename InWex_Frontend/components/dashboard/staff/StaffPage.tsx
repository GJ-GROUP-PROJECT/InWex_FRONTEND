"use client"

import { useState } from "react"
import { Staff } from "@/lib/types/types"
import {
    ArrowLeft, ShieldCheck, UserRound, BadgeCheck,
    MapPin, Mail, Phone, UserPlus, Activity, Settings2,
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
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const RoleBadge = ({ label, active }: { label: string; active: boolean }) => (
    <div className={`flex items-center justify-between p-3 rounded-xl transition-all ${active
        ? "bg-emerald-500/10 text-emerald-500"
        : "bg-zinc-900/30 text-zinc-600"
        }`}>
        <span className="text-xs font-semibold tracking-tight">{label}</span>
        {active ? (
            <BadgeCheck className="h-3.5 w-3.5 text-emerald-500" />
        ) : (
            <div className="h-3.5 w-3.5 rounded-full border-2 border-zinc-800" />
        )}
    </div>
)

const StaffPage = ({ staff }: { staff: Staff }) => {
    const router = useRouter()

    const [roles, setRoles] = useState({
        is_warehouse_staff: staff.user.is_warehouse_staff,
        is_manager: staff.user.is_manager,
    })

    const handleUpdateRoles = async () => {
        console.log("updating")
    }

    return (
        <div className="mt-6 md:mt-10 w-full px-4 sm:px-6 md:px-10 pb-16 space-y-6">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="text-zinc-500 hover:text-white hover:bg-zinc-900/50 -ml-2 transition-colors w-fit h-8 text-xs"
                >
                    <ArrowLeft className="mr-1.5 h-3 w-3" />
                    Back to Directory
                </Button>

                <div className="flex items-center gap-2">
                    <Badge className={`${staff.is_confirmed ? "bg-blue-500/10 text-blue-400" : "bg-orange-500/10 text-orange-400"} border-none px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider`}>
                        {staff.is_confirmed ? "Verified Member" : "Verification Pending"}
                    </Badge>

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size="sm" className="bg-zinc-100 hover:bg-white text-zinc-950 rounded-lg h-8 text-xs font-bold gap-1.5">
                                <Settings2 size={12} />
                                Manage Access
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="bg-zinc-950 border-none text-white sm:max-w-sm px-2">
                            <SheetHeader className="space-y-2">
                                <SheetTitle className="text-lg font-bold text-white">Edit Staff Roles</SheetTitle>
                                <SheetDescription className="text-xs text-zinc-500">
                                    Modify permissions for {staff.user.fullname}. Changes take effect immediately.
                                </SheetDescription>
                            </SheetHeader>

                            <div className="py-6 px-4 space-y-4">
                                <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-zinc-900/50 border border-zinc-800">
                                    <div className="space-y-0.5">
                                        <Label className="text-xs font-semibold">Warehouse Staff</Label>
                                        <p className="text-[10px] text-zinc-500">Can view inventory and process orders</p>
                                    </div>
                                    <Switch
                                        checked={roles.is_warehouse_staff}
                                        onCheckedChange={(val) => setRoles(prev => ({ ...prev, is_warehouse_staff: val }))}
                                    />
                                </div>

                                <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-zinc-900/50 border border-zinc-800">
                                    <div className="space-y-0.5">
                                        <Label className="text-xs font-semibold">Inventory Manager</Label>
                                        <p className="text-[10px] text-zinc-500">Full access to warehouse and staff settings</p>
                                    </div>
                                    <Switch
                                        checked={roles.is_manager}
                                        onCheckedChange={(val) => setRoles(prev => ({ ...prev, is_manager: val }))}
                                    />
                                </div>
                            </div>

                            <SheetFooter>
                                <Button
                                    onClick={handleUpdateRoles}
                                    className="mx-auto bg-emerald-500 hover:bg-emerald-600 text-white font-bold h-8 text-xs rounded-lg px-6"
                                >
                                    Save Changes
                                </Button>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">

                {/* Profile Card */}
                <Card className="lg:col-span-1 bg-zinc-950 border-none rounded-xl overflow-hidden flex flex-col pb-0 h-full">
                    <div className="aspect-square bg-zinc-900/20 flex items-center justify-center p-6 shrink-0">
                        <div className="w-20 h-20 rounded-full bg-zinc-900 flex items-center justify-center border-4 border-zinc-950 shadow-xl overflow-hidden">
                            <UserRound size={36} className="text-zinc-700" />
                        </div>
                    </div>
                    <CardContent className="p-5 space-y-4 grow flex flex-col">
                        <div className="space-y-1 text-center sm:text-left">
                            <h1 className="text-xl font-bold text-white tracking-tight leading-tight">
                                {staff.user?.fullname || "Unnamed Staff"}
                            </h1>
                            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-zinc-500">
                                <Mail size={12} />
                                <span className="text-xs font-medium">{staff.user?.email || "No email"}</span>
                            </div>
                        </div>
                        <Separator className="bg-zinc-900" />
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-zinc-500 flex items-center gap-2"><Phone size={12} /> Contact</span>
                                <span className="text-zinc-200 font-semibold">{staff.user?.contact_number || "N/A"}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-zinc-500 flex items-center gap-2"><UserPlus size={12} /> Staff ID</span>
                                <span className="text-zinc-300 font-mono bg-zinc-900/50 px-2 py-0.5 rounded text-[10px]">#{staff.id}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-zinc-500 flex items-center gap-2"><Activity size={12} /> Status</span>
                                <span className="text-emerald-500 font-bold uppercase text-[10px] tracking-widest">{staff.user?.user_status || "offline"}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Right Side */}
                <div className="lg:col-span-2 flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 shrink-0">
                        <Card className="bg-zinc-950 border-none p-5 rounded-xl flex flex-col justify-center h-32">
                            <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-bold">Primary Location</p>
                            <div className="flex items-center gap-3 mt-3">
                                <div className="p-2 bg-zinc-900 rounded-lg text-emerald-500">
                                    <MapPin size={16} />
                                </div>
                                <div>
                                    <span className="text-lg font-bold text-white block">Warehouse</span>
                                    <span className="text-zinc-600 text-xs font-medium">Loc #{staff.warehouse || "01"}</span>
                                </div>
                            </div>
                        </Card>

                        <Card className="bg-zinc-950 border-none p-5 rounded-xl flex flex-col justify-center h-32">
                            <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-bold">Area Access</p>
                            <div className="flex items-center gap-3 mt-3">
                                <div className="p-2 bg-zinc-900 rounded-lg text-blue-500">
                                    <ShieldCheck size={16} />
                                </div>
                                <div>
                                    <span className="text-lg font-bold text-white block">{staff.sections || 0} Areas</span>
                                    <span className="text-zinc-600 text-xs font-medium">Section Access</span>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Access Control */}
                    <Card className="bg-zinc-950 border-none rounded-xl overflow-hidden flex flex-col">
                        <CardHeader className="p-5 pb-0">
                            <div className="space-y-0.5">
                                <CardTitle className="text-sm font-bold text-white tracking-tight">Access Control</CardTitle>
                                <p className="text-zinc-500 text-xs">Security roles and platform permissions</p>
                            </div>
                        </CardHeader>
                        <CardContent className="p-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <RoleBadge label="Warehouse Staff" active={staff.user.is_warehouse_staff} />
                                <RoleBadge label="Inventory Manager" active={staff.user.is_manager} />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default StaffPage