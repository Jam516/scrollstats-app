import { Metadata } from "next";

export const metadata: Metadata = {
    title: "ScrollStats - Developers",
    description: "A dashboard tracking developers on Scroll.",
};

export default async function AppsPage({ params }: { params: { slug: string[] } }) {

    return (
        <>
            <div className="flex justify-center items-center py-20">
                <h2 className="text-3xl font-bold tracking-tight">COMING SOON</h2>
            </div>
        </>
    );
};