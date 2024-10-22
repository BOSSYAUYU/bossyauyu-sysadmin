import Header from '@/app/components/Header';
import Nav from '@/app/components/Nav';
import { ReactNode } from 'react';
import Auth from '@/app/components/Auth';

interface Props {
  children: ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <Auth>
      <div className="h-[100vh] flex flex-col">
        <div className="h-[72px] flex-shrink-0">
          <Header />
        </div>
        <div className="flex-1 flex">
          <div className="w-[120px] flex-shrink-0">
            <Nav />
          </div>
          <div className="flex-1 overflow-hidden overflow-y-auto bg-white rounded-tl-[32px] rounded-tr-[32px] p-[32px]">
            {children}
          </div>
        </div>
      </div>
    </Auth>
  );
};

export default AuthLayout;
