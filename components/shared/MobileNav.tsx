'use client';
import Link from 'next/link';
import SidebarLogo from '/public/assets/images/logo-text.svg';
import React from 'react';
import Image from 'next/image';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { navLinks } from '@/constants';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import { signOut, useSession } from 'next-auth/react';

const MobileNav = () => {
    const pathname = usePathname();
    const { status } = useSession();

    const isAuth = status === 'authenticated';

    return (
        <header className="header">
            <Link href="/" className="flex items-center gap-2 md:py-2">
                <Image src={SidebarLogo} alt="logo" width={180} height={28} />
            </Link>
            <nav className="flex gap-2">
                {isAuth ? (
                    <Sheet>
                        <SheetTrigger>
                            <Image
                                src="/assets/icons/menu.svg"
                                alt="menu"
                                width={32}
                                height={32}
                                className="cursor-pointer"
                            />
                        </SheetTrigger>
                        <SheetContent className="sheet-content sm:w-64">
                            <>
                                <Image
                                    src="/assets/images/logo-text.svg"
                                    alt="logo"
                                    width={152}
                                    height={23}
                                />

                                <ul className="header-nav_elements">
                                    {navLinks.map((link) => {
                                        const isActive =
                                            link.route === pathname;

                                        return (
                                            <li
                                                className={`${isActive && 'gradient-text'} p-18 flex whitespace-nowrap text-dark-700`}
                                                key={link.route}
                                            >
                                                <Link
                                                    className="sidebar-link cursor-pointer"
                                                    href={link.route}
                                                >
                                                    <Image
                                                        src={link.icon}
                                                        alt="logo"
                                                        width={24}
                                                        height={24}
                                                    />
                                                    {link.label}
                                                </Link>
                                            </li>
                                        );
                                    })}

                                    <Button
                                        className="sidebar-nav_element button bg-purple-gradient bg-cover"
                                        onClick={() =>
                                            signOut({ callbackUrl: '/' })
                                        }
                                    >
                                        Log out
                                    </Button>
                                </ul>
                            </>
                        </SheetContent>
                    </Sheet>
                ) : (
                    <>
                        <Button
                            asChild
                            className="button-sm bg-purple-gradient text-transparent bg-clip-text"
                            size={'sm'}
                        >
                            <Link href="/sign-up">Register</Link>
                        </Button>
                        <Button
                            asChild
                            className="button-sm bg-purple-gradient text-transparent bg-clip-text"
                            size={'sm'}
                        >
                            <Link href="/sign-in">Login</Link>
                        </Button>
                    </>
                )}
            </nav>
        </header>
    );
};

export default MobileNav;
