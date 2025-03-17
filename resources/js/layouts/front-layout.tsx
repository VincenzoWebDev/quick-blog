export default function FrontLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            {/* <Header /> */}
            <header className="bg-gray-800 text-white p-4">
                <div className="container mx-auto">
                    <h1 className="text-2xl">Quick Blog</h1>
                </div>
            </header>
            <main className="container mx-auto my-4">
                {children}
            </main>
            {/* <Footer /> */}
            <footer className="bg-gray-800 text-white p-4">
                <div className="container mx-auto">
                    <p>&copy; 2025 My Blog</p>
                </div>
            </footer>
        </div>
    );
}