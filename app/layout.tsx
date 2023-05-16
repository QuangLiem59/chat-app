import Head from "next/head";
import Notification from "./(src)/context/Notificatiton";
import "./globals.css";
import { Inter } from "next/font/google";
import AuthContext from "./(src)/context/AuthContext";

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
          <Notification />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
