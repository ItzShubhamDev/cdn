import { Spinner } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Protected({ children }: { children: React.ReactNode }) {
    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/api/auth/signin");
        },
    });

    if (status === "loading") {
        return (
            <div className="flex w-full h-screen items-center justify-center">
                <Spinner size="lg" color="default" />
            </div>
        );
    }

    return children;
}
