'use client';

import Link from 'next/link';
import React from 'react';
import SidebarLogo from '/public/assets/images/logo-text.svg';
import Image from 'next/image';
import { navLinks } from '@/constants';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import { signOut, useSession } from 'next-auth/react';

const Sidebar = () => {
    const pathname = usePathname();
    const { status } = useSession();

    const isAuth = status === 'authenticated';

    return (
        <aside className="sidebar">
            <div className="flex size-full flex-col gap-4">
                <Link href="/" className="sidebar-logo">
                    <Image
                        src={SidebarLogo}
                        alt="logo"
                        width={180}
                        height={28}
                    />
                </Link>
                <nav className="sidebar-nav">
                    {isAuth ? (
                        <>
                            <ul className="sidebar-nav_elements">
                                {navLinks.slice(0, 6).map((link) => {
                                    const isActive = link.route === pathname;

                                    return (
                                        <li
                                            key={link.route}
                                            className={`sidebar-nav_element group ${isActive ? 'bg-purple-gradient text-white' : 'text-gray-700'}`}
                                        >
                                            <Link
                                                href={link.route}
                                                className="sidebar-link"
                                            >
                                                <Image
                                                    src={link.icon}
                                                    alt={link.label}
                                                    width={24}
                                                    height={24}
                                                    className={`${isActive && 'brightness-200'}`}
                                                />
                                                {link.label}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>

                            <ul className="sidebar-nav_elements">
                                {navLinks.slice(6).map((link) => {
                                    const isActive = link.route === pathname;

                                    return (
                                        <li
                                            key={link.route}
                                            className={`sidebar-nav_element group ${isActive ? 'bg-purple-gradient text-white' : 'text-gray-700'}`}
                                        >
                                            <Link
                                                href={link.route}
                                                className="sidebar-link"
                                            >
                                                <Image
                                                    src={link.icon}
                                                    alt={link.label}
                                                    width={24}
                                                    height={24}
                                                    className={`${isActive && 'brightness-200'}`}
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
                    ) : (
                        <div className="flex flex-col gap-2">
                            <Button
                                asChild
                                className="button bg-purple-gradient bg-cover"
                            >
                                <Link href="/sign-up">Register</Link>
                            </Button>
                            <Button
                                asChild
                                className="button bg-purple-gradient bg-cover"
                            >
                                <Link href="/sign-in">Login</Link>
                            </Button>
                        </div>
                    )}
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
