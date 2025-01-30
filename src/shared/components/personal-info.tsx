'use client';


import { signOut, useSession } from "next-auth/react";
import { redirect, useRouter } from 'next/navigation';
import React, { ChangeEvent, useActionState, useEffect, useRef, useState } from 'react';
import Image from "next/image";

import { Alert } from './alerts/Alert';
import { Button } from "@/components/ui/button";
import { FormUsuario } from './forms/FormUsuario';
import { Separator } from '@/components/ui/separator';
import { CropperModal } from './CropperModal/CropperModal';
import { IUsuarioDetalhado } from "../interfaces/interface";
import { MdClose, MdDelete, MdOutlineRefresh, MdPassword, MdSystemUpdateAlt, MdUpload } from "react-icons/md";
import { deleteFotoUsuarioById, IDeleteFotoUsuarioByIdAction, IResetPasswordByIdAction, IUpdateUsuarioByIdAction, resetPasswordById, updateUsuarioByIdAction } from '../server-actions/actions';
import { LuLoader } from "react-icons/lu";


interface IPersonalInfoViewProps {
  usuario: IUsuarioDetalhado;
  defaultPhoto: IPhotoSession;
}

export interface IFile {
  filename: string;
  size: number;
  type: string
}

interface IFormUsuario {
  nome: string;
  sobrenome: string;
  email: string;
  api_key: string;
  tipoUsuario: string;
  foto: string;
  senha: string;
  confirmarSenha: string;
}

export interface IPhotoSession {
  nome: string;
  originalname: string;
  width: number | undefined;
  height: number | undefined;
  url: string;
  tamanho: number;
}

export const PersonalInfoView = (props: IPersonalInfoViewProps) => {

  const router = useRouter();

  async function logout() {
    await signOut({
      redirect: false
    });

    router.replace('/login');
  }

  const { data: session, status, update } = useSession();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const formUsuarioDefault: IFormUsuario = {
    nome: props.usuario.nome,
    sobrenome: props.usuario.sobrenome,
    email: props.usuario.email,
    api_key: props.usuario.api_key,
    tipoUsuario: props.usuario.tipo_usuario,
    foto: props.usuario.foto.url,
    senha: '',
    confirmarSenha: ''
  };

  const [formUsuario, setFormUsuario] = useState<IFormUsuario>(formUsuarioDefault);
  const [uploadedImage, setUploadedImage] = useState<string | ArrayBuffer | Blob | null>(formUsuarioDefault.foto);
  const [statePhoto, setStatePhoto] = useState<'original' | 'edição' | 'preview'>('original');
  const [file, setFile] = useState<IFile | null>(null);
  const [responseDeleteFoto, setResponseDeleteFoto] = useState<IDeleteFotoUsuarioByIdAction | null>(null);
  const [responseUpdateUsuarioById, setResponseUpdateUsuarioById] = useState<IUpdateUsuarioByIdAction | null>(null);
  const [responseResetPasswordById, setResponseResetPasswordById] = useState<IResetPasswordByIdAction | null>(null);
  const [isModified, setIsModified] = useState<boolean>(false);

  const [stateDeleteFoto, formActionDeleteFoto, isPendingDeleteFoto] = useActionState(deleteFotoUsuarioById, null);
  const [stateUpdateUsuarioById, formActionUpdateUsuarioById, isPendingUpdateUsuarioById] = useActionState(updateUsuarioByIdAction, null);
  const [stateResetPasswordById, formActionResetPasswordById, isPendingResetPasswordById] = useActionState(resetPasswordById, null);

  const HandleResetForm = () => {
    setStatePhoto('original');
    setFormUsuario(formUsuarioDefault);
    setFile(null);
    setIsModified(false);
    setUploadedImage(formUsuarioDefault.foto);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {

    const name = e.target.name as keyof typeof formUsuarioDefault;

    const value = e.target.value;

    e.preventDefault();

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
      setUploadedImage(formUsuarioDefault.foto);
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

  const handleUpdateFotoSession = async (foto: IPhotoSession, api_key?: string) => {

    try {

      if (status === "authenticated") {
        update({
          expires: session?.expires,
          user: {
            ...session.user,
            api_key: api_key || session.user.api_key,
            foto: {
              nome: foto.nome,
              originalname: foto.originalname,
              width: foto.width,
              height: foto.height,
              url: foto.url,
              tamanho: foto.tamanho,
            }
          }
        });

      }

      console.log("Sessão atualizada com sucesso!");

    } catch (error) {
      console.log("Erro ao atualizar a sessão:", error);
    }

  };

  const handleVisibleButtonUpdate = (): boolean => {
    if ((formUsuarioDefault.nome != formUsuario.nome) || (formUsuarioDefault.sobrenome != formUsuario.sobrenome) || (formUsuarioDefault.email != formUsuario.email) || (formUsuarioDefault.api_key != formUsuario.api_key) || isModified) {
      return true;
    };
    return false;
  };

  useEffect(() => {

    if (stateDeleteFoto?.errors?.default) {
      setResponseDeleteFoto({
        errors: {
          default: stateDeleteFoto?.errors?.default
        }
      });

      setTimeout(() => {
        setResponseDeleteFoto(null);
        setUploadedImage(formUsuarioDefault.foto);
      }, 5000);
    }

    if (stateDeleteFoto?.success) {

      setResponseDeleteFoto({
        success: {
          default: stateDeleteFoto?.success?.default,
        }
      });

      handleUpdateFotoSession(props.defaultPhoto);

      setTimeout(() => {
        setResponseDeleteFoto(null);
        setUploadedImage(props.defaultPhoto.url);
        redirect('/minha-conta');
      }, 2000);
    }

  }, [stateDeleteFoto]);

  useEffect(() => {

    if (stateUpdateUsuarioById?.errors?.default) {

      setResponseUpdateUsuarioById({
        errors: {
          default: stateUpdateUsuarioById?.errors?.default
        }
      });

      setTimeout(() => {
        setResponseUpdateUsuarioById(null);
        setFormUsuario(formUsuarioDefault);
        setUploadedImage(formUsuarioDefault.foto);
      }, 5000);
    }

    if (stateUpdateUsuarioById?.success) {

      console.log(stateUpdateUsuarioById?.success)

      setIsModified(false);

      setResponseUpdateUsuarioById({
        success: {
          default: stateUpdateUsuarioById?.success?.default,
        }
      });

      if (stateUpdateUsuarioById?.success?.usuario) {


        handleUpdateFotoSession({
          nome: stateUpdateUsuarioById.success.usuario.foto.nome,
          originalname: stateUpdateUsuarioById.success.usuario.foto.originalname,
          width: stateUpdateUsuarioById.success.usuario.foto.width,
          height: stateUpdateUsuarioById.success.usuario.foto.height,
          url: stateUpdateUsuarioById.success.usuario.foto.url,
          tamanho: stateUpdateUsuarioById.success.usuario.foto.tamanho
        }, stateUpdateUsuarioById.success.usuario.api_key);
      }

      setTimeout(() => {
        setResponseUpdateUsuarioById(null);
        setStatePhoto('original');
        redirect('/minha-conta');
      }, 2000);
    }

  }, [stateUpdateUsuarioById]);

  useEffect(() => {

    if (stateResetPasswordById?.errors) {

      setResponseResetPasswordById({
        errors: {
          default: stateResetPasswordById?.errors?.default,
          body: stateResetPasswordById?.errors?.body
        }
      });

      setTimeout(() => {
        setResponseResetPasswordById(null);
      }, 5000);
    }

    if (stateResetPasswordById?.success) {

      setResponseResetPasswordById({
        success: {
          default: stateResetPasswordById?.success?.default,
        }
      });

      setTimeout(() => {
        setResponseResetPasswordById(null);
        logout();
      }, 2000);
    }

  }, [stateResetPasswordById]);

  return (
    <div className='flex w-full h-full'>

      <form
        action={formActionUpdateUsuarioById}
      >

        <input key={'id'} type="hidden" name="id" id="id" value={props.usuario.id} />
        <input key={'nome'} type="hidden" name="nome" id="nome" value={formUsuario.nome} />
        <input key={'sobrenome'} type="hidden" name="sobrenome" id="sobrenome" value={formUsuario.sobrenome} />
        <input key={'email'} type="hidden" name="email" id="email" value={formUsuario.email} />
        <input key={'tipo_usuario'} type="hidden" name="tipo_usuario" id="tipo_usuario" value={formUsuario.tipoUsuario} />
        <input key={'api_key'} type="hidden" name="api_key" id="api_key" value={formUsuario.api_key} />
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

        {handleVisibleButtonUpdate() && (
          <div className="absolute top-[85px] flex left-[95px]  gap-4">
            {(!isPendingUpdateUsuarioById) && (
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
            >
              {isPendingUpdateUsuarioById ? <LuLoader className="animate-spin" /> : <MdSystemUpdateAlt />} {isPendingUpdateUsuarioById ? 'Atualizando...' : 'Atualizar'}
            </Button>
          </div>
        )}

      </form>

      <Alert
        type={(responseDeleteFoto?.errors?.default) ? 'danger' : 'sucess'}
        message={responseDeleteFoto?.errors?.default || responseDeleteFoto?.success?.default || ''}
        view={(responseDeleteFoto?.errors?.default || responseDeleteFoto?.success?.default) ? true : false}
      />

      <Alert
        type={(responseUpdateUsuarioById?.errors?.default) ? 'danger' : 'sucess'}
        message={responseUpdateUsuarioById?.errors?.default || responseUpdateUsuarioById?.success?.default || ''}
        view={(responseUpdateUsuarioById?.errors?.default || responseUpdateUsuarioById?.success?.default) ? true : false}
      />

      <Alert
        type={(responseResetPasswordById?.errors?.default) ? 'danger' : 'sucess'}
        message={responseResetPasswordById?.errors?.default || responseResetPasswordById?.success?.default || ''}
        view={(responseResetPasswordById?.errors?.default || responseResetPasswordById?.success?.default) ? true : false}
      />

      <div className={`flex w-full h-full p-4`}>

        <div className='flex w-full h-full  border rounded-lg'>

          <div className={'flex w-[40%] h-full flex-col gap-4 justify-center items-center bg-secondary border-r'}>

            {(statePhoto == 'original' || statePhoto == 'preview') ? (
              <>

                <Image
                  src={typeof uploadedImage == 'string' ? uploadedImage : URL.createObjectURL(uploadedImage as Blob)}
                  alt={`${props.usuario.nome} ${props.usuario.sobrenome}`}
                  width={220}
                  height={220}
                  className="rounded-full border-primary border-[2px]"
                />

                <h1 className="text-2xl  font-light">{`${props.usuario.nome} ${props.usuario.sobrenome}`}</h1>

                <div className="p-4 flex justify-center items-center gap-4">

                  <Button
                    className="flex items-center gap-2"
                    onClick={handleUploadClick}
                    type='button'
                    disabled={isPendingDeleteFoto || isPendingUpdateUsuarioById || isPendingResetPasswordById}
                  >
                    <MdUpload />
                    Carregar
                  </Button>

                  {statePhoto != 'original' ? (
                    <Button className="flex items-center gap-2" variant={'outline'} onClick={(e) => { e?.preventDefault(); handleRemoveImage(); }}>
                      <MdClose />
                      Cancelar
                    </Button>
                  ) : (
                    <form
                      action={formActionDeleteFoto}
                    >
                      <input key={'id'} type="hidden" name="id" id="id" value={props.usuario.id} />

                      <Button
                        className="flex items-center gap-2 text-error border border-error"
                        variant={'outline'}
                        disabled={isPendingDeleteFoto || isPendingUpdateUsuarioById || isPendingResetPasswordById}
                      >
                        {isPendingDeleteFoto ? <LuLoader className="animate-spin" /> : <MdDelete />} {isPendingDeleteFoto ? 'Removendo...' : 'Remover'}
                      </Button>
                    </form>
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

            <FormUsuario
              nome={formUsuario.nome}
              sobrenome={formUsuario.sobrenome}
              email={formUsuario.email}
              api_key={formUsuario.api_key}
              tipoUsuario={formUsuario.tipoUsuario}
              senha={formUsuario.senha}
              confirmarSenha={formUsuario.confirmarSenha}
              erroSenha={
                responseResetPasswordById?.errors?.body?.senha && (
                  <div className='text-center'>
                    <span className={`text-error text-sm text-center`}>{responseResetPasswordById?.errors?.body?.senha}</span>
                  </div>
                )
              }
              aoDigitar={handleInputChange}
              formSenha={
                <form
                  className="flex items-center mt-[26px]"
                  action={formActionResetPasswordById}
                >

                  <input key={'id'} type="hidden" name="id" id="id" value={props.usuario.id} />
                  <input key={'senha'} type="hidden" name="senha" id="senha" value={formUsuario.senha} />

                  <Button
                    type='submit'

                    disabled={isPendingResetPasswordById}
                  >
                    {isPendingResetPasswordById ? <LuLoader className="animate-spin" /> : <MdPassword />} {isPendingResetPasswordById ? 'Atualizando...' : 'Alterar Senha'}
                  </Button>

                </form>
              }
            />

          </div>

        </div>

      </div>
    </div>
  );
};
