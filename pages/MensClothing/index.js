import { useInView } from "react-intersection-observer";
import ProductCard from "@/components/ProductCard";

const MensClothing = function ({ products }) {
  const { ref: sectionRef, inView: sectionVisible } = useInView();
  return (
    <>
      <div className="text-center mt-20">
        <h1 className="text-4xl font-bold mb-5">Men's Clothing</h1>
        <p className="max-w-4xl mx-10 md:mx-auto leading-7">
          Check out all the freshest styles your wardrobe needs in our
          men&apos;s clothing range. You&apos;ll find a roundup of everyday
          essentials, including tops and T-Shirts, as well as comfy lounge sets
          and underwear. Formal event coming up? Scroll no further than our
          men&apos;s blazers and suits for the sharpest looks and nail the dress
          code.
        </p>
      </div>
      <section className="mx-10 md:mx-20 my-14  md:my-10">
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

export default MensClothing;

export async function getServerSideProps() {
  const res = await fetch(
    "https://fakestoreapi.com/products/category/men's%20clothing"
  );
  const products = await res.json();
  return {
    props: {
      products,
    },
  };
}
