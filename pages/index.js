import Layout from "@/components/Layout";
import ProductItem from "@/components/ProductItem";
import Product from "@/models/Product";
import db from "@/utils/db";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Home = ({ products, latestProducts, popularProducts }) => {
    const router = useRouter();
    const { order } = router.query;

    useEffect(() => {
        if (order === "success") {
            toast.success("Ordered successfully");
            router.push("/");
        }
    }, [router, order]);

    return (
        <div>
            <Layout title="N31 Sports">
                <h4 className=" mb-4 bg-pink-600 p-1 text-center text-sm text-white">
                    Enjoy your sports wear collection with our{" "}
                    <b className="underline">Cash on Delivery</b> service
                </h4>
                {/* Latest Products */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold">Latest Collection</h1>
                    <div className="my-4 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 lg:grid-cols-5">
                        {latestProducts.map(product => (
                            <ProductItem key={product.slug} product={product} />
                        ))}
                    </div>
                </div>

                {/* Popular Products */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold">Popular Collection</h1>
                    <div className="my-4 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 lg:grid-cols-5">
                        {popularProducts.map(product => (
                            <ProductItem key={product.slug} product={product} />
                        ))}
                    </div>
                </div>

                {/* All Products */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold">All Collection</h1>
                    <div className="my-4 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 lg:grid-cols-5">
                        {products.map(product => (
                            <ProductItem key={product.slug} product={product} />
                        ))}
                    </div>
                </div>
            </Layout>
        </div>
    );
};

export async function getServerSideProps() {
    await db.connect();
    const products = await Product.find().lean();
    const latestProducts = await Product.aggregate([
        {
            $sort: { createdAt: -1 },
        },
        {
            $limit: 5,
        },
    ]);

    const popularProducts = await Product.aggregate([
        {
            $sort: { rating: -1 },
        },
        {
            $limit: 5,
        },
    ]);

    return {
        props: {
            products: products.map(product => db.convertDocToObj(product)),
            latestProducts: latestProducts.map(product =>
                db.convertDocToObj(product),
            ),
            popularProducts: popularProducts.map(product =>
                db.convertDocToObj(product),
            ),
        },
    };
}

export default Home;
