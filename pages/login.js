import Head from "next/head";
import { signIn, getSession } from "next-auth/react";
import { BsGoogle } from "react-icons/bs";

const Login = function () {
  // Google Handler Function
  const handleGoogleSignin = async function () {
    return signIn("google", { callbackUrl: process.env.NEXT_URL });
  };

  return (
    <>
      <Head>
        <title>Arcane | Sign In</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className="bg-slate-100 h-screen pt-20">
        <section className="max-w-sm sm:max-w-lg md:max-w-xl bg-white mx-auto text-center rounded-lg p-2 h-80">
          <div className="border-b-2 py-2 my-10">
            <span className="text-5xl font-bold inline-block px-2">Arcane</span>
          </div>
          <h1 className="mt-10 mb-5 font-bold">To continue, log in Arcane.</h1>
          <div className="max-w-sm mx-auto">
            <div className="flex justify-center content-center border-2 border-black text-black hover:bg-black hover:text-white ease-in-out duration-150 py-2 rounded-full my-2 ">
              <BsGoogle size={20} />
              <button onClick={handleGoogleSignin} className="ml-2">
                Continue with Google
              </button>
            </div>
          </div>
          <p className="max-w-sm mx-auto opacity-75 text-sm my-6">
            By signing up, you agree to Stream&apos;s &nbsp;
            <span className="underline">Terms of Use</span> and &nbsp;
            <span className="underline">Privacy Policy.</span>
          </p>
        </section>
      </main>
    </>
  );
};

export default Login;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: process.env.NEXT_URL,
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
