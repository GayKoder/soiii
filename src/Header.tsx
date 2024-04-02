import * as React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { WarningAmber } from "@mui/icons-material";

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
}

export const MyButton: React.FC<ButtonProps> = ({ children, className = "" }) => {
    return (
        <button
            className={`justify-center px-5 py-2.5 bg-purple-400 rounded ${className}`}
        >
            {children}
        </button>
    );
};

interface ImageProps {
    src: string;
    alt: string;
    className?: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, className = "" }) => {
    return (
        <img
            loading="lazy"
            src={src}
            alt={alt}
            className={`shrink-0 my-auto max-w-full aspect-[5] w-[100px] ${className}`}
        />
    );
};

function Header() {
    return (
        <div className="z-50 bg-[#080619] w-full sticky top-0 flex flex-col">
            <div className="flex text-[#babd41] self-end gap-2 items-center justify-center pt-2 pr-2">
                <WarningAmber sx={{
                    width: "18px",
                    height: "18px",
                }} />
                Solana network is experiencing degraded perfomance. Transactions
                may fail to send or confirm
            </div>
            <div className="flex justify-end gap-5 py-3.5 pr-6 pl-20 font-medium text-slate-950 max-md:flex-wrap max-md:px-5">
                <Image
                    src="public/solana.png"
                    alt="Placeholder image"
                />
                <WalletMultiButton style={{
                    backgroundColor: "#c685f3",
                    color: "#090619",
                    padding: "9px 19px",
                    width: "auto"
                }}/>
            </div>
        </div>
    );
}

export default Header;
