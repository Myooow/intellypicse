'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface RegisterFormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const RegisterForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>();

    const onSubmit: SubmitHandler<RegisterFormData> = async (
        data: RegisterFormData
    ) => {
        const res = await fetch('/api/auth/users', {
            method: 'POST',
            body: JSON.stringify(data),
        }).then((res) => res.json());

        console.log(res);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign up for an account
                    </h2>
                </div>
                <form
                    className="mt-8 space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">
                                Username
                            </label>
                            <input
                                id="username"
                                type="username"
                                autoComplete="username"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border
                             border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none
                             focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Username"
                                {...register('username', {
                                    required: 'Username is required',
                                })}
                            />
                            {errors.username && (
                                <p className="text-red-500 text-xs italic">
                                    {errors.username.message}
                                </p>
                            )}
                        </div>
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
                             border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none
                             rounded-b-md focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="sr-only"
                            >
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border
                             border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none
                             rounded-b-md focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Confirm Password"
                                {...register('confirmPassword', {
                                    required: 'Please confirm password',
                                })}
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-xs italic">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
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
                            Sign up
                        </button>
                    </div>
                </form>

                <div>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <a
                            href="#"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
