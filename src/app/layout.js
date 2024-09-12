import "./globals.css";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet"
      />
      </head>
      <body className="h-full overflow-hidden">
        <div className="h-full overflow-hidden" >
          {children}
          </div>
      </body>
    </html>
  );
}
