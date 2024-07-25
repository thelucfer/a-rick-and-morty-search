import type { Metadata } from "next";
import clsx from "clsx";
import "@/lib/styles/main.css";
import { Barlow, Fira_Sans, JetBrains_Mono } from "next/font/google";
import styles from "./Layout.module.css";

const firaSans = Fira_Sans({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-fira-sans",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-barlow",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rings AI Coding Test",
  description: "By Lucas C. Ferreira / lucfer.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx([
          barlow.variable,
          firaSans.variable,
          jetBrainsMono.variable,
        ])}
      >
        <header className={styles.header}>A Rick And Morty search</header>
        <main className={styles.main}>{children}</main>
        <footer className={styles.footer}>
          made by
          <a className={styles.link} href="https://lucfer.dev">
            Lucas
          </a>
        </footer>
      </body>
    </html>
  );
}
