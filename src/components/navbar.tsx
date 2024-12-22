import { Navbar as Nav, NavbarContent } from "@nextui-org/react";
import NavbarItem from "./navbarItem";
import { ThemeToggle } from "./themeToggle";
import { Logout } from "./logout";

export default function Navbar() {
    return (
        <Nav>
            <NavbarContent className="w-full !justify-center">
                <NavbarItem href="/" name="Upload" />
                <NavbarItem href="/files" name="Files" />
            </NavbarContent>
            <ThemeToggle />
            <Logout />
        </Nav>
    );
}
