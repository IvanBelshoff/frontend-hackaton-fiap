// imports externos
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

// imports internos
import { Navbar } from "@/shared/components/navigation/Navbar";
import { Sidebar } from "@/shared/components/navigation/Sidebar";
import { SideNav } from "@/shared/components/navigation/SideNav";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";

type ILayout = Readonly<{ children: React.ReactNode }>;

export default async function Layout({ children }: ILayout) {

  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <>
      <SideNav
        navbar={
          <Navbar foto={session.user.foto} />
        }
        sidebar={<Sidebar />}
      >
        {children}
      </SideNav>
    </>
  );
}
