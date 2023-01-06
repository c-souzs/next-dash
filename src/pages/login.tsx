import { FormEvent } from "react";

import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { authOptions } from "./api/auth/[...nextauth]";

import Button from "../components/form/Button";
import Input from "../components/form/Input";
import useInput from "../hooks/useInput";

const Login = () => {
    const { value: valueEmail, ...restEmail } = useInput({type: "email"});
    const { value: valuePassword, ...restPassword } = useInput({type: null});
    const router = useRouter();
    
    const handleLogin  = async (e: FormEvent) => {
        e.preventDefault();

        if(valueEmail.length && valuePassword.length){
            const isSuccess = await signIn("credentials", {
                redirect: false,
                email: valueEmail,
                password: valuePassword
            });
            
            if(isSuccess && isSuccess.ok) router.push("/")
            else router.push("/login");
        }
    }
    
    return (
        <main className="h-screen bg-black-800 flex items-center justify-center">
            <section className="bg-black-700 rounded px-10 py-6">
                <div>
                    <form onSubmit={handleLogin} className="flex flex-col gap-y-4 min-w-[360px]">
                        <Input label="Email" placeholder="Email" required value={valueEmail} {...restEmail} />
                        <Input label="Senha" type="password" placeholder="Senha" value={valuePassword} {...restPassword} />
                        <Button>Acessar</Button>
                    </form>
                </div>
            </section>
        </main>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req, res } = context;
    const session = await unstable_getServerSession(req, res, authOptions);

    if(session) return {
            redirect: { destination: "/", permanent: true }
        }

    return {
        props: {}
    }
}

export default Login