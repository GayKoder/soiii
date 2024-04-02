
import { AddressInfo, TokenInfoItem } from "../App";

type InfoItem = {
    label: string;
    value: string;
};

export const AboutProject = ({
    tokenInfoItems,
}: {
    tokenInfoItems: Array<InfoItem>;
}) => {
    return (
        <section className="relative flex flex-col grow justify-end self-stretch pb-1.5 pt-4 text-sm tracking-normal leading-5 max-md:mt-8 max-md:max-w-full">
            <div className="absolute top-[4px] right-24 justify-center px-2.5 py-0.5 text-sm tracking-normal leading-5 bg-[linear-gradient(75deg,#ECEE92_0%,#E6CF04_100%)] rounded-[50px] text-slate-950">
                Affiliate 2 %
            </div>

            <div className="absolute top-[4px] right-0 justify-center px-5 py-0.5 text-sm tracking-normal leading-5 bg-[linear-gradient(74deg,#8CD88C_0%,#55B655_100%)] rounded-[50px] text-slate-950">
                Sale live
            </div>
            <img
                loading="lazy"
                src="/img1.png"
                alt=""
                className="w-full aspect-[1.89] max-md:max-w-full"
            />
            <div className="flex justify-center items-center px-16 py-5 mt-1.5 bg-gray-900 rounded-none text-neutral-200 max-md:px-5 max-md:max-w-full">
                <div className="flex gap-5 justify-between max-w-full w-[471px] max-md:flex-wrap">
                    <div className="text-purple-400">About the Project</div>
                    <div>Token Information</div>
                    <div>Whitelist</div>
                </div>
            </div>
            <div className="justify-center px-5 py-2.5 mt-3.5 text-base leading-6 bg-[#0c091c] text-neutral-200 max-md:max-w-full">
                SOLANA's First MemeVerse coin! Built by @AnyPadio core team
                member, who made Anypad to multimillion market cap project Hold
                Puggle & welcome 3 adorable airdrops: Pug & Beagle, rivals to
                BabyDoge & Bonk. 🐶 🚀 Await the arrival of Father Snuggle, the
                family's superhero, delivering unmatched perks & airdrops!
            </div>
            <div className="flex flex-col px-5 py-2.5 mt-6 bg-[#0c091c] max-md:max-w-full">
                <div className="flex gap-5 justify-between pt-2.5 pb-3 whitespace-nowrap border-b border-solid border-slate-950 text-neutral-200 max-md:flex-wrap max-md:max-w-full">
                    <div>Blockchain</div>
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/2d2de5ce869f10dc7f9bee94728f48717243539df6e3d4ba32ef130241f41864?apiKey=6e3e8087278f4e9d922cc19244d71dbb&"
                        alt=""
                        className="shrink-0 w-6 aspect-[1.27]"
                    />
                </div>
                {tokenInfoItems.map((item, index) => (
                    <TokenInfoItem
                        key={index}
                        label={item.label}
                        value={item.value}
                    />
                ))}
                <AddressInfo
                    label="PreSale Address"
                    address="3PgKsxc3qxusHpDMoNjbMJGk6Wxayui8hew94pSqsppv"
                    warningText="Do not send SOL or tokens to the PreSale address!"
                    warningIcon="https://cdn.builder.io/api/v1/image/assets/TEMP/df2b09efcda6eb402b8b36b041ad266b3803e72b5bbdd80e96d6cf320ec21c17?apiKey=6e3e8087278f4e9d922cc19244d71dbb&"
                />
                <AddressInfo
                    label="Funds Address"
                    address="CNCtJfChHoMYBtQkJisBAtCbZs8AGibJVLGvCQhxyyvD"
                    warningText="Do not send SOL or tokens to the Funds address!"
                    warningIcon="https://cdn.builder.io/api/v1/image/assets/TEMP/071397399efecf44789c0e41e32cd6427eb75d9d2bb6e45bd19812ef9611da56?apiKey=6e3e8087278f4e9d922cc19244d71dbb&"
                />
            </div>
        </section>
    );
};
