'use client'

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Logo from '../../../public/logo.png';

const Splash = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="h-screen grid place-content-center">
      <Image alt="splash logo" src={Logo} />
    </div>
  );
};

export default Splash;
