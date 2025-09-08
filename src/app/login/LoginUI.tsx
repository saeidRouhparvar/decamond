'use client'

import Image from 'next/image'
import React, { FC } from 'react'
import Logo from '../../../public/logo.png';
import { LoginForm } from '../lib/types';
import { useForm } from 'react-hook-form';
import { isValidIranianMobile } from '../lib/utils';
import { Button, Input } from '../components/ui';

type LoginUIProps = {
  onSubmit: () => void
  loading: boolean
}

const LoginUI: FC<LoginUIProps> = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  return (
    <div className="h-screen grid place-content-center bg-gray-50 px-4 sm:px-8">
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl rounded-3xl shadow-lg p-6 sm:p-8 md:p-11 flex flex-col gap-6 sm:gap-7 bg-white dark:bg-gray-800">
        <div className="flex justify-center w-full mb-4">
          <Image alt="logo" src={Logo} width={80} height={80} />
        </div>

        <span className="text-base sm:text-lg md:text-xl font-bold text-start text-gray-800 dark:text-gray-100">
          To get started, please enter your phone number.
        </span>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 sm:gap-6">
          <Input
            label="Phone Number"
            placeholder="Enter your phone number"
            type="tel"
            error={errors.phone?.message}
            {...register("phone", {
              required: "Phone number is required",
              validate: (value) =>
                isValidIranianMobile(value) || "Invalid phone number",
            })}
          />

          <div className="flex flex-wrap items-center gap-1 text-sm sm:text-base">
            <span>By continuing, I accept the</span>
            <Button variant="text">Terms & Conditions</Button>
            <span>.</span>
          </div>

          <Button type="submit" loading={loading} >
            Submit
          </Button>
        </form>
      </div>
    </div>
  )
}

export default LoginUI
