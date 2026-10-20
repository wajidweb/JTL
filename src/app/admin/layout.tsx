import type { Metadata } from "next";
import "./admin.css";
import AdminShell from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: "Admin Portal | Journey Towards Life",
  description: "Management and Administration Portal for Journey Towards Life Autism & Special Education Centre.",
};

export const instant = false;

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="admin-body">
      <AdminShell>{children}</AdminShell>
    </div>
  );
}
