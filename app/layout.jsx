import "./globals.css";
import Nav from "./components/Nav";

export const metadata = {
  title: "insta-pix - Polaroid Generator",
  description: "Create beautiful polaroid memories",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-grid-pattern">
        <Nav />
        {children}
      </body>
    </html>
  )
}