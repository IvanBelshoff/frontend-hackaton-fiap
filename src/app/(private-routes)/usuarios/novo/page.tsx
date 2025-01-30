"use server";

import { NewUser } from "@/shared/components/NewUser";
import { Environment } from "@/shared/environment";

export default async function PageNovoUsuario() {

    return (
        <main className='flex flex-col'>

            <div className='flex h-[calc(100vh-61px)]'>
                <NewUser url_default_image={`${Environment.BASE_URL}/profile/profile.jpg`} />
            </div>
        </main >
    );
};
