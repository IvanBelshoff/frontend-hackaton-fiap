import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { NoPermissionMessage } from "@/shared/components/alerts/NoPermissionMessage";
import { TipoUsuario } from "@/shared/interfaces/interface";
import { getServerSession } from "next-auth";

export default async function LayoutUsuarios({ children }: { children: React.ReactNode; }) {
  const session = await getServerSession(nextAuthOptions);

  if (session?.user.typeUser != TipoUsuario.ADM) {
    return <NoPermissionMessage />;
  }

  return (
    <>
      {children}
    </>
  );
}
