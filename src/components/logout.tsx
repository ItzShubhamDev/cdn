"use client";

import { Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { BiLogOut } from "react-icons/bi";

export function Logout() {
    return (
        <Button
            isIconOnly
            onClick={() => signOut()}
        >
            <BiLogOut className="scale-x-[-1]" />
        </Button>
    );
}
