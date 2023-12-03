import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import React, { ReactNode } from "react";

interface StatCardProps {
    title: string;
    content: ReactNode;
    // subheader: string;
    className?: string;
}

export function StatCard({ title, content, className }: StatCardProps) {
    return (
        <Card className={`shadow-custom ${className}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{content}</div>
                {/* <p className="text-xs text-muted-foreground">{subheader}</p> */}
            </CardContent>
        </Card>
    );
}
