"use client";

import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { BiMoon, BiSun } from "react-icons/bi";

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <Button
            isIconOnly
            onClick={() => {
                theme == "light" ? setTheme("dark") : setTheme("light");
            }}
        >
            {theme == "light" ? <BiMoon /> : <BiSun />}
        </Button>
    );
}
