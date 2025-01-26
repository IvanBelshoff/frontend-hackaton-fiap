import { IDataToken } from "@/shared/interfaces/InterfacesGlobais";

declare module "next-auth" {
    interface Session {
        user: IDataToken;
    }

    interface JWT {
        user?: Session["user"];
    }

    type User = IDataToken
}
