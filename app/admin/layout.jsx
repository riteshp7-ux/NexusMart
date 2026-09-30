import AdminLayout from "@/components/admin/AdminLayout";

export const metadata = {
    title: "Admin Console — NexusMart",
    description: "Manage vendors, product approvals, platform coupons, and marketplace operations.",
};

export default function RootAdminLayout({ children }) {
    return (
        <AdminLayout>
            {children}
        </AdminLayout>
    );
}
