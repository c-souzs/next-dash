import { GetServerSideProps } from "next"
import { signIn, signOut, useSession } from "next-auth/react"

export default function Home() {
  const { status: sessionStatus } = useSession();
  
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
