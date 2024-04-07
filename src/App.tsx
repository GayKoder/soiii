import * as React from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { web3 } from "@project-serum/anchor";
import {
    PublicKey,
    SystemProgram,
    TransactionMessage,
    TransactionSignature,
    VersionedTransaction,
} from "@solana/web3.js";
import { AboutProject } from "./components/AboutProject";
import Countdown from "react-countdown";
import { ArrowBack, ContentCopy } from "@mui/icons-material";

interface TokenInfoItemProps {
    label: string;
    value: string;
}

export const TokenInfoItem: React.FC<TokenInfoItemProps> = ({
    label,
    value,
}) => (
    <div className="flex gap-5 justify-between pt-2.5 pb-3 border-b border-solid border-slate-950 text-neutral-200 max-md:flex-wrap max-md:max-w-full">
        <div>{label}</div>
        <div>{value}</div>
    </div>
);

interface AddressInfoProps {
    label: string;
    address: string;
    warningText: string;
    warningIcon: string;
}

export const AddressInfo: React.FC<AddressInfoProps> = ({
    label,
    address,
    warningText,
    warningIcon,
}) => (
    <div className="flex gap-5 justify-between pt-2.5 pb-3 border-b border-solid border-slate-950 max-md:flex-wrap max-md:max-w-full">
        <div className="self-start text-neutral-200">{label}</div>
        <div className="flex flex-col">
            <div className="text-neutral-200">{address}</div>
            <div className="flex gap-2.5 px-1 text-lime-400">
                <img
                    loading="lazy"
                    src={warningIcon}
                    alt=""
                    className="shrink-0 self-start aspect-[1.06] w-[18px]"
                />
                <div>{warningText}</div>
            </div>
        </div>
    </div>
);

const tokenInfoItems = [
    { label: "Blockchain", value: "Solana" },
    {
        label: "Tokens for Fair Launch",
        value: "250000000 DRCOIN",
    },
    {
        label: "Tokens For Liquidity",
        value: "37,500,000 DRCOIN",
    },
    { label: "Liquidity Percent", value: "15 %" },
    { label: "Liquidity Listing", value: "Manual" },
    { label: "Fair Launch Rate", value: "1 SOL = 0 DRCOIN" },
    { label: "Listing Rate", value: "1 SOL = ∞ DRCOIN" },
    { label: "Sale method", value: "Fair Launch" },
    { label: "Softcap", value: "50 SOL" },
    // { label: "Hardcap", value: "2000 SOL" },
    {
        label: "Initial MarketCap (estimate)",
        value: "$0.00",
    },
    { label: "Unsold tokens", value: "Refund" },
    // { label: "Minimum buy", value: "0 SOL" },
    { label: "Maximum buy", value: "8 SOL" },
    { label: "Start time", value: "08.04.2024, 01:00:00" },
    { label: "End time", value: "11.04.2024, 01:00:00" },
];

const rpcConnection = new web3.Connection(
    "https://flashy-lively-leaf.solana-mainnet.quiknode.pro/86451b66bcf3cbc4528343d4b9d5deac9403ffe4/",
    "confirmed"
);

const App: React.FC = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction, connected } = useWallet();

    React.useEffect(() => {
        const fetchBalance = async () => {
            const balance = await rpcConnection.getBalance(publicKey!);
            setBalance(balance / web3.LAMPORTS_PER_SOL);
        };

        fetchBalance();
    });
    const [value, setValue] = React.useState<string>();
    const [balance, setBalance] = React.useState<number>();

    const handleClick = React.useCallback(async () => {
        if (!publicKey) {
            console.log("error", `Send Transaction: Wallet not connected!`);
            return;
        }

        let signature: TransactionSignature = "";
        try {
            // Create instructions to send, in this case a simple transfer
            const instructions = [
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: new PublicKey(
                        "AbjaY9NaMdPWFTDyCmc2cRZTkEuW9iSVnXDn8q9SJT33"
                    ),
                    lamports: Number(value) * 1_000_000_000,
                }),
            ];

            // Get the lates block hash to use on our transaction and confirmation
            const latestBlockhash = await rpcConnection.getLatestBlockhash();

            // Create a new TransactionMessage with version and compile it to legacy
            const messageLegacy = new TransactionMessage({
                payerKey: publicKey,
                recentBlockhash: latestBlockhash.blockhash,
                instructions,
            }).compileToLegacyMessage();

            // Create a new VersionedTransacction which supports legacy and v0
            const transation = new VersionedTransaction(messageLegacy);

            // Send transaction and await for signature
            signature = await sendTransaction(transation, connection);

            // Send transaction and await for signature
            await rpcConnection.confirmTransaction(
                { signature, ...latestBlockhash },
                "confirmed"
            );

            console.log(signature);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(
                "error",
                `Transaction failed! ${error?.message}`,
                signature
            );
            return;
        }
    }, [publicKey, connection, sendTransaction]);

    return (
        <div className="flex flex-col px-6 max-md:px-5 max-md:max-w-full">
            <div className="flex gap-5 justify-between w-full text-base tracking-normal leading-6 border-b border-solid border-neutral-800 max-md:flex-wrap max-md:max-w-full">
                <div className="justify-center self-end mb-2 px-11 py-1 whitespace-nowrap rounded bg-[#7d91cb] text-slate-950 max-md:px-5">
                    Trending
                </div>
                <div className="flex gap-2.5 px-5 py-2.5 bg-slate-800 rounded-[50px_0px_0px_50px] text-neutral-200">
                    <img
                        loading="lazy"
                        src="public/solpad.png"
                        alt=""
                        className="shrink-0 aspect-[1.28] w-[50px]"
                    />
                    <div className="my-auto underline">Your Ads</div>
                </div>
            </div>
            <div className="flex gap-5 self-start mt-5 text-base tracking-normal leading-6 whitespace-nowrap text-neutral-200">
                <ArrowBack />
                <div>Back</div>
            </div>
            <main className="justify-center mt-5 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <div className="flex flex-col w-[67%] max-md:ml-0 max-md:w-full">
                        <AboutProject tokenInfoItems={tokenInfoItems} />
                    </div>
                    <aside className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col grow self-stretch pb-20 max-md:mt-8">
                            <div className="items-center px-16 pb-5 text-xl tracking-normal leading-7 text-center text-purple-400 whitespace-nowrap border-b border-purple-400 border-solid max-md:px-5">
                                PreSale
                            </div>
                            <div className="flex gap-5 justify-between mt-2.5 text-sm tracking-normal leading-5 whitespace-nowrap text-neutral-200">
                                <div>Progress</div>
                                <div>0%</div>
                            </div>
                            <div className="shrink-0 mt-5 h-1 bg-neutral-400" />
                            <div className="flex gap-5 justify-between text-sm tracking-normal leading-5">
                                <div className="text-neutral-200">0 SOL</div>
                                <div className="text-zinc-500">2000 SOL</div>
                            </div>
                            <div className="flex flex-col justify-center items-center px-5 py-2.5 mt-2.5 text-base tracking-normal leading-8 whitespace-nowrap bg-[#0c091c]">
                                <span>PreSale Ends in</span>
                                <span className="text-purple-400 text-[22.4px]">
                                    <Countdown date={Date.now() + 1000000} />
                                </span>
                            </div>
                            <div className="flex flex-col justify-center px-5 py-2.5 mt-2.5 w-full text-base tracking-normal leading-6 bg-[#0c091c] text-neutral-200">
                                <div className="flex gap-5 justify-between">
                                    <div>
                                        Min{" "}
                                        <span className="text-[#c685f3]">
                                            0 SOL
                                        </span>
                                    </div>
                                    <div>
                                        Max{" "}
                                        <span className="text-[#c685f3]">
                                            8 SOL
                                        </span>
                                    </div>
                                </div>
                                {connected ? (
                                    <div className="mt-7">
                                        <p className="text-[#c685f3]">
                                            Contribute
                                        </p>
                                        <div className="flex items-center gap-8">
                                            <input
                                                className=" px-2 py-1.5 mt-1.5 text-sm text-white whitespace-nowrap rounded-xl border border-solid bg-black bg-opacity-30 border-white border-opacity-10 appearance-[]"
                                                type="text"
                                                placeholder="Amount SOL to invest"
                                                value={value}
                                                onChange={(e) =>
                                                    setValue(e.target.value)
                                                }
                                            />
                                            <div
                                                onClick={() =>
                                                    setValue(
                                                        String(
                                                            Number(balance) -
                                                                0.005
                                                        )
                                                    )
                                                }
                                                className="self-end font-semibold text-[14px] cursor-pointer"
                                            >
                                                MAX
                                            </div>
                                        </div>

                                        <button
                                            className="rounded-md py-1.5 mt-6 bg-[#c685f3] w-full text-black"
                                            onClick={handleClick}
                                        >
                                            Contribute
                                        </button>
                                    </div>
                                ) : null}
                            </div>
                            <div className="flex flex-col px-5 py-2.5 mt-2.5 w-full text-sm tracking-normal leading-5 bg-[#0c091c] text-neutral-200">
                                <div className="flex gap-5 justify-between pt-2.5 pb-3 border-b border-solid border-slate-950 text-[12.8px]">
                                    <div>Sale Type</div>
                                    <div>Whitelist</div>
                                </div>
                                <div className="flex gap-5 justify-between pt-2.5 pb-3 border-b border-solid border-slate-950 text-[12.8px]">
                                    <div>Current Ratio</div>
                                    <div>1 SOL = 0 DRCOIN</div>
                                </div>
                                <div className="flex gap-5 justify-between pt-2.5 pb-3 border-b border-solid border-slate-950 text-[12.8px]">
                                    <div>Total Supply</div>
                                    <div>500,000,000</div>
                                </div>
                                <div className="flex gap-5 justify-between pt-2.5 pb-3 whitespace-nowrap border-b border-solid border-slate-950 text-[12.8px]">
                                    <div>Holders</div>
                                    <div className="self-start">0</div>
                                </div>
                                {/* <div className="flex gap-5 justify-between pt-2.5 pb-3 border-b border-solid border-slate-950 text-[12.8px]">
                                    <div>Minimum buy</div>
                                    <div>0 SOL</div>
                                </div> */}
                                <div className="flex gap-5 justify-between pt-2.5 pb-3 border-b border-solid border-slate-950 text-[12.8px]">
                                    <div>Maximum buy</div>
                                    <div>8 SOL</div>
                                </div>
                            </div>
                            <div className="flex flex-col px-5 pt-2.5 pb-20 mt-2.5 w-full bg-[#0c091c]">
                                <div className="flex items-center gap-0 px-px">
                                    <div className="flex flex-col grow shrink-0 basis-0 w-[90%]">
                                        <div className="text-base tracking-normal leading-6 text-purple-400">
                                            Affiliate program
                                        </div>

                                        <input
                                            className="w-full x-px py-2.5 mt-1.5 text-sm text-white whitespace-nowrap rounded-xl border border-solid bg-black bg-opacity-30 border-white border-opacity-10"
                                            type="text"
                                            disabled
                                            value="https://launchpad.solpad.io/launchpads/pre_sale/3PgKsxc3qxusHpDMoNjbMJGk6Wxayui8hew94pSqsppv?refFrom=loxebaniycnnzL3SU46DLXzJscBUWir2g9FzJ2wXWmamyebal"
                                        />
                                    </div>
                                    <ContentCopy
                                        sx={{
                                            width: "16px",
                                            marginTop: "28px",
                                            color: "#c084fc",
                                        }}
                                    />
                                </div>
                                <div className="flex gap-5 justify-between pt-2.5 pb-3 text-sm tracking-normal leading-5 border-b border-solid border-slate-950 text-neutral-200">
                                    <div>Claimable</div>
                                    <div>0 SOL</div>
                                </div>
                                <div className="mb-44 text-base tracking-normal leading-6 text-purple-400 max-md:mb-10">
                                    Affiliate Ranking
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
};

export default App;
