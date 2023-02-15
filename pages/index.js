import ProductCard from "@/components/ProductCard";

const Home = function ({ products }) {
  return (
    <main className=" h-auto  my-10">
      <section className="mx-10 md:mx-20 my-14 md:my-32">
        {/* Grid of Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-20 p-5">
          {/* cards */}
          <ProductCard products={products} />
        </div>
      </section>

      <section className="bg-neutral-200 px-10 py-32 text-center ">
        <h1 className="text-3xl md:text-5xl font-bold">⌈ About ⌋</h1>
        <p className=" lg:px-72 text-center py-5 text-lg md:text-xl lg:text-2xl leading-10">
          We have everything at Arcane for you—even online! Find everything you
          need and love in one spot, including stylish clothing, trendy
          jewelery, fun promotions, and hassle-free services. The Aracane is
          right at your fingertips, available for you anytime, anywhere. Shop
          now!
        </p>
      </section>
    </main>
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
