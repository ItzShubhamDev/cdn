"use client";

import { NavbarItem as NavItem } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarItem({
    href,
    name,
}: {
    href: string;
    name: string;
}) {
    const path = usePathname();
    return (
        <NavItem>
            <Link
                href={href}
                className={
                    "text-lg font-semibold bg-content1 p-2 px-4 rounded-md " +
                    (path === href ? "bg-content3" : "")
                }
            >
                {name}
            </Link>
        </NavItem>
    );
}
