import './globals.css';

export const metadata = {
  title: 'TinyLink',
  description: 'URL Shortener',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}