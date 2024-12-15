import "./globals.css";

// Site title and description
export const metadata = {
    title: "Clix - Link Shortener",
    description: "A simple link shortener with custom short codes",
};

// Pages layout wrapper
export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}
