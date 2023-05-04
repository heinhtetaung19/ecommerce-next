import Image from "next/image";
import Link from "next/link";
import { useStoreContext } from "@/utils/Store";
import { toast } from "react-toastify";

const ProductItem = ({ product }) => {
    const { state, dispatch } = useStoreContext();

    const addToCartHandler = () => {
        const existedItem = state.cart.cartItems.find(
            item => item.slug === product.slug,
        );
        const quantity = existedItem ? existedItem.quantity + 1 : 1;

        if (product.countInStock < quantity) {
            toast.error("Sorry, product is out of stock");
            return;
        }

        dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
        toast.success("Added item to the cart");
    };

    return (
        <div className="card relative">
            <Link href={`/products/${product.slug}`}>
                <div className="relative h-28 w-full md:h-52">
                    <Image
                        src={product.image}
                        alt={product.slug}
                        fill
                        sizes="(max-width: 768px) 100vw,
                                (max-width: 1200px) 50vw,
                                33vw"
                        priority
                        className="object-contain transition-all hover:opacity-80"
                    />
                </div>
            </Link>

            <div className="my-4 flex h-[75px] flex-col items-center justify-center gap-2 text-xs md:text-sm">
                <Link href={`/product/${product.slug}`}>
                    <h1 className="product-name text-center">{product.name}</h1>
                </Link>

                <p className="font-semibold text-gray-700">
                    {product.price.toLocaleString()} mmk
                </p>
            </div>

            <div className="flex flex-col justify-center gap-2 md:mb-2 md:flex-row">
                <Link href={`/products/${product.slug}`}>
                    <button
                        className="primary-button w-full transition-all md:w-auto"
                        type="button">
                        View Details
                    </button>
                </Link>

                <button
                    className="primary-button w-full transition-all md:w-auto"
                    type="button"
                    onClick={addToCartHandler}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductItem;
