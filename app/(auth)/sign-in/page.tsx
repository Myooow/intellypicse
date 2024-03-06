'use client';

import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormData {
    email: string;
    password: string;
}

const LoginForm: React.FC = () => {
    const [error, setError] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        const { email, password } = data;
        const res = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        if (res?.error) return setError(res.error);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Log in to your account
                    </h2>
                    {error && <span>{error}</span>}
                </div>
                <form
                    className="mt-8 space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border
                           border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none
                           focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                {...register('email', {
                                    required: 'Email is required',
                                })}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs italic">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border
                           border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none
                           focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                {...register('password', {
                                    required: 'Password is required',
                                })}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-xs italic">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember_me"
                                name="remember_me"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label
                                htmlFor="remember_me"
                                className="ml-2 block text-sm text-gray-900"
                            >
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a
                                href="#"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm
                         font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none
                         focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <svg
                                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 4.5a.5.5 0 0 1 .5.5v1.5h1a.5.5 0 1 1 0 1h-1v1.5a.5.5 0 1 1-1 0v-1.5h-1a.5.5 0 0 1 0-1h1v-1.5a.5.5 0 0 1 .5-.5zm-7 11a.5.5 0 0 0 .5.5h12a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-12a.5.5 0 0 0-.5.5v9zm12.854-10.854a1 1 0 0 1 0 1.414l-3.5 3.5a1 1 0 0 1-1.414 0L3.854 6.56a1 1 0 1 1 1.414-1.415L9 9.586l2.293-2.293a1 1 0 0 1 1.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                            Sign in
                        </button>
                    </div>
                </form>

                <div>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Dont have an account?{' '}
                        <a
                            href="#"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
