'use client'

import Image from 'next/image'
import React, { FC } from 'react'
import Logo from '../../../public/logo.png';
import Input from '../components/Input';
import { LoginForm } from '../lib/types';
import { useForm } from 'react-hook-form';
import { isValidIranianMobile } from '../lib/utils';
import Button from '../components/Button';

type LoginUIProps = {
    onSubmit: () => void
    loading:boolean
}

const LoginUI: FC<LoginUIProps> = ({ onSubmit,loading }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>();   

    return (
        <div className="h-screen grid place-content-center bg-gray-50 dark:bg-gray-900 px-8">
            <div className="rounded-4xl shadow-lg p-11 flex flex-col gap-7 bg-white lg:w-[33vw] w-full">
                <div className="flex justify-center w-full mb-4">
                    <Image alt="logo" src={Logo} width={80} height={80} />
                </div>

                <span className="lg:text-xl sm:text-lg font-bold text-start text-gray-800 dark:text-gray-100">
                    برای شروع، شماره تماس خود را وارد کنید.
                </span>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                    <div className="w-full">
                        <Input
                            label="شماره تماس"
                            placeholder=".شماره تماس خود را وارد نمایید"
                            type="tel"
                            className="text-right placeholder:text-right"
                            error={errors.phone?.message}
                            {...register("phone", {
                                required: "شماره تماس الزامی است",
                                validate: (value) =>
                                    isValidIranianMobile(value) || "شماره تماس معتبر نیست",
                            })}
                        />

                    </div>

                    <div className="flex items-center gap-1 whitespace-nowrap">
                        <span>با ورود</span>
                        <Button variant="text">قوانین و شرایط</Button>
                        <span>استفاده را می پذیرم.</span>
                    </div>

                    <div className="w-full">
                        <Button type="submit" loading={loading}>تایید</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginUI