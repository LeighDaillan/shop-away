import ProductCard from "@/components/ProductCard";
import { RxCross2 } from "react-icons/rx";
import { useInView } from "react-intersection-observer";
import { useEffect, useState, useContext } from "react";
import { ProductContext } from "@/components/ProductContextProvider";
import Head from "next/head";

const Home = function ({ products }) {
  const { ref: welcomeRef, inView: welcomeVisible } = useInView();
  const { ref: sectionRef, inView: sectionVisible } = useInView();
  const [welcomeStatus, setWelcomeStatus] = useState();
  const { cartNumber, session } = useContext(ProductContext);
  useEffect(() => {
    if (!session) {
      setWelcomeStatus(true);
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>Arcane | Home Page</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className=" relative h-auto  my-10">
        {/* Welcome Banner */}
        {session && welcomeStatus && (
          <div
            ref={welcomeRef}
            className={`fixed text-sm z-10 bg-black rounded-l-sm bottom-10 right-0 text-white px-4 py-3 ${
              welcomeVisible
                ? "showAnimation ease-in duration-500"
                : "hideAnimation blur"
            }`}
          >
            <div className="flex gap-3">
              <RxCross2
                onClick={() => setWelcomeStatus(!welcomeStatus)}
                className="self-center cursor-pointer"
                size={25}
              />
              <p>
                Hi {session.user.name}! <br /> Welcome Back to Arcane.
              </p>
            </div>
          </div>
        )}
        <section
          ref={sectionRef}
          className={`mx-10 md:mx-20 my-14 md:my-32 ${
            sectionVisible
              ? "opacity-100 ease-in duration-500 translate-y-0"
              : "opacity-0 translate-y-10 blur"
          }`}
        >
          {/* Grid of Cards */}
          <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-20 p-5 `}>
            {/* cards */}
            <ProductCard products={products} />
          </div>
        </section>

        <section className="bg-neutral-200 px-10 py-32 text-center ">
          <h1 className="text-3xl md:text-5xl font-bold">⌈ About ⌋</h1>
          <p className=" lg:px-72 text-center py-5 text-lg md:text-xl lg:text-2xl leading-10">
            We have everything at Arcane for you—even online! Find everything
            you need and love in one spot, including stylish clothing, trendy
            jewelery, fun promotions, and hassle-free services. The Aracane is
            right at your fingertips, available for you anytime, anywhere. Shop
            now!
          </p>
        </section>
      </main>
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  const res = await fetch("https://fakestoreapi.com/products?limit=9");
  const products = await res.json();
  return {
    props: {
      products,
    },
  };
}
