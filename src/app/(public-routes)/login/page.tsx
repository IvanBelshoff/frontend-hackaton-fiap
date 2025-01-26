"use client";
import React, { SyntheticEvent, useActionState, useEffect, useState } from 'react';
import Image from "next/image";
import { MdClose, MdMeetingRoom, MdSend } from "react-icons/md";
import { ILoginAction, IRecoverPasswordAction, recoverPasswordAction } from '@/shared/server-actions/actions';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { LuLoader } from "react-icons/lu";
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip";
import { Alert } from '@/shared/components/alerts/Alert';

export default function LoginPage() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loadingLogin, setLoadingLogin] = useState<boolean>(false);
    const [errors, setErrors] = useState<ILoginAction | null>(null);
    const [recoverPassword, setRecoverPassword] = useState<boolean>(false);
    const [responseRecoverPassoword, setResponseRecoverPassoword] = useState<IRecoverPasswordAction | null>(null);

    const router = useRouter();

    const [stateRecoverPassword, formActionRecoverPassword, isPendingRecoverPassword] = useActionState(recoverPasswordAction, null);

    async function handleSubmit(event: SyntheticEvent) {
        event.preventDefault();
        setLoadingLogin(true);
        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        if (result?.ok) {
            setLoadingLogin(false);
            router.replace('/');
        }

        if (result?.error) {
            setLoadingLogin(false);
            setErrors(JSON.parse(result.error));
        }
    }

    useEffect(() => {

        if (errors) {
            setTimeout(() => {
                setErrors(null);
            }, 5000);
        }

    }, [errors]);

    useEffect(() => {

        if (stateRecoverPassword?.errors) {
            setResponseRecoverPassoword({
                errors: {
                    default: stateRecoverPassword.errors.default,
                    body: {
                        emailRecuperacao: stateRecoverPassword.errors.body?.emailRecuperacao
                    }
                }
            });

            setTimeout(() => {
                setResponseRecoverPassoword(null);
            }, 5000);
        }

        if (stateRecoverPassword?.success) {

            setRecoverPassword(false);

            setResponseRecoverPassoword({
                success: {
                    default: stateRecoverPassword.success.default
                }
            });

            setTimeout(() => {
                setResponseRecoverPassoword(null);
            }, 5000);
        }
    }, [stateRecoverPassword]);

    return (

        <div className="flex h-screen justify-center items-center bg-gray-100">
            <Alert
                type={(errors?.errors?.default || responseRecoverPassoword?.errors?.default) ? 'danger' : 'sucess'}
                message={errors?.errors?.default || responseRecoverPassoword?.errors?.default || responseRecoverPassoword?.success?.default || ''}
                view={(errors?.errors?.default || responseRecoverPassoword?.errors?.default || responseRecoverPassoword?.success?.default) ? true : false}
            />
            <div className="w-1/2 flex justify-center">
                <Image
                    src="/logos/logo-kpi-light.png"
                    alt="Logo"
                    width={611.2}
                    height={471.5}
                />
            </div>
            <div className="w-1/2 flex justify-center">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">

                    <h2 className="text-4xl text-center">Seja Bem-Vindo!</h2>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className='flex flex-col gap-1'>
                            <Label htmlFor="email" className="text-sm font-medium">
                                Email
                            </Label >
                            <Input
                                type="email"
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                                name='email'
                                data-active={!!errors?.errors?.body?.email}
                                placeholder="Digite seu email"
                                autoComplete='username'
                            />

                            {errors?.errors?.body?.email && (
                                <div className='text-center'>
                                    <span className={`text-error text-sm text-center`}>{errors?.errors?.body?.email}</span>
                                </div>
                            )}

                        </div>
                        <div className='flex flex-col gap-1'>
                            <Label htmlFor="password" className="text-sm font-medium ">
                                Senha
                            </Label>
                            <Input
                                type="password"
                                id="password"
                                name='password'
                                data-active={!!errors?.errors?.body?.senha}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Digite sua senha"
                                autoComplete='current-password'
                            />

                            {errors?.errors?.body?.senha && (
                                <div className='text-center'>
                                    <span className={`text-error text-sm text-center`}>{errors?.errors?.body?.senha}</span>
                                </div>
                            )}

                        </div>

                        <div className='flex justify-center'>
                            <Button
                                type="submit"
                                data-active={loadingLogin || recoverPassword}
                                disabled={loadingLogin || recoverPassword}
                                variant={'default'}

                            >
                                {loadingLogin ? <LuLoader className="animate-spin" /> : <MdMeetingRoom />} {loadingLogin ? 'Entrando...' : 'Entrar'}
                            </Button>
                        </div>

                    </form>

                    {recoverPassword ? (
                        <div className='flex flex-col justify-center mt-4 gap-2'>

                            <Separator orientation='horizontal' />

                            <div className='flex justify-center items-center'>
                                <h3 className={`text-center text-base font-light flex-1`}>Informe o e-mail para recuperação de senha</h3>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <MdClose className='text-primary cursor-pointer' size={20} onClick={() => setRecoverPassword(false)} />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <span className={`text-sm`}>Fechar</span>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>

                            <form className="space-y-4" action={formActionRecoverPassword}>
                                <div className='flex flex-col gap-1'>
                                    <Label htmlFor="email" className="text-sm font-medium">
                                        Email
                                    </Label >
                                    <Input
                                        type="email"
                                        id="email"
                                        name='email'
                                        data-active={!!responseRecoverPassoword?.errors?.body?.emailRecuperacao}
                                        placeholder="Digite seu email"
                                    />

                                    {responseRecoverPassoword && (
                                        <div className='text-center'>
                                            <span className={`text-error text-sm text-center`}>{responseRecoverPassoword.errors?.body?.emailRecuperacao}</span>
                                        </div>
                                    )}
                                </div>

                                <div className='flex justify-center'>
                                    <Button
                                        type="submit"
                                        disabled={isPendingRecoverPassword}
                                        variant={'outline'}

                                    >
                                        {isPendingRecoverPassword ? <LuLoader className="animate-spin" /> : <MdSend size={20} />} {isPendingRecoverPassword ? 'Enviando...' : 'Enviar'}
                                    </Button>
                                </div>
                            </form>
                        </div>

                    ) : (
                        <div className='flex justify-center mt-2'>
                            <Button
                                onClick={() => setRecoverPassword(true)}
                                variant={'link'}
                                className='text-lg'
                            >
                                Esqueceu a senha ?
                            </Button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
