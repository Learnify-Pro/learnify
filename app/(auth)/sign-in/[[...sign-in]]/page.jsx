import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <main className="flex h-screen items-center content-center justify-center">
            <div>
                <SignIn />;
            </div>
        </main>
    )
}