'use client'

import React, { useState, useEffect } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function DesktopBlocker() {
    const [showDialog, setShowDialog] = useState(false);
    const [message, setMessage] = useState('');
    const [headerMessage, setHeaderMessage] = useState('');

    useEffect(() => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
            setMessage('Sorry, the Apps page is desktop only');
            setHeaderMessage('Visit on Desktop');
            setShowDialog(true);
        }
        else {
            setShowDialog(false);
        }
    }, []);

    return showDialog ? (
        <div>
            <AlertDialog open={true}>
                <AlertDialogTrigger>Open</AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{headerMessage}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {message}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    ) : null;
}