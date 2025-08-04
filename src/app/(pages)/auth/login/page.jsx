'use client';

import React, {useState} from 'react';
import Link from 'next/link';
import Title from '@/src/app/components/Title';
import {useFormik} from 'formik';
import Input from '@/src/app/components/form/Input';
import {loginSchema} from '@/src/app/Schema/loginSchema';
import {FcGoogle} from 'react-icons/fc';
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import {signIn, getSession} from 'next-auth/react';
import {useRouter, useSearchParams} from 'next/navigation';
import {toast} from 'react-toastify';
import useUserStore from '@/src/app/redux/store/userStore';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const setUser = useUserStore((state) => state.setUser);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: async (values, actions) => {
            setLoading(true);
            try {
                const result = await signIn('credentials', {
                    redirect: false,
                    email: values.email,
                    password: values.password,
                });

                if (result?.error) {
                    toast.error("Invalid email or password");
                    return;
                }

                // Giriş başarılı, güncel session'ı al
                const session = await getSession();

                // Zustand store'a user bilgisini kaydet
                if (session?.user) {
                    setUser(session.user);
                }

                toast.success('Login successful!');
                router.push(callbackUrl);
            } catch (error) {
                toast.error(error.message || 'Login failed');
                console.error('Login error:', error);
            } finally {
                setLoading(false);
                actions.setSubmitting(false);
            }
        },
    });

    const inputData = [
        {id: 'email', name: 'email', placeholder: 'Your Email', type: 'email'},
        {id: 'password', name: 'password', placeholder: 'Your Password', type: 'password'},
    ];

    return (
        <div className={'container mx-auto py-20 h-full'}>
            <Title title={'Login'} desing={'text-5xl text-amber-600'}/>

            <form onSubmit={formik.handleSubmit}>
                <div className='max-w-[600px] mx-auto mt-10 px-2 flex flex-col lg:flex-row flex-wrap gap-8'>
                    <div className='flex-1 relative min-w-[360px] h-auto flex flex-col justify-between gap-6'>
                        {inputData.map((input) => (
                            <div className={'relative'} key={input.id}>
                                <Input
                                    id={input.id}
                                    type={input.type === 'password' ? (showPassword ? 'text' : 'password') : input.type}
                                    name={input.name}
                                    placeholder={input.placeholder}
                                    value={formik.values[input.name]}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isValid={formik.touched[input.name] && !formik.errors[input.name]}
                                />

                                {formik.touched[input.name] && formik.errors[input.name] && (
                                    <p className='text-red-500 text-sm mt-1'>{formik.errors[input.name]}</p>
                                )}

                                {input.type === 'password' && (
                                    <div
                                        className='absolute text-lg right-10 top-5 transform -translate-y-1/2 cursor-pointer text-gray-500'
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <FaEyeSlash/> : <FaEye/>}
                                    </div>
                                )}
                            </div>
                        ))}

                        <div className={'flex text-sm items-center gap-2 justify-end pe-4'}>
                            <span>Sifremi unuttum</span>
                            <Link href={"/auth/forgot-password"}
                                  className={'text-blue-700 font-semibold hover:underline '}>Password
                                reset </Link>
                        </div>

                        <div className='flex flex-col items-center justify-evenly gap-6 mb-6'>
                            <div className={'flex flex-col mt-4 gap-6 w-full'}>
                                <button
                                    type='submit'
                                    disabled={loading}
                                    className='px-8 py-3 text-sm bg-amber-400 hover:bg-amber-500 shadow-[2px_3px_7px_gray] transition-all duration-300 cursor-pointer text-gray-800 font-semibold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed'
                                >
                                    {loading ? 'Processing...' : 'LOGIN'}
                                </button>

                                <button
                                    type='button'
                                    onClick={() => signIn('google')}
                                    className='flex gap-2 items-center justify-center px-8 py-3 text-sm bg-gray-200 text-gray-800 hover:bg-amber-400 shadow-[2px_3px_7px_gray] transition-all duration-300 cursor-pointer font-semibold rounded-2xl'
                                >
                                    <FcGoogle size={24}/>
                                    <span>Continue with Google</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <div className={'flex items-center gap-2 justify-center font-exo text-sm mt-4'}>
                <span>If you do not have an account, please </span>
                <Link href={'/auth/register'} className={'font-semibold text-blue-700'}>
                    Register
                </Link>
            </div>
        </div>
    );
};

export default LoginPage;
