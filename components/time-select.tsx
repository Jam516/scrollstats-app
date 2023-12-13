"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from "react";

export function TimeSelect() {
    const router = useRouter();
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState("week");

    const handleSelect = (newValue: string) => {
        const segments = pathname.split("/");
        const pathcore = segments.slice(0, 2).join('/');
        return router.push(`${pathcore}/${newValue}`);
    };

    useEffect(() => {
        const slugTime = pathname.split("/")[2];
        if (slugTime === undefined) {
            setActiveTab("week");
        } else {
            setActiveTab(slugTime);
        }
    }, [pathname]);

    return (
        <Select onValueChange={handleSelect} value={activeTab} >
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Toggle Bar Chart Settings" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="month">MONTHLY CHARTS</SelectItem>
                <SelectItem value="week">WEEKLY CHARTS</SelectItem>
                <SelectItem value="day">DAILY CHARTS</SelectItem>
            </SelectContent>
        </Select>
    )
}
