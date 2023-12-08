// import { siteConfig } from "@/config/site"

export function SiteFooter() {
    return (
        <footer className="py-6 md:px-8 md:py-0 border-t border-gray-300">
            <div className="container flex flex-col items-center justify-between gap-1 md:h-24 ">
                <div className="mt-4 pb-3 grid gap-10 grid-cols-1 md:grid-cols-2">
                    <div>
                        <p className="mb-4 text-center text-base font-semibold uppercase text-muted-foreground">
                            Powered By
                        </p>
                        <a
                            className="flex items-center justify-center"
                            href="https://www.allium.so/"
                            target="_blank"
                        >
                            <img src="/allium-logo.png" alt="Allium Logo" className="h-[50px]" />
                        </a>
                    </div>
                    <div className="flex flex-col ">
                        <p className="mb-4 text-center text-base font-semibold uppercase text-muted-foreground">
                            Built by{" "}
                            <a
                                href="https://twitter.com/0xKofi"
                                target="_blank"
                                rel="noreferrer"
                                className="font-medium underline underline-offset-4"
                            >
                                0xKofi
                            </a>
                            . The source code is available on{" "}
                            <a
                                href="https://github.com/Jam516/scrollstats-app"
                                target="_blank"
                                rel="noreferrer"
                                className="font-medium underline underline-offset-4"
                            >
                                GitHub
                            </a>
                            .
                        </p>
                        <p className="mb-4 text-center text-base font-semibold uppercase text-muted-foreground">
                            <a
                                href="https://www.scrollstats.com/users/week"
                                target="_blank"
                                rel="noreferrer"
                                className="font-medium underline underline-offset-4"
                            >
                                Scroll Users
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
