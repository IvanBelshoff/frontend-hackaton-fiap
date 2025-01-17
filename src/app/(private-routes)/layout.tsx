
// imports internos
import { Navbar } from "@/shared/components/navigation/Navbar";
import { Sidebar } from "@/shared/components/navigation/Sidebar";
import { SideNav } from "@/shared/components/navigation/SideNav";


type ILayout = Readonly<{ children: React.ReactNode }>;

export default async function Layout({ children }: ILayout) {

  return (
    <>
      <SideNav
        navbar={
          <Navbar />
        }
        sidebar={<Sidebar />}
      >
        {children}
      </SideNav>
    </>
  );
}