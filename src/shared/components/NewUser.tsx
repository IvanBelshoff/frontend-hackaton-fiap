'use client';

import { LuLoader } from 'react-icons/lu';
import React, { ChangeEvent, useActionState, useEffect, useRef, useState } from 'react';
import Image from "next/image";

import { Alert } from './alerts/Alert';
import { Button } from "@/components/ui/button";
import { Separator } from '@/components/ui/separator';
import { CropperModal } from './CropperModal/CropperModal';
import { MdAdd, MdClose, MdOutlineRefresh, MdUpload } from "react-icons/md";
import { ICreateNewUserAction, newUser } from '../server-actions/actions';

import { redirect } from 'next/navigation';
import { FormNovoUsuario } from './forms/FormNovoUsuario';

export interface IFile {
    filename: string;
    size: number;
    type: string
}

interface IFormUsuario {
    nome: string;
    sobrenome: string;
    email: string;
    tipoUsuario: string;
    api_key: string;
    foto: string;
    senha: string;
}

interface INewUserProps {
    url_default_image: string
}

export const NewUser = ({ url_default_image }: INewUserProps) => {

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formUsuario, setFormUsuario] = useState<IFormUsuario>({
        nome: '',
        sobrenome: '',
        email: '',
        tipoUsuario: '',
        api_key: '',
        foto: '',
        senha: ''
    });
    const [uploadedImage, setUploadedImage] = useState<string | ArrayBuffer | Blob | null>(url_default_image);
    const [statePhoto, setStatePhoto] = useState<'original' | 'edição' | 'preview'>('original');
    const [file, setFile] = useState<IFile | null>(null);
    const [responseNewUser, setResponseNewUser] = useState<ICreateNewUserAction | null>(null);
    const [stateResetNewUser, formActionResetNewUser, isPendingResetNewUser] = useActionState(newUser, null);
    const [isModified, setIsModified] = useState<boolean>(false);

    const HandleResetForm = () => {
        setStatePhoto('original');
        setFile(null);
        setUploadedImage(url_default_image);
        setIsModified(false);
        setFormUsuario({
            nome: '',
            sobrenome: '',
            email: '',
            tipoUsuario: '',
            api_key: '',
            foto: '',
            senha: ''
        });
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {

        const name = e.target.name as keyof IFormUsuario;

        const value = e.target.value;

        e.preventDefault();

        setFormUsuario(prevState => ({ ...prevState, [name]: value }));

    };

    const handleSelectChange = (value: string, name: keyof IFormUsuario) => {
        setFormUsuario(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSaveEditedImage = (blob: Blob, state?: 'original' | 'edição' | 'preview') => {
        const reader = new FileReader();
        reader.onloadend = () => {

            setUploadedImage(blob);

            // Criando uma FileList simulando a seleção de arquivos pelo usuário
            const editedFile = new File([blob], file?.filename || 'edited_photo.jpg', { type: file?.type });
            const fileList = new DataTransfer();
            fileList.items.add(editedFile);

            // Setando o valor do input para a FileList criada
            const uploadedPhotoInput = document.getElementById('upload-photo') as HTMLInputElement;
            uploadedPhotoInput.files = fileList.files;

            if (state) {
                setStatePhoto(state);
                setIsModified(true);
            }
        };
        reader.readAsDataURL(blob);
    };

    const handleRemoveImage = () => {

        setIsModified(false);
        setFile(null);
        setStatePhoto('original');
        // Resetando o valor do input para garantir que o evento onChange seja acionado novamente
        if (document.getElementById('upload-photo')) {
            (document.getElementById('upload-photo') as HTMLInputElement).value = '';
            setUploadedImage(url_default_image);
        }

    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        const reader = new FileReader();
        if (file) {
            reader.onloadend = () => {
                setUploadedImage(reader.result);
                setStatePhoto('edição');
                setFile({ filename: file.name, size: file.size, type: file.type });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadClick = () => {
        // Simula um clique no input
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleVisibleButtonCreate = (): boolean => {
        if ((formUsuario.nome != '') || (formUsuario.sobrenome != '') || (formUsuario.email != '') || (formUsuario.api_key != '') || (formUsuario.tipoUsuario != '') || (formUsuario.senha != '') || isModified) {
            return true;
        };
        return false;
    };

    useEffect(() => {

        if (stateResetNewUser?.errors) {

            setResponseNewUser({
                errors: {
                    default: stateResetNewUser?.errors?.default,
                    body: stateResetNewUser?.errors?.body
                }
            });

            setTimeout(() => {
                setResponseNewUser(null);
            }, 5000);
        }

        if (stateResetNewUser?.success) {

            setIsModified(false);

            setResponseNewUser({
                success: {
                    default: stateResetNewUser?.success?.default,
                }
            });

            setTimeout(() => {
                setResponseNewUser(null);
                redirect('/usuarios');
            }, 2000);
        }

    }, [stateResetNewUser]);

    return (
        <div className='flex w-full h-full'>

            <form
                action={formActionResetNewUser}
            >

                <input key={'nome'} type="hidden" name="nome" id="nome" value={formUsuario.nome} />
                <input key={'sobrenome'} type="hidden" name="sobrenome" id="sobrenome" value={formUsuario.sobrenome} />
                <input key={'email'} type="hidden" name="email" id="email" value={formUsuario.email} />
                <input key={'api_key'} type="hidden" name="api_key" id="api_key" value={formUsuario.api_key} />
                <input key={'tipo_usuario'} type="hidden" name="tipo_usuario" id="tipo_usuario" value={formUsuario.tipoUsuario} />
                <input key={'senha'} type="hidden" name="senha" id="senha" value={formUsuario.senha} />
                <input
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    id="upload-photo"
                    type="file"
                    name='foto'
                    onChange={handleImageChange}
                    accept="image/*" // Aceita apenas imagens
                />

                <div data-active={statePhoto == 'edição'} className="data-[active=true]:hidden absolute top-[85px] flex left-[95px]  gap-4">
                    {(handleVisibleButtonCreate() && !isPendingResetNewUser ) && (
                        <div className='h-auto flex gap-4 justify-center items-center'>
                            <Button
                                variant={'outline'}
                                type='button'
                                onClick={() => HandleResetForm()}
                            >
                                <MdOutlineRefresh />
                                Restaurar
                            </Button>
                            <Separator orientation='vertical' className="h-[80%]" />
                        </div>
                    )}
                    <Button
                        type='submit'
                        data-active={statePhoto == 'edição'}
                        className="data-[active=true]:hidden"
                    >
                        {isPendingResetNewUser ? <LuLoader className="animate-spin" /> : <MdAdd />} {isPendingResetNewUser ? 'Criando...' : 'Criar'}
                    </Button>
                </div>

            </form>

            <Alert
                type={(responseNewUser?.errors?.default) ? 'danger' : 'sucess'}
                message={responseNewUser?.errors?.default || responseNewUser?.success?.default || ''}
                view={(responseNewUser?.errors?.default || responseNewUser?.success?.default) ? true : false}
            />

            <div className={`flex w-full h-full p-4`}>

                <div className='flex w-full h-full  border rounded-lg'>

                    <div className={'flex w-[40%] h-full flex-col gap-4 justify-center items-center bg-secondary border-r'}>

                        {(statePhoto == 'original' || statePhoto == 'preview') ? (
                            <>

                                <Image
                                    src={typeof uploadedImage == 'string' ? uploadedImage : URL.createObjectURL(uploadedImage as Blob)}
                                    alt={"Foto do funcionário"}
                                    width={250}
                                    height={250}
                                    className="rounded-full border-primary border-[2px]"
                                />

                                <h1 className="text-2xl  font-light">{`${formUsuario.nome} ${formUsuario.sobrenome}`}</h1>

                                <div className="p-4 flex justify-center items-center gap-4">

                                    <Button
                                        className="flex items-center gap-2"
                                        onClick={handleUploadClick}
                                        type='button'
                                        disabled={isPendingResetNewUser}
                                    >
                                        <MdUpload />
                                        Carregar
                                    </Button>

                                    {statePhoto != 'original' && (
                                        <Button className="flex items-center gap-2" variant={'outline'} onClick={(e) => { e?.preventDefault(); handleRemoveImage(); }}>
                                            <MdClose />
                                            Cancelar
                                        </Button>
                                    )}

                                </div>
                            </>
                        ) : (
                            <div className='w-full h-full flex flex-col gap-4 justify-center items-center'>
                                <h1 className='text-xl'>Modo de Edição</h1>
                                <CropperModal
                                    src={uploadedImage as string}
                                    size={file?.size}
                                    type={file?.type}
                                    setPreview={setUploadedImage}
                                    cancelPhoto={handleRemoveImage}
                                    onSave={handleSaveEditedImage}
                                />
                            </div>
                        )}

                    </div>

                    <div className={'flex w-[60%] h-full px-4'}>

                        <FormNovoUsuario
                            nome={formUsuario.nome}
                            sobrenome={formUsuario.sobrenome}
                            email={formUsuario.email}
                            errorNome={responseNewUser?.errors?.body?.nome}
                            errorSobrenome={responseNewUser?.errors?.body?.sobrenome}
                            errorEmail={responseNewUser?.errors?.body?.email}
                            errorSenha={responseNewUser?.errors?.body?.senha}
                            apikey={formUsuario.api_key}
                            errorTipoUsuario={responseNewUser?.errors?.body?.tipo_usuario}
                            errorApiKey={responseNewUser?.errors?.body?.api_key}
                            tipoUsuario={formUsuario.tipoUsuario}
                            senha={formUsuario.senha}
                            aoDigitar={handleInputChange}
                            aoSelecionar={handleSelectChange}
                        />

                    </div>

                </div>

            </div>

        </div>
    );
};
