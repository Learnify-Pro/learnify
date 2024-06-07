import Sidebar from "@/app/Main/components/Sidebar";

export default function RootLayout({ children }) {
    return (

        <div>
            <div>
                <Sidebar />
                <div className="mt-16">{children}</div>
            </div>
        </div>

    );
}
