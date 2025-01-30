import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

interface IFormUsuario {
    tipoUsuario: string;
}

interface IFormNovoUsuarioProps {
    nome: string;
    errorNome?: string;
    sobrenome: string;
    errorSobrenome?: string;
    email: string;
    errorEmail?: string;
    senha: string;
    apikey: string;
    errorSenha?: string;
    errorTipoUsuario?: string;
    errorApiKey?: string;
    tipoUsuario: string;
    aoDigitar: (e: React.ChangeEvent<HTMLInputElement>) => void;
    aoSelecionar: (value: string, name: keyof IFormUsuario) => void
}

export function FormNovoUsuario({
    nome,
    sobrenome,
    email,
    senha,
    errorNome,
    errorEmail,
    errorSenha,
    errorSobrenome,
    errorTipoUsuario,
    apikey,
    errorApiKey,
    aoDigitar,
    aoSelecionar
}: IFormNovoUsuarioProps) {

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
                        name="email"
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Digite seu email"
                    />
                    {errorEmail && (
                        <span className="text-error text-sm">{errorEmail}</span>
                    )}
                </div>

                {/* Localidade */}
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="api_key"
                        className="text-sm font-medium text-gray-700"
                    >
                        API KEY
                    </label>
                    <Input
                        type="api_key"
                        id="api_key"
                        value={apikey}
                        onChange={aoDigitar}
                        name="api_key"
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Digite sua chave de API"
                    />
                    {errorEmail && (
                        <span className="text-error text-sm">{errorApiKey}</span>
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
                    <Select onValueChange={(e) => aoSelecionar(e, 'tipoUsuario')}>
                        <SelectTrigger >
                            <SelectValue placeholder="Selecione o tipo de usuário" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup defaultValue={'professor'}>
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

                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Senha
                    </label>
                    <Input
                        type="password"
                        id="senha"
                        value={senha}
                        onChange={aoDigitar}
                        name="senha"
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Digite sua senha"
                    />
                    {errorSenha && (
                        <span className="text-error text-sm">{errorSenha}</span>
                    )}
                </div>

            </div>

        </div>
    );
}