import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { signIn, signOut, useSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: session, status: sessionStatus } = useSession();
  console.log(session, sessionStatus);
  
  if(sessionStatus === "unauthenticated") signIn();

  return (
    <>
      <div>
        <button onClick={() => signIn()}>Login</button>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;

  return {
      props: {}
  }
}
