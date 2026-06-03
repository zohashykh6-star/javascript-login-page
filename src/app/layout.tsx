import type { Metadata } from "next";
import "./globals.css";

import { AuthProvider } from "@/hooks/useAuth";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Email Server",
  description: "Secure Email Server",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}