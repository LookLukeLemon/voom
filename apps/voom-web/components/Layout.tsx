import { ReactNode } from 'react';
import Header from './header/Header';
import SideMenu from './side-menu/SideMenu';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen bg-voom_base_primary divide-voom_base_third divide-x">
      <SideMenu />
      <div className="flex-1 flex flex-col divide-voom_base_third divide-y">
        <Header />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
