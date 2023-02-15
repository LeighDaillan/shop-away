import ProductCard from "@/components/ProductCard";

const Jewelery = function ({ products }) {
  return (
    <>
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-20 p-5">
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
