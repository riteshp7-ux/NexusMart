import StoreLayout from "@/components/store/StoreLayout";

export const metadata = {
    title: "Vendor Portal — NexusMart",
    description: "Manage your storefront inventory, track customer orders, and analyze store analytics.",
};

export default function RootStoreLayout({ children }) {
    return (
        <StoreLayout>
            {children}
        </StoreLayout>
    );
}
