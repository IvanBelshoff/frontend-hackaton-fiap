'use client';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useActionState, useEffect, useState } from "react";
import { MdCheckCircle, MdClose, MdDelete, MdError, MdOutlineRefresh } from "react-icons/md";
import { deletePlanoById, IDeletePlanoByIdAction } from "../server-actions/actions";
import { redirect } from "next/navigation";
import { LuLoader } from "react-icons/lu";

interface IDeletePlanoProps {
    id: number;
    plano: string;
}

export default function DeletePlano({ plano, id }: IDeletePlanoProps) {

    const [open, setOpen] = useState(false);

    const [responseDeletePlano, setResponseDeletePlano] = useState<IDeletePlanoByIdAction | null>(null);
    const [stateDeletePlano, formActionDeletePlano, isPendingDeletePlano] = useActionState(deletePlanoById, null);

    useEffect(() => {

        if (stateDeletePlano?.errors) {
            setResponseDeletePlano({
                errors: {
                    default: stateDeletePlano?.errors?.default,
                },
            });
        }

        if (stateDeletePlano?.sucess) {
            setResponseDeletePlano({
                sucess: {
                    default: stateDeletePlano?.sucess?.default,
                }
            });

            setTimeout(() => {
                setOpen(false);
                redirect('/planos');
            }, 2000);
        }
    }, [stateDeletePlano]);

    const handleOpenChange = (isOpen: boolean, response: IDeletePlanoByIdAction | null) => {
        if (!isPendingDeletePlano) {
            setResponseDeletePlano(null);
            setOpen(isOpen);
            if (response?.errors) {
                redirect('/planos');
            }
        }
    };

    function renderDeleteStatus(
        isPending: boolean,
        response: IDeletePlanoByIdAction | null
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
                Tem certeza que deseja excluir o plano <span className="font-bold">{plano}</span>? Esta ação não pode ser desfeita.
            </DialogDescription>
        );
    }

    function renderDeleteButton(
        isPending: boolean,
        response: IDeletePlanoByIdAction | null
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
        <Dialog open={open} onOpenChange={(open) => handleOpenChange(open, responseDeletePlano)}  >
            <DialogTrigger asChild>
                <MdDelete  size={22} className="cursor-pointer text-primary" />
            </DialogTrigger>
            <DialogContent className={`sm:max-w-[500px]`}>
                <form action={formActionDeletePlano}>
                    <input key={'id'} type="hidden" name="id" id="id" value={id} />
                    <DialogHeader className="gap-3 mb-4">
                        <DialogTitle>Deletar Plano</DialogTitle>
                        {renderDeleteStatus(isPendingDeletePlano, responseDeletePlano)}
                    </DialogHeader>
                    {renderDeleteButton(isPendingDeletePlano, responseDeletePlano)}
                </form>
            </DialogContent>
        </Dialog>
    );
}
