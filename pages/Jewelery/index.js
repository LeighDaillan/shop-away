import { useInView } from "react-intersection-observer";
import ProductCard from "@/components/ProductCard";
import { useEffect, useContext } from "react";
import { ProductContext } from "@/components/ProductContextProvider";
import Head from "next/head";

const Jewelery = function ({ products }) {
  const { ref: sectionRef, inView: sectionVisible } = useInView();
  const { cartNumber, session } = useContext(ProductContext);

  return (
    <>
      <Head>
        <title>Arcane | Jewelery</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="text-center mt-20">
        <h1 className="text-4xl font-bold mb-5">Jewelery</h1>
        <p className="max-w-4xl mx-10 md:mx-auto leading-7">
          Jewellery (UK) or jewelry (U.S.) consists of decorative items worn for
          personal adornment, such as brooches, rings, necklaces, earrings,
          pendants, bracelets, and cufflinks. Jewellery may be attached to the
          body or the clothes. From a western perspective, the term is
          restricted to durable ornaments, excluding flowers for example.
        </p>
      </div>
      <section className="mx-10 md:mx-20 my-14 md:my-10">
        {/* Grid of Cards */}
        <div
          ref={sectionRef}
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-20 p-5 ${
            sectionVisible
              ? "opacity-100 ease-in duration-700 translate-y-0"
              : "opacity-0 translate-y-10 blur"
          }`}
        >
          {/* cards */}
          <ProductCard products={products} />
        </div>
      </section>
    </>
  );
};

export default Jewelery;

export async function getServerSideProps() {
  const res = await fetch(
    "https://fakestoreapi.com/products/category/jewelery"
  );
  const products = await res.json();
  return {
    props: {
      products,
    },
  };
}
