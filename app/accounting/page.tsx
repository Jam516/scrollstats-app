"use client"

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardDescription,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { getAccountingData } from "@/app/actions/getAccountingData";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";

type DownloadStatus =
    | "Download"
    | "Requesting..."
    | "Bundling..."
    | "Downloaded"
    | "Error";

function DownloadBlock() {
    const [downloadStatus, setDownloadStatus] = useState<DownloadStatus>("Download");
    const { toast } = useToast()

    // Define your form schema using Zod
    const DateSchema = z.object({
        start: z.string(),
        end: z.string(),
    });

    // Initialize your form
    const form = useForm<z.infer<typeof DateSchema>>({
        resolver: zodResolver(DateSchema),
        defaultValues: {
            start: "2024-02-01",
            end: "2024-02-29",
        },
    })

    // Define the main function to handle the token send action
    async function onSubmit(values: z.infer<typeof DateSchema>) {

        // Destructure values for easier access and readability
        const { start, end } = values;

        // Early return if the token is not selected
        if (!start) {
            console.log('Please select a start date');
            return;
        }

        // Start the user operation request process
        setDownloadStatus("Requesting...");
        let data;
        // Call the API
        try {
            data = await getAccountingData({ start, end });
        } catch (error) {
            // Handle any errors that occur during the user operation request
            console.error('Error calling API:', error);
            setDownloadStatus("Error");
            toast({
                variant: "destructive",
                title: "Error calling API",
            });
            setTimeout(() => setDownloadStatus("Download"), 5000);
            return;
        }

        // Generate and download the csv
        setDownloadStatus("Bundling...");
        try {
            // Convert JSON to CSV
            const csvRows = [];
            const headers = Object.keys(data.report[0]);
            csvRows.push(headers.join(','));
            for (const row of data.report) {
                const values = headers.map(header => {
                    const escaped = ('' + row[header]).replace(/"/g, '\\"');
                    return `"${escaped}"`;
                });
                csvRows.push(values.join(','));
            }
            const csvString = csvRows.join('\n');
            // Create a Blob from the CSV string
            const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
            // Create a link element
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'data.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            // Programmatically click the link to download the file
            link.click();
            // Clean up
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error bundling data into csv', error);
        }

        setDownloadStatus("Downloaded");
        toast({
            title: "Download Successful!"
        });
        setTimeout(() => {
            setDownloadStatus("Download");
        }, 5000);

    }


    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="start"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Start Date</FormLabel>
                                <FormControl>
                                    <Input placeholder="YYYY-MM-DD" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="end"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>End Date</FormLabel>
                                <FormControl>
                                    <Input placeholder="YYYY-MM-DD" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full"
                        disabled={downloadStatus !== "Download"}>
                        {downloadStatus}
                    </Button>
                </form>
            </Form>
        </>
    );
}


export default function AccountingPage() {

    return (
        <>
            <div className="flex flex-col">
                <div className="flex-1 space-y-4 p-8 pt-3">
                    <div className="hidden h-full flex-1 flex-col space-y-2 p-2 md:flex">
                        <Card className="border-black shadow-custom shadow bg-card-bg">
                            <CardHeader>
                                <CardTitle>Scroll Accounting</CardTitle>
                                <CardDescription>Download Scroll cost/revenue data</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <DownloadBlock />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
};