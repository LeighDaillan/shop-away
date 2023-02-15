import ProductCard from "@/components/ProductCard";

const Electronics = function ({ products }) {
  return (
    <>
      <div className="text-center mt-20">
        <h1 className="text-4xl font-bold mb-5">Electronics</h1>
        <p className="max-w-4xl mx-10 md:mx-auto leading-7">
          Electronic devices are components for controlling the flow of
          electrical currents for the purpose of information processing and
          system control. Prominent examples include transistors and diodes.
          Electronic devices are usually small and can be grouped together into
          packages called integrated circuits.
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

export default Electronics;

export async function getServerSideProps() {
  const res = await fetch(
    "https://fakestoreapi.com/products/category/electronics"
  );
  const products = await res.json();
  return {
    props: {
      products,
    },
  };
}
