'use client'

import { useFetchRandomUser } from '../services/mutation/usePostLogin';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import LoginUI from './LoginUI';
import { LoginResponseType } from '../lib/types';

const Login = () => {
    const router = useRouter()

    const { mutate,  isPending } = useFetchRandomUser()
    const onSubmit = () => {
        mutate(undefined, {
            onSuccess: (res:LoginResponseType) => {
                const name = `${res?.results?.[0]?.name?.title}. ${res?.results?.[0]?.name?.first} ${res?.results?.[0]?.name?.last}`
                localStorage.setItem('userData', JSON.stringify(res))
                router.replace('/dashboard')
                toast.success(`Welcome ${name}`)
            }
        });

    };

    return <LoginUI onSubmit={onSubmit} loading={isPending} />
};

export default Login;
