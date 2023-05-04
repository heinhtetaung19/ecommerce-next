import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import { useStoreContext } from "@/utils/Store";
import { FaTrash as TrashIcon } from "react-icons/fa";
import {
    AiOutlinePlus as IncreaseIcon,
    AiOutlineMinus as DecreaseIcon,
} from "react-icons/ai";

const Cart = () => {
    const { data: session } = useSession();

    const { state, dispatch } = useStoreContext();
    const { cartItems } = state.cart;

    const router = useRouter();

    const shippingHandler = () => {
        router.push("/shipping");
    };

    const removeItemHandler = item => {
        dispatch({ type: "CART_REMOVE_ITEM", payload: item });
    };

    const increaseItemQuantity = item => {
        if (item.quantity > item.countInStock) {
            alert("The product is out of stock");
            return;
        }
        dispatch({ type: "INCREASE_ITEM_QUANTITY", payload: item });
    };

    const decreaseItemQuantity = item => {
        if (item.quantity <= 1) {
            return false;
        }
        dispatch({ type: "DECREASE_ITEM_QUANTITY", payload: item });
    };

    const clearCart = () => {
        dispatch({ type: "CLEAR_CART_ITEMS" });
    };

    console.log('cart', state.cart);

    return (
        <Layout title="Shopping Cart">
            <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center">
                {session?.user ? (
                    <div className="text-xl font-bold">
                        {session.user.name}&apos;s Shopping Cart
                    </div>
                ) : (
                    <div className="text-xl font-bold">Shopping Cart</div>
                )}

                {cartItems.length > 0 && (
                    <button className="secondary-button" onClick={clearCart}>
                        Clear Cart
                    </button>
                )}
            </div>

            {cartItems.length === 0 ? (
                <div className="alert w-full text-sm">
                    Cart is empty. Go to{" "}
                    <Link href="/" className="underline">
                        shopping page
                    </Link>
                </div>
            ) : (
                <div className="grid gap-2 md:gap-4 lg:grid-cols-4">
                    <div className="md:col-span-3">
                        <table className="min-w-full">
                            <thead className="border-b">
                                <tr>
                                    <th className="p-4 text-left">Item</th>
                                    <th className="p-4 text-center">
                                        Quantity
                                    </th>
                                    <th className="p-4 text-center">Price</th>
                                    <th className="p-4 text-center">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {cartItems.map(item => (
                                    <tr key={item.slug}>
                                        <td className="flex-col gap-2 p-4 md:flex-row">
                                            <Image
                                                src={item.image}
                                                alt={item.slug}
                                                width={50}
                                                height={50}
                                            />
                                            <p className="product-name text-sm">
                                                {item.name}
                                            </p>
                                        </td>
                                        <td>
                                            <div className="flex items-center justify-center gap-2 md:gap-4">
                                                <button
                                                    className="bg-red-500 p-1 text-white"
                                                    onClick={() =>
                                                        decreaseItemQuantity(
                                                            item,
                                                        )
                                                    }>
                                                    <DecreaseIcon />
                                                </button>
                                                <p>{item.quantity}</p>
                                                <button
                                                    className="bg-green-600 p-1 text-white"
                                                    onClick={() =>
                                                        increaseItemQuantity(
                                                            item,
                                                        )
                                                    }>
                                                    <IncreaseIcon />
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            <p className="text-center">
                                                {item.price} mmk
                                            </p>
                                        </td>
                                        <td className="text-center">
                                            <button
                                                onClick={() =>
                                                    removeItemHandler(item)
                                                }>
                                                <TrashIcon className="h-10 w-5 text-red-600" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="card max-h-36 w-[80%] p-4 md:w-full">
                        <ul>
                            <li>
                                <div className="mb-3 flex gap-4">
                                    <span>Total items:</span>
                                    <span>
                                        {cartItems.reduce(
                                            (accumulator, currentValue) =>
                                                accumulator +
                                                currentValue.quantity,
                                            0,
                                        )}
                                    </span>
                                </div>
                                <div className="mb-3 flex gap-4">
                                    <span>Total price:</span>
                                    <span>
                                        {cartItems.reduce(
                                            (accumulator, currentValue) =>
                                                accumulator +
                                                currentValue.quantity *
                                                currentValue.price,
                                            0,
                                        )}{" "}
                                        mmk
                                    </span>
                                </div>
                            </li>
                            <li>
                                <button
                                    className="primary-button"
                                    onClick={shippingHandler}>
                                    Go shipping
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
