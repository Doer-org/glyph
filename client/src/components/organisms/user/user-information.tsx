'use client';
import { readUser } from '@/api';
import { UserResponse } from '@/api/user/types';
import Image from 'next/image';
import React, { useState, type FC, useEffect } from 'react';

type UserInformaionProps = {
  id: string;
  token?: string;
};

export const UserInformation: FC<UserInformaionProps> = ({ id, ...props }) => {
  const [user, setUser] = useState<UserResponse | null>(null);

  useEffect(() => {
    const getUser = async (id: string) => {
      const user = await readUser(id, props.token);
      if (user.type === 'error') {
        console.log('Error:', user.error);
        return;
      }
      setUser(user.value);
    };
    getUser(id);
  }, [id]);

  const testuser = {
    data: { name: 'test', img: 'https://github.com/meow520.png' },
  };

  return (
    <div className="flex justify-start gap-3 lg:gap-8">
      {/* <Image
            src={user?.data.img}
            width={100}
            height={100}
            alt={"icon"}
            className="rounded-full"
          />
        <div className="text-3xl">{user?.data.name}</div> */}
      <div className="rounded-full">
        <Image
          src={testuser?.data.img}
          width={150}
          height={150}
          alt={'icon'}
          className="rounded-full"
        />
      </div>
      <div className="text-4xl my-auto font-bold">{testuser?.data.name}</div>
    </div>
  );
};
