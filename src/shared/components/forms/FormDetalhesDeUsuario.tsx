import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

interface IFormUsuario {
    tipoUsuario: string;
}

interface IFormDetalhesDeUsuarioProps {
    nome: string;
    errorNome?: string;
    sobrenome: string;
    errorSobrenome?: string;
    email: string;
    errorEmail?: string;
    api_key: string;
    errorApi_key?: string;
    tipoUsuario: string;
    errorTipoUsuario?: string;
    senha: string;
    errorSenha?: string;
    idUserSession: string;
    idUser: string;
    disabled: boolean;
    aoDigitar: (e: React.ChangeEvent<HTMLInputElement>) => void;
    aoSelecionar: (value: string, name: keyof IFormUsuario) => void
}

export function FormDetalhesDeUsuario({
    nome,
    errorNome,
    sobrenome,
    errorSobrenome,
    email,
    errorEmail,
    tipoUsuario,
    errorTipoUsuario,
    senha,
    errorSenha,
    api_key,
    errorApi_key,
    idUser,
    idUserSession,
    disabled,
    aoDigitar,
    aoSelecionar
}: IFormDetalhesDeUsuarioProps) {

    return (
        <div className="flex flex-col w-full h-full">
            <div style={{ scrollbarWidth: 'none' }} className="grid grid-cols-1 md:grid-cols-1 overflow-y-auto gap-4 flex-1 py-4 px-1">
                {/* Nome */}
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="nome"
                        className="text-sm font-medium text-gray-700"
                    >
                        Nome
                    </label>
                    <Input
                        type="text"
                        id="nome"
                        value={nome}
                        onChange={aoDigitar}
                        disabled={senha !== '' || disabled}
                        name="nome"
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Digite seu nome"
                    />
                    {errorNome && (
                        <span className="text-error text-sm">{errorNome}</span>
                    )}
                </div>

                {/* Sobrenome */}
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="sobrenome"
                        className="text-sm font-medium text-gray-700"
                    >
                        Sobrenome
                    </label>
                    <Input
                        type="text"
                        id="sobrenome"
                        value={sobrenome}
                        onChange={aoDigitar}
                        disabled={senha !== '' || disabled}
                        name="sobrenome"
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Digite seu sobrenome"
                    />
                    {errorSobrenome && (
                        <span className="text-error text-sm">{errorSobrenome}</span>
                    )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <Input
                        type="email"
                        id="email"
                        value={email}
                        onChange={aoDigitar}
                        disabled={senha !== '' || disabled}
                        name="email"
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Digite seu email"
                    />
                    {errorEmail && (
                        <span className="text-error text-sm">{errorEmail}</span>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="tipoUsuario"
                        className="text-sm font-medium text-gray-700"
                    >
                        Api Key
                    </label>
                    <Input
                        type="text"
                        id="api_key"
                        value={api_key}
                        onChange={aoDigitar}
                        disabled={senha !== '' || disabled}
                        name="api_key"
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Insira a url das métricas"
                    />
                    {errorApi_key && (
                        <span className="text-error text-sm">{errorApi_key}</span>
                    )}
                </div>

                {/* Tipo de Usuário */}
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="tipoUsuario"
                        className="text-sm font-medium text-gray-700"
                    >
                        Tipo de Usuário
                    </label>
                    <Select defaultValue={tipoUsuario} disabled={senha !== '' || disabled} onValueChange={(e) => aoSelecionar(e, 'tipoUsuario')}>
                        <SelectTrigger >
                            <SelectValue placeholder="Selecione o tipo de usuário" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Tipos</SelectLabel>
                                <SelectItem value="professor">Professor</SelectItem>
                                <SelectItem value="administrador">Administrador</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {errorTipoUsuario && (
                        <span className="text-error text-sm">{errorTipoUsuario}</span>
                    )}
                </div>

                {(idUserSession !== idUser && !disabled) && (
                    <div className="flex w-full h-auto justify-center items-center border-t flex-col gap-4 pt-3">

                        <div className="flex flex-col w-[50%] gap-2">
                            <label
                                htmlFor="senha"
                                className="text-sm font-medium text-gray-700"
                            >
                                Alterar Senha
                            </label>
                            <Input
                                type="password"
                                id="senha"
                                name="senha"
                                defaultValue={senha}
                                onChange={aoDigitar}
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Digite sua nova senha"
                            />
                        </div>

                        {errorSenha && (
                            <div className='text-center'>
                                <span className={`text-error text-sm text-center`}>{errorSenha}</span>
                            </div>
                        )}

                    </div>
                )}

            </div>

        </div>
    );
}