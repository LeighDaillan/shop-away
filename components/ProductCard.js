import Image from "next/image";

const ProductCard = function ({ products }) {
  const ratings = function (rating) {
    let rate = [];
    const singleRate = rating[0];
    for (let i = 1; i <= singleRate; i++) {
      rate.push("★");
    }
    return rate;
  };

  return (
    <>
      {products.map((data) => {
        return (
          <div key={data.id} className="border  px-5 py-5 rounded-xl">
            {data.rating.rate.toString()[0] >= 3 ? (
              <span className="text-white shrink inline-block bg-black px-2 py-1 my-3 rounded-md">
                Top sellers
              </span>
            ) : (
              ""
            )}
            <div className=" flex flex-col h-96 text-center gap-3  ">
              <Image
                src={data.image}
                className="mx-auto w-auto h-auto overflow-auto cursor-pointer hover:scale-150 ease-in-out duration-500"
                width={180}
                height={180}
                alt="product"
                priority={true}
              />
              <h4>{data.title}</h4>
              <h5 className="text-sm">
                {ratings(data.rating.rate.toString())} ({data.rating.count})
              </h5>
              <h6>$ {data.price}</h6>
              <div>
                <button className="border-black border-2 px-3 py-1 rounded-md hover:bg-black hover:text-white ease-in duration-200 ">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProductCard;
