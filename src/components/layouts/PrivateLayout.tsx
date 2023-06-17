import React from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { ThemeProvider } from "../ThemeProvider";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div>
        <>
          <Header />
          <div>
            <Sidebar />
            <div className="format w-full p-4 md:pl-72  overflow-auto h-[calc(100vh-60px)]">{children}</div>
          </div>
        </>
      </div>
    </ThemeProvider>
  );
};

export default PrivateLayout;
