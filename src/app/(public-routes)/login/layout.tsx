import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

type ILayout = Readonly<{ children: React.ReactNode }>;

export default async function Layout({ children }: ILayout) {

  const session = await getServerSession(nextAuthOptions);

	if (session) {
		redirect('/');
	}

  return (
    <>
      {children}
    </>
  );
}
