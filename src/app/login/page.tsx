'use client'

import { useFetchRandomUser } from '../services/mutation/usePostLogin';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import LoginUI from './LoginUI';

const Login = () => {
    const router = useRouter()

    const { mutate,  isPending } = useFetchRandomUser()
    const onSubmit = () => {
        mutate(undefined, {
            onSuccess: (res) => {
                localStorage.setItem('userData', JSON.stringify(res))
                router.replace('/dashboard')
                toast.success('با موفقیت وارد شدید.')
            }
        });

    };

    return <LoginUI onSubmit={onSubmit} loading={isPending} />
};

export default Login;
