import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import Product from "@/models/Product";
import db from "@/utils/db";
import { useStoreContext } from "@/utils/Store";
import { toast } from "react-toastify";

const ProductBySlug = props => {
    const { product } = props;
    console.log("product", product);

    const { state, dispatch } = useStoreContext();

    const addToCartHandler = async () => {
        const existedItem = state.cart.cartItems.find(
            item => item.slug === product.slug,
        );
        const quantity = existedItem ? existedItem.quantity + 1 : 1;

        if (product.countInStock < quantity) {
            toast.error("Sorry, product is out of stock");
            return;
        }

        dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    };

    if (!product) {
        return (
            <Layout title="Product Not Found">
                <h1 className="text-center text-3xl font-bold">
                    Product Not Found
                </h1>
            </Layout>
        );
    }
    return (
        <Layout title="Product">
            <Link href="/">
                <button className="secondary-button">
                    Back to products page
                </button>
            </Link>
            <div className="mx-auto w-4/5">
                <div className="grid md:grid-cols-3 md:gap-4">
                    <div className="mb-4">
                        <Image
                            src={product.image}
                            alt={product.slug}
                            width={640}
                            height={640}
                        />
                    </div>

                    <div className="md:col-span-2 lg:col-span-1">
                        <ul>
                            <li>
                                <p className="mb-2 text-xl font-bold">
                                    {product.name}
                                </p>
                            </li>
                            <li>
                                <p className="font-semibold">
                                    Rating {product.rating} of{" "}
                                    {product.numReviews} Reviews
                                </p>
                            </li>

                            <li>
                                <div className="card my-4 p-4">
                                    <div className="mb-2 flex justify-between">
                                        <p className="font-bold">Category</p>
                                        <p className="capitalize">
                                            {product.category} kit
                                        </p>
                                    </div>

                                    <div className="mb-2 flex justify-between">
                                        <p className="font-bold">Price</p>
                                        <p>{product.price} mmk</p>
                                    </div>

                                    <div className="mb-2 flex justify-between">
                                        <p className="font-bold">Status</p>
                                        <p>
                                            {product.countInStock > 0
                                                ? "In Stock"
                                                : "Unavailable"}
                                        </p>
                                    </div>

                                    <button
                                        onClick={addToCartHandler}
                                        className="primary-button">
                                        Add to cart
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export const getServerSideProps = async context => {
    const { params } = context;
    const { slug } = params;

    await db.connect();
    const product = await Product.findOne({ slug }).lean();
    await db.disconnect();

    return {
        props: {
            product: product ? db.convertDocToObj(product) : null,
        },
    };
};

export default ProductBySlug;
