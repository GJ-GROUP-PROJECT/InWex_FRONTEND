import { Bell, Import, Search, User } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import logo from '../assets/images/CompanyLogoZoomed-TransparentBG.png'

export function WMSHeader() {
    return (
        <header className="bg-card border-b border-border px-6 py-2 shadow-soft">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="bg-gradient-primary text-primary-foreground px-4 py-2 rounded-lg font-bold text-xl">
                        <img
                            className='h-20 w-auto'
                            src={logo}
                            alt='CompanyLogo'
                        />
                    </div>
                    <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                            placeholder="Search inventory..."
                            className="pl-10 w-64"
                        />
                    </div>

                    <Button variant="ghost" size="icon" className="relative">
                        <Bell className="h-5 w-5" />
                        <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            3
                        </span>
                    </Button>

                    <Button variant="ghost" size="icon">
                        <User className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </header>
    );
}