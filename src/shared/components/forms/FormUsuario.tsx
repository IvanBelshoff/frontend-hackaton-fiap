import { Input } from "@/components/ui/input";
import { ReactNode } from "react";

interface IFormUsuarioProps {
    nome: string;
    sobrenome: string;
    email: string;
    tipoUsuario: string;
    api_key: string;
    senha: string;
    erroSenha?: ReactNode;
    confirmarSenha: string;
    aoDigitar?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    formSenha: ReactNode
}

export function FormUsuario({ nome, sobrenome, email, api_key, tipoUsuario, confirmarSenha, senha, aoDigitar, formSenha, erroSenha }: IFormUsuarioProps) {

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
                </div>

                {/* Localidade */}
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="localidade"
                        className="text-sm font-medium text-gray-700"
                    >
                        API KEY
                    </label>
                    <Input
                        type="text"
                        id="api_key"
                        name="api_key"
                        value={api_key}
                        onChange={aoDigitar}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Digite sua API KEY"
                    />
                </div>

                {/* Tipo de Usuário */}
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="tipoUsuario"
                        className="text-sm font-medium text-gray-700"
                    >
                        Tipo de Usuário
                    </label>
                    <Input
                        type="text"
                        id="tipoUsuario"
                        name="tipoUsuario"
                        disabled
                        value={tipoUsuario}
                        onChange={aoDigitar}
                        className="border border-gray-300 rounded-lg px-4 py-2 bg-gray-200 cursor-not-allowed"
                    />
                </div>

            </div>

            {/* Botões ou elementos adicionais */}
            <div className="flex w-full h-auto justify-center items-center border-t flex-col gap-4 py-4">

                <div className='flex w-full h-full gap-4 justify-center items-center'>
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="senha"
                            className="text-sm font-medium text-gray-700"
                        >
                            Nova Senha
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
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="confirmarSenha"
                            className="text-sm font-medium text-gray-700"
                        >
                            Confirmar Nova Senha
                        </label>
                        <Input
                            type="password"
                            id="confirmarSenha"
                            name="confirmarSenha"
                            defaultValue={confirmarSenha}
                            onChange={aoDigitar}
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Confirme sua nova senha"
                        />
                    </div>

                    {((senha != undefined && confirmarSenha) && (senha == confirmarSenha)) && (
                        formSenha
                    )}

                </div>

                {erroSenha && (
                    <div className='text-center'>
                        <span className={`text-error text-sm text-center`}>{erroSenha}</span>
                    </div>
                )}

            </div>
        </div>
    );
}