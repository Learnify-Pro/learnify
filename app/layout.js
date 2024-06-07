import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Loading from "./components/Loading";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={outfit.className}>
          
            <div>
              <div>
                <div>{children}</div>
              </div>
            </div>
        </body>
      </ClerkProvider>
    </html>
  );
}
