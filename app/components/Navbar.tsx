'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react';

const Navbar: React.FC = () => {
    const { data, status } = useSession();
    const isAuth = status === 'authenticated';

    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <span className="text-white">Logo</span>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            <div className="ml-3 relative">
                                {isAuth ? (
                                    <>
                                        <p>{data?.user?.email}</p>
                                        <button onClick={() => signOut()}>
                                            logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link href="/sign-in">Sign in</Link>
                                        <Link href="/sign-up">Sign up</Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
