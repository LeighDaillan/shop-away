import { useInView } from "react-intersection-observer";
import ProductCard from "@/components/ProductCard";
import { useEffect, useContext } from "react";
import { ProductContext } from "@/components/ProductContextProvider";

const WomensClothing = function ({ products }) {
  const { ref: sectionRef, inView: sectionVisible } = useInView();
  const { cartNumber, session } = useContext(ProductContext);

  useEffect(() => {
    if (session) {
      cartNumber();
    }
  }, [session]);
  return (
    <>
      <div className="text-center mt-20">
        <h1 className="text-4xl font-bold mb-5">Women's Clothing</h1>
        <p className="max-w-4xl mx-10 md:mx-auto leading-7">
          Refresh your daily rotation with our women&apos;s clothing range. With
          the freshest styles available all in one place, you can expect
          everyday basics, like women's tops and skirts, as well as must-have
          knitwear and cosy loungewear for downtime days. Plans to go out? Our
          women's dresses line up mini, midi and maxi styles that were made for
          summer evenings, while our stylish jeans and trousers offer something
          to flatter every silhouette.
        </p>
      </div>
      <section className="mx-10 md:mx-20 md:my-10">
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

export default WomensClothing;

export async function getServerSideProps() {
  const res = await fetch(
    "https://fakestoreapi.com/products/category/women's%20clothing"
  );
  const products = await res.json();
  return {
    props: {
      products,
    },
  };
}
