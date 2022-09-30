import Navbar from "./Navbar";
import DiscordStatus from "./DiscordStatus";

import React from "react";

const Layout: React.FC<{ children: React.ReactNode, path: string }> = ({ children, path }) => {
    return (
        <div className="px-10 md:20 xl:px-40 py-10">
            <Navbar path={path as string} />
            <main>{children}</main>
            <DiscordStatus />
        </div>
    )
}

export default Layout;