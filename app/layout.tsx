import "./globals.css";

export const metadata = {
  title: "Campusly | Course Registration",
  description: "Register for your next course with Campusly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
