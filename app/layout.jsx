import { Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import StoreProvider from "@/app/StoreProvider";
import AuthModal from "@/components/AuthModal";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ 
    subsets: ["latin"], 
    weight: ["400", "500", "600", "700"],
    display: "swap"
});

export const metadata = {
    title: "NexusMart — Modern Multi-Vendor Commerce Platform",
    description: "Discover and shop curated electronics, accessories, and tech lifestyle goods from verified independent sellers on NexusMart.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${jakarta.className} antialiased text-slate-800 bg-white`}>
                <StoreProvider>
                    <Toaster position="top-right" />
                    <AuthModal />
                    {children}
                </StoreProvider>
            </body>
        </html>
    );
}
