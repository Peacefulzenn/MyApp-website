import { ReactNode } from 'react';
import './globals.css'; // Correct path for a file in the same directory (src/app)

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My Dashboard App</title>
      </head>
      <body className="bg-gray-50">
        <div className="flex flex-col">
          {/* Main layout wrapper */}
          <div className="flex">
            {children} {/* Render the page content here */}
          </div>
        </div>
      </body>
    </html>
  );
};

export default Layout;
