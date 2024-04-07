import {
    ArticleOutlined,
    CalculateOutlined,
    ExpandLess,
    ExpandMore,
    GavelOutlined,
    HandshakeOutlined,
    HomeOutlined,
    LockOpenOutlined,
    LockResetOutlined,
    RocketLaunchOutlined,
    TokenOutlined,
} from "@mui/icons-material";
import {
    Collapse,
    Divider,
    Drawer,
    ListItemIcon,
    ListItemText,
    Toolbar,
} from "@mui/material";

import SolpadLogo from "../public/solpad.png"

import List from "@mui/material/List";

import ListItemButton from "@mui/material/ListItemButton";
import { useState } from "react";

const drawerWidth = 300;

function Sidebar() {
    const [launchpadsOpen, setLaunchpadsOpen] = useState<boolean>();
    const [privateSaleOpen, setPrivateSaleOpen] = useState<boolean>();
    const [tokenBuilderOpen, setTokenBuilderOpen] = useState<boolean>();
    const [liquidityOpen, setLiquidityOpen] = useState<boolean>();

    const menuItems = [
        {
            title: "Home",
            icon: <HomeOutlined />,
            link: "https://launchpad.solpad.io/",
        },
        {
            title: "Launchpads",
            icon: <RocketLaunchOutlined />,
            children: [
                {
                    title: "Create PreSale",
                    link: "https://launchpad.solpad.io/launchpads/pre_sale/create_pre_sale",
                },
                {
                    title: "Create Fair Launch",
                    link: "https://launchpad.solpad.io/launchpads/fair_launch/create_fair",
                },
                {
                    title: "LaunchPad List",
                    link: "https://launchpad.solpad.io/launchpads/launchpad_list",
                },
            ],
            isOpen: launchpadsOpen,
            setOpen: setLaunchpadsOpen
        },
        {
            title: "Private Sale",
            icon: <LockResetOutlined />,
            children: [
                {
                    title: "Create Private Sale",
                    link: "https://launchpad.solpad.io/private_sale/create_private_sale",
                },
                {
                    title: "Private Sale List",
                    link: "https://launchpad.solpad.io/private_sale/private_sale_list",
                },
            ],
            isOpen: privateSaleOpen,
            setOpen: setPrivateSaleOpen
        },
        {
            title: "Token Builder",
            icon: <TokenOutlined />,
            children: [
                {
                    title: "Create Token",
                    link: "https://launchpad.solpad.io/token_locker/create_token",
                },
                {
                    title: "Create Lock",
                    link: "https://launchpad.solpad.io/token_locker/create",
                },
                {
                    title: "My Tokens Lock",
                    link: "https://launchpad.solpad.io/token_locker/my_tokens_lock",
                },
                {
                    title: "Lock List",
                    link: "https://launchpad.solpad.io/token_locker/locks",
                },
            ],
            isOpen: tokenBuilderOpen,
            setOpen: setTokenBuilderOpen
        },
        {
            title: "Liquidity",
            icon: <LockOpenOutlined />,
            children: [
                {
                    title: "LP Locker",
                    link: "https://launchpad.solpad.io/liquidity/create",
                },
                {
                    title: "My Liquidity Lock",
                    link: "https://launchpad.solpad.io/liquidity/my_liquidity_lock",
                },
                {
                    title: "All Liquidity Locks",
                    link: "https://launchpad.solpad.io/liquidity/locks",
                },
            ],
            isOpen: liquidityOpen,
            setOpen: setLiquidityOpen
        },
        {
            title: "Tokenomics Calculator",
            icon: <CalculateOutlined />,
            link: "https://tokenomics.solpad.io/",
        },
        {
            title: "Badges",
            icon: <GavelOutlined />,
            link: "https://spadwhitepaper.solpad.io/for-project-owners/solpad-badges",
        },
        {
            title: "Docs",
            icon: <ArticleOutlined />,
            link: "https://spadwhitepaper.solpad.io/",
        },
        {
            title: "Partners",
            icon: <HandshakeOutlined />,
            link: "https://spadwhitepaper.solpad.io/partnerships/marketing-support",
        },
    ];

    return (
        <div className="h-screen sticky top-0 flex flex-co">
            <Drawer
                variant="permanent"
                anchor="left"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        backgroundColor: "#080619",
                    },
                }}
            >
                <Toolbar className="flex flex-col justify-center pt-2">
                    <img
                        src={SolpadLogo}
                        alt="SPAD logo"
                        className="self-center max-w-full aspect-[1.25] w-[100px]"
                    />

                    <div className="w-full mt-3 flex justify-between text-white">
                        <span>$SPAD</span>
                        <span className="text-[#c685f3]">$0.149</span>
                    </div>
                </Toolbar>
                <Divider />
                <List
                    component="nav"
                    sx={{
                        color: "white",
                        marginTop: "7px",
                        fontWeight: "300",
                    }}
                >
                    {menuItems.map((item, index) =>
                        item.children ? (
                            <>
                                <ListItemButton
                                    onClick={() => item.setOpen!(!item.isOpen)}
                                    key={index}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        padding: "12px 24px",
                                        ":hover": {
                                            color: "white",
                                            backgroundColor: "#1E293A",
                                        },
                                    }}
                                    href={item!.link!}
                                    target="_blank"
                                >
                                    <ListItemIcon sx={{ color: "white" }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.title} />
                                    {item.isOpen ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse
                                    in={item.isOpen}
                                    timeout="auto"
                                    unmountOnExit
                                >
                                    {item.children.map((item, index) => {
                                        return (
                                            <ListItemButton
                                                key={index}
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    padding: "12px 24px",
                                                    ":hover": {
                                                        color: "white",
                                                        backgroundColor:
                                                            "#1E293A",
                                                    },
                                                }}
                                                href={item!.link!}
                                                target="_blank"
                                            >
                                                <ListItemIcon></ListItemIcon>
                                                <ListItemText
                                                    primary={item.title}
                                                />
                                            </ListItemButton>
                                        );
                                    })}
                                </Collapse>
                            </>
                        ) : (
                            <ListItemButton
                                key={index}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "12px 24px",
                                    ":hover": {
                                        color: "white",
                                        backgroundColor: "#1E293A",
                                    },
                                }}
                                href={item!.link!}
                                target="_blank"
                            >
                                <ListItemIcon
                                    sx={{
                                        color: "white",
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.title}
                                    sx={{ fontSize: "14px" }}
                                />
                            </ListItemButton>
                        )
                    )}
                </List>
            </Drawer>
        </div>
    );
}

export default Sidebar;
