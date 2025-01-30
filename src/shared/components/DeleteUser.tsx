'use client';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useActionState, useEffect, useState } from "react";
import { MdCheckCircle, MdClose, MdDelete, MdError, MdOutlineRefresh } from "react-icons/md";
import { deleteUsuarioById, IDeleteUsuarioByIdAction } from "../server-actions/actions";
import { redirect } from "next/navigation";
import { LuLoader } from "react-icons/lu";

interface IDeleteUserProps {
    id: number;
    usuario: string;
}

export default function DeleteUser({ usuario, id }: IDeleteUserProps) {

    const [open, setOpen] = useState(false);

    const [responseDeleteUser, setResponseDeleteUser] = useState<IDeleteUsuarioByIdAction | null>(null);
    const [stateDeleteUser, formActionDeleteUser, isPendingDeleteUser] = useActionState(deleteUsuarioById, null);

    useEffect(() => {

        if (stateDeleteUser?.errors) {
            setResponseDeleteUser({
                errors: {
                    default: stateDeleteUser?.errors?.default,
                },
            });
        }

        if (stateDeleteUser?.sucess) {
            setResponseDeleteUser({
                sucess: {
                    default: stateDeleteUser?.sucess?.default,
                }
            });

            setTimeout(() => {
                setOpen(false);
                redirect('/usuarios');
            }, 2000);
        }
    }, [stateDeleteUser]);

    const handleOpenChange = (isOpen: boolean, response: IDeleteUsuarioByIdAction | null) => {
        if (!isPendingDeleteUser) {
            setResponseDeleteUser(null);
            setOpen(isOpen);
            if (response?.errors) {
                redirect('/usuarios');
            }
        }
    };

    function renderDeleteStatus(
        isPending: boolean,
        response: IDeleteUsuarioByIdAction | null
    ) {
        if (isPending) {
            return (
                <DialogDescription className="flex gap-2 items-center my-8 bg-primary text-white p-2 rounded-md">
                    <LuLoader className="animate-spin" />
                    Exclusão em andamento...
                </DialogDescription>
            );
        }

        if (response) {

            if (response?.sucess?.default) {
                return (
                    <DialogDescription className="flex gap-2 items-center my-8 bg-green-50 p-2 rounded-md border">
                        <MdCheckCircle size={20} className="text-[#338F59] mt-[2px]" />
                        {response?.sucess.default}
                    </DialogDescription>
                );
            }

            if (response?.errors?.default) {
                return (
                    <DialogDescription className="flex gap-2 items-center my-8 bg-red-50 p-2 rounded-md border">
                        <MdError size={20} className="text-error mt-[2px]" />
                        {response?.errors?.default}
                    </DialogDescription>
                );
            }
        }

        return (
            <DialogDescription>
                Tem certeza que deseja excluir o usuário <span className="font-bold">{usuario}</span>? Esta ação não pode ser desfeita.
            </DialogDescription>
        );
    }

    function renderDeleteButton(
        isPending: boolean,
        response: IDeleteUsuarioByIdAction | null
    ) {

        if (response?.errors?.default) {
            return (
                <DialogFooter>
                    <div className="flex gap-4 w-full justify-center items-center">
                        <Button disabled={isPending} className="border" type="button" onClick={() => setOpen(false)} variant='outline'>
                            <MdClose />
                            Cancelar
                        </Button>
                        <Button disabled={isPending} type="submit" variant={'destructive'}>
                            {isPending ? (
                                <LuLoader className="animate-spin" />
                            ) : (
                                <MdOutlineRefresh />
                            )}
                            {isPending ? 'Excluindo...' : 'Tentar novamente'}
                        </Button>
                    </div>
                </DialogFooter>
            );
        }

        if (response == null) {
            return (
                <DialogFooter>
                    <div className="flex gap-4 w-full justify-center items-center">
                        <Button disabled={isPending} className="border" type="button" onClick={() => setOpen(false)} variant='outline'>
                            <MdClose />
                            Cancelar
                        </Button>
                        <Button disabled={isPending} type="submit" variant={'destructive'}>
                            {isPending ? (
                                <LuLoader className="animate-spin" />
                            ) : (
                                <MdDelete size={22} />
                            )}
                            {isPending ? 'Excluindo...' : 'Excluir'}
                        </Button>
                    </div>
                </DialogFooter>
            );
        }

    }

    return (
        <Dialog open={open} onOpenChange={(open) => handleOpenChange(open, responseDeleteUser)}  >
            <DialogTrigger asChild>
                <MdDelete  size={22} className="cursor-pointer text-primary" />
            </DialogTrigger>
            <DialogContent className={`sm:max-w-[500px]`}>
                <form action={formActionDeleteUser}>
                    <input key={'id'} type="hidden" name="id" id="id" value={id} />
                    <DialogHeader className="gap-3 mb-4">
                        <DialogTitle>Deletar Usuário</DialogTitle>
                        {renderDeleteStatus(isPendingDeleteUser, responseDeleteUser)}
                    </DialogHeader>
                    {renderDeleteButton(isPendingDeleteUser, responseDeleteUser)}
                </form>
            </DialogContent>
        </Dialog>
    );
}
