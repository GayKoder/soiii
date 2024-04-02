import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Sidebar from "./Sidebar.tsx";
import Header from "./Header.tsx";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import {
    SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
    ConnectionProvider,
    WalletProvider,
} from "@solana/wallet-adapter-react";
import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ConnectionProvider endpoint="http://127.0.0.1:8899">
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <div className="flex">
                        <Sidebar />
                        <div className="flex flex-col">
                            <Header />
                            <App />
                        </div>
                    </div>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    </React.StrictMode>
);
