import React, { FormEvent } from "react";

import Head from "next/head";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { authOptions } from "./api/auth/[...nextauth]";

import Button from "../components/form/Button";
import Input from "../components/form/Input";
import useInput from "../hooks/useInput";
import { GlobalCtx } from "../contexts/Global";
import Error from "../components/form/Error";
import useMatchLayout from "../hooks/useMatchLayout";
import ResponsiveAlert from "../components/elements/ResponsiveAlert";

const Login = () => {
    const { value: valueEmail, ...restEmail } = useInput({type: "email"});
    const { value: valuePassword, ...restPassword } = useInput({type: null});
    const router = useRouter();
    const [error, setError] = React.useState<null | string>(null);
    const [loading, setLoading] = React.useState(false);
    const matchResponsive = useMatchLayout(1100);
    const { setNotify } = React.useContext(GlobalCtx);

    const handleLogin  = async (e: FormEvent) => {
        e.preventDefault();

        if(valueEmail.length && valuePassword.length){
            setLoading(true);
            const hasLogin = await signIn("credentials", {
                redirect: false,
                email: valueEmail,
                password: valuePassword, 
            });
            setLoading(false);

            if(hasLogin?.ok) router.push("/");
            else {
                setError("Erro ao fazer login. Verifique os dados.");
                setNotify({
                    show: true,
                    type: "failure"
                });
            }
        } else setError("Campos incompletos.")
    }
    
    return (
        <>
            <Head>
                <title>Login - Dash next</title>
            </Head>
            {
                matchResponsive ? (
                    <ResponsiveAlert />
                ) : (
                    <main className="h-screen bg-black-800 flex flex-col items-center justify-center">
                        <section className="bg-black-700 rounded px-10 py-6">
                            <div>
                                <form onSubmit={handleLogin} className="flex flex-col gap-y-4 min-w-[360px]">
                                    <Input label="Email" placeholder="Email" required value={valueEmail} {...restEmail} />
                                    <Input label="Senha" type="password" placeholder="Senha" value={valuePassword} {...restPassword} />
                                    {error && <Error>{ error }</Error>}
                                    <Button disabled={loading}>Acessar</Button>
                                </form>
                            </div>
                        </section>
                            <div>
                                <span className="text-white-500 font-semibold block mt-2">Usuário e senha padrão: user@gmail.com</span>
                            </div>
                     </main>
                )
            }
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req, res } = context;
    const session = await unstable_getServerSession(req, res, authOptions);

    if(session ) return ({ redirect: { destination: '/', permanent: true } });


    return {
        props: {}
    }
}

export default Login