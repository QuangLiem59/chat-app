import Head from "next/head";
import Notification from "./(entry)/context/Notificatiton";
import "./globals.css";
import { Inter } from "next/font/google";
import AuthContext from "./(entry)/context/AuthContext";
import ActiveStatus from "./sharedComponents/ActiveStatus";
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chat App",
  description: "Chat App",
  icons: {
    icon: "images/chatIcon.png",
    shortcut: "images/chatIcon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <Analytics />
          <Notification />
          <ActiveStatus />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
