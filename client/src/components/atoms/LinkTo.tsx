import { FC, ReactNode } from 'react';
type TProps = {
  href: string;
  children: ReactNode;
  className?: string;
};
export const LinkTo: FC<TProps> = ({ href, children, className }) => {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
};
