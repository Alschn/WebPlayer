import Content from "~/components/layout/Content";
import Header from "~/components/layout/Header";
import Sidebar from "~/components/layout/Sidebar";
import "~/styles/globals.css";

interface MainLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  footer: React.ReactNode;
}

export default function MainLayout({
  children,
  sidebar: sidebarRoute,
  footer: footerRoute,
}: MainLayoutProps) {
  return (
    <div>
      <Header className="h-12" />
      <div className="grid h-[calc(100vh-(144px))] grid-cols-12 gap-x-2 overflow-y-hidden px-1">
        <Sidebar className="hidden gap-2 md:col-span-3 md:flex md:flex-col xl:col-span-2">
          {sidebarRoute}
        </Sidebar>
        <Content className="col-span-12 md:col-span-9 xl:col-span-10">
          {children}
        </Content>
      </div>
      {footerRoute}
    </div>
  );
}
