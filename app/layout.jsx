import './globals.css';

export const metadata = {
  title: 'Muhammad Athar — HSE Professional / Safety Officer',
  description: 'Portfolio of Muhammad Athar — NEBOSH IGC Safety Officer. Risk assessments, JSAs, permit-to-work and audit-grade HSE documentation. Pakistan-based, ready for Gulf roles.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='12' fill='%23090909'/%3E%3Ctext x='32' y='44' font-family='Arial Black,Arial' font-size='34' font-weight='900' fill='%23f2efeb' text-anchor='middle'%3EA%3C/text%3E%3Ccircle cx='50' cy='48' r='5' fill='%23e32b3c'/%3E%3C/svg%3E" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Anton&family=Caveat:wght@600&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
