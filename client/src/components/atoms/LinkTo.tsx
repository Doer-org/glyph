import Link from 'next/link';
import { FC, ReactNode } from 'react';
type TProps = {
  href: string;
  children: ReactNode;
  className?: string;
};
export const LinkTo: FC<TProps> = ({ href, children, className }) => {
  return (
    <Link href={href} className={className} prefetch={false}>
      {children}
    </Link>
  );
};
