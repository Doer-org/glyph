import { redirect } from 'next/navigation';
import { getToken } from '../api/get-token';
import { getLoggedInUser } from '@/api';

type Props = {
  children: React.ReactNode;
};

export const Auth = async (props: Props) => {
  const token = getToken();
  if (!token) redirect(`${process.env.NEXT_PUBLIC_FRONT_URL}`);
  // const u = await getLoggedInUser(token);
  // console.log(u);
  return <>{props.children}</>;
};
