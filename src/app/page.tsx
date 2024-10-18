"use client";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const togleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <button onClick={togleTheme} className="dark:text-white text-red-500">
          heloo
        </button>
      </main>
    </div>
  );
}
