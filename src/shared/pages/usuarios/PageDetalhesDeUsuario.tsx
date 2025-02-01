'use client';

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert } from "@/shared/components/alerts/Alert";
import { CropperModal } from "@/shared/components/CropperModal/CropperModal";
import { deleteFotoUsuarioById, IDeleteFotoUsuarioByIdAction, IUpdateUsuarioByIdAction, updateUsuarioByIdAction } from "@/shared/server-actions/actions";
import { useSession } from "next-auth/react";
import { redirect, useParams } from "next/navigation";
import { ChangeEvent, useActionState, useEffect, useRef, useState } from "react";
import { LuLoader } from "react-icons/lu";
import { MdClose, MdDelete, MdOutlineRefresh, MdSystemUpdateAlt, MdUpload } from "react-icons/md";
import Image from "next/image";
import { FormDetalhesDeUsuario } from "@/shared/components/forms/FormDetalhesDeUsuario";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { IUsuarioDetalhado } from "@/shared/interfaces/interface";

interface IPageDetalhesDeUsuarioProps {
    idUser: number
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
    status: string;
    api_key: string;
    tipoUsuario: string;
    foto: string;
    senha: string;
}

export interface IPhotoSession {
    nome: string;
    originalname: string;
    width: number | undefined;
    height: number | undefined;
    url: string;
    tamanho: number;
}

export default function PageDetalhesDeUsuario(props: IPageDetalhesDeUsuarioProps) {

    const params = useParams();
    const idUsuario = params.idUsuario;

    const { data: session, status, update } = useSession();

    const fileInputRef = useRef<HTMLInputElement>(null);

    const formUsuarioDefault: IFormUsuario = {
        nome: props.usuario.nome,
        sobrenome: props.usuario.sobrenome,
        email: props.usuario.email,
        status: props.usuario.bloqueado ? 'true' : 'false',
        tipoUsuario: props.usuario.tipo_usuario,
        api_key: props.usuario.api_key || '',
        foto: props.usuario.foto.url,
        senha: '',
    };

    const [formUsuario, setFormUsuario] = useState<IFormUsuario>(formUsuarioDefault);
    const [uploadedImage, setUploadedImage] = useState<string | ArrayBuffer | Blob | null>(formUsuarioDefault.foto);
    const [statePhoto, setStatePhoto] = useState<'original' | 'edição' | 'preview'>('original');
    const [file, setFile] = useState<IFile | null>(null);
    const [responseDeleteFoto, setResponseDeleteFoto] = useState<IDeleteFotoUsuarioByIdAction | null>(null);
    const [responseUpdateUsuarioById, setResponseUpdateUsuarioById] = useState<IUpdateUsuarioByIdAction | null>(null);
    const [isModified, setIsModified] = useState<boolean>(false);

    const [stateDeleteFoto, formActionDeleteFoto, isPendingDeleteFoto] = useActionState(deleteFotoUsuarioById, null);
    const [stateUpdateUsuarioById, formActionUpdateUsuarioById, isPendingUpdateUsuarioById] = useActionState(updateUsuarioByIdAction, null);

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

    const handleUpdateFotoSession = async (foto: IPhotoSession) => {

        try {

            if (status === "authenticated") {
                update({
                    expires: session?.expires,
                    user: {
                        ...session.user,
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
        if (
            (formUsuarioDefault.nome != formUsuario.nome)
            || (formUsuarioDefault.sobrenome != formUsuario.sobrenome)
            || (formUsuarioDefault.email != formUsuario.email)
            || (formUsuarioDefault.api_key != formUsuario.api_key)
            || (formUsuarioDefault.status != formUsuario.status)
            || (formUsuarioDefault.tipoUsuario != formUsuario.tipoUsuario)
            || (formUsuario.senha != '')
            || isModified) {
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

            if (props.idUser.toString() == idUsuario) {
                handleUpdateFotoSession(props.defaultPhoto);
            }

            setTimeout(() => {
                setResponseDeleteFoto(null);
                setUploadedImage(props.defaultPhoto.url);
                redirect(`/usuarios/${idUsuario}/detalhes`);
            }, 2000);
        }

    }, [stateDeleteFoto]);

    useEffect(() => {

        if (stateUpdateUsuarioById?.errors) {

            setResponseUpdateUsuarioById({
                errors: {
                    default: stateUpdateUsuarioById?.errors?.default,
                    body: stateUpdateUsuarioById?.errors?.body
                }
            });

            setUploadedImage(formUsuarioDefault.foto);

            setTimeout(() => {
                setResponseUpdateUsuarioById(null);
                setFormUsuario(formUsuarioDefault);
                setUploadedImage(formUsuarioDefault.foto);
            }, 5000);
        }

        if (stateUpdateUsuarioById?.success) {

            setIsModified(false);

            setResponseUpdateUsuarioById({
                success: {
                    default: stateUpdateUsuarioById?.success?.default,
                }
            });

            if ((stateUpdateUsuarioById?.success?.usuario) && (props.idUser.toString() == idUsuario)) {
                handleUpdateFotoSession({
                    nome: stateUpdateUsuarioById.success.usuario.foto.nome,
                    originalname: stateUpdateUsuarioById.success.usuario.foto.originalname,
                    width: stateUpdateUsuarioById.success.usuario.foto.width,
                    height: stateUpdateUsuarioById.success.usuario.foto.height,
                    url: stateUpdateUsuarioById.success.usuario.foto.url,
                    tamanho: stateUpdateUsuarioById.success.usuario.foto.tamanho
                });
            }

            setTimeout(() => {
                setResponseUpdateUsuarioById(null);
                setStatePhoto('original');
                redirect(`/usuarios/${idUsuario}/detalhes`);
            }, 2000);
        }

    }, [stateUpdateUsuarioById]);

    return (
        <div className='flex w-full h-full'>

            <form
                action={formActionUpdateUsuarioById}
            >

                <input key={'id'} type="hidden" name="id" id="id" value={props.usuario.id} />
                <input key={'nome'} type="hidden" name="nome" id="nome" value={formUsuario.nome} />
                <input key={'sobrenome'} type="hidden" name="sobrenome" id="sobrenome" value={formUsuario.sobrenome} />
                <input key={'email'} type="hidden" name="email" id="email" value={formUsuario.email} />
                <input key={'bloqueado'} type="hidden" name="bloqueado" id="bloqueado" value={formUsuario.status} />
                <input key={'api_key'} type="hidden" name="api_key" id="api_key" value={formUsuario.api_key} />
                <input key={'tipo_usuario'} type="hidden" name="tipo_usuario" id="tipo_usuario" value={formUsuario.tipoUsuario} />
                {formUsuario.senha != '' && (
                    <input key={'senha'} type="hidden" name="senha" id="senha" value={formUsuario.senha} />
                )}
                <input key={'update'} type="hidden" name="update" id="update" value={'true'} />
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
                    <div data-active={statePhoto == 'edição'} className="data-[active=true]:hidden absolute top-[85px] flex left-[95px]  gap-4">
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

                                <h1 className="text-2xl font-light">{`${props.usuario.nome} ${props.usuario.sobrenome}`}</h1>

                                <div className="flex justify-center items-center w-full gap-4">
                                    <Switch
                                        checked={formUsuario.status == 'false' ? true : false}
                                        value={formUsuario.status == 'false' ? 'true' : 'false'}
                                        id="status"
                                        disabled={isPendingUpdateUsuarioById || isPendingDeleteFoto || formUsuario.senha !== ''}
                                        onCheckedChange={(value) => setFormUsuario(prevState => ({ ...prevState, status: value ? 'false' : 'true' }))}
                                    />
                                    <Label htmlFor="status">{formUsuario.status == 'false' ? 'Ativo' : 'Bloqueado'}</Label>
                                </div>

                                <div className="pb-4 pt-2 flex justify-center items-center gap-4">

                                    <Button
                                        className="flex items-center gap-2"
                                        onClick={handleUploadClick}
                                        type='button'
                                        disabled={isPendingDeleteFoto || isPendingUpdateUsuarioById || formUsuario.senha !== '' || props.usuario.bloqueado}
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
                                                disabled={isPendingDeleteFoto || isPendingUpdateUsuarioById || formUsuario.senha !== '' || props.usuario.bloqueado}
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

                        <FormDetalhesDeUsuario
                            nome={formUsuario.nome}
                            errorNome={responseUpdateUsuarioById?.errors?.body?.nome}
                            sobrenome={formUsuario.sobrenome}
                            errorSobrenome={responseUpdateUsuarioById?.errors?.body?.sobrenome}
                            email={formUsuario.email}
                            errorEmail={responseUpdateUsuarioById?.errors?.body?.email}
                            api_key={formUsuario.api_key}
                            errorApi_key={responseUpdateUsuarioById?.errors?.body?.api_key}
                            tipoUsuario={formUsuario.tipoUsuario}
                            errorTipoUsuario={responseUpdateUsuarioById?.errors?.body?.tipo_usuario}
                            senha={formUsuario.senha}
                            errorSenha={responseUpdateUsuarioById?.errors?.body?.senha}
                            aoDigitar={handleInputChange}
                            idUser={idUsuario as string}
                            idUserSession={props.idUser.toString()}
                            disabled={isPendingUpdateUsuarioById || isPendingDeleteFoto || props.usuario.bloqueado}
                            aoSelecionar={(value, name) => setFormUsuario(prevState => ({ ...prevState, [name]: value }))}
                        />

                    </div>

                </div>

            </div>

        </div>
    );
};