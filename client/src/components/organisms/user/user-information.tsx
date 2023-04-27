"use client";
import { readUser } from "@/api";
import { UserResponse } from "@/api/user/types";
import React, { useState, type FC, useEffect } from "react";

type UserInformaionProps = {
  id: string;
};

export const UserInformation: FC<UserInformaionProps> = ({ id }) => {
  const [user, setUser] = useState<UserResponse | null>(null);

  useEffect(() => {
    const getUser = async (id: string) => {
      const user = await readUser(id);
      if (user.type === "error") {
        console.log("Error:", user.error);
        return;
      }
      setUser(user.value);
    };
    getUser(id);
  }, [id]);

  return (
    <div>
      <div>UserInformation</div>
      <div className="flex justify-start gap-3">
        <div>{user?.data.img}</div>
        <div className="text-3xl">{user?.data.name}</div>
      </div>
    </div>
  );
};
