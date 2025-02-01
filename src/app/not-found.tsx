import Lotties from '@/shared/components/Lotties';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className='flex w-full h-full flex-col'>
            <div className='flex h-1/4 items-center justify-center'>
                <h1 className='text-4xl'>Oops! Parece que esta pagina não existe</h1>
            </div>
            <div className='flex h-1/2 items-center justify-center'>
                <Lotties
                    type='404'
                    width={500}
                    height={500}
                />
            </div>
            <div className='flex h-1/4 items-center justify-center'>
                <Link href="/">Retorne a página inicial</Link>
            </div>
        </div>
    );
}