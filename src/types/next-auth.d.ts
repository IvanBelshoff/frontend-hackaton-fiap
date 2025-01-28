/* eslint-disable @typescript-eslint/no-empty-object-type */
import { IDataToken } from "@/shared/interfaces/interface";

declare module "next-auth" {
    interface Session {
        user: IDataToken;
    }

    interface JWT {
        user?: Session["user"];
    }

    interface User extends IDataToken {}
}