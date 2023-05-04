import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { useStoreContext } from "@/utils/Store";
import { getError } from "@/utils/error";
import { toast } from "react-toastify";

const ConfirmOrder = () => {
    const { state, dispatch } = useStoreContext();
    const { cartItems, shippingAddress } = state.cart;

    const router = useRouter();

    const itemsPrice = cartItems ? cartItems.reduce(
        (accumulator, currentValue) =>
            accumulator + currentValue.price * currentValue.quantity,
        0,
    ) : 0;

    const shippingPrice = itemsPrice >= 200000 ? 0 : 3000;
    const totalPrice = itemsPrice + shippingPrice;

    const confirmOrderHandler = async () => {
        try {
            dispatch({ type: "CLEAR_CART_ITEMS" });
            router.push("/?order=success");
        } catch (error) {
            toast.error(getError(error));
        }
    };

    console.log('cart', state.cart);

    return (
        <Layout title="Confirm Order">
            <div className="mx-auto md:w-[80%]">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-xl font-bold">Confirm Order Page</h1>
                    <Link href='/cart'>
                        <button className="secondary-button md:hidden">
                            Go to Cart
                        </button>
                    </Link>
                </div>

                {cartItems.length === 0 ? (
                    <div className="alert w-full text-sm">
                        Cart is empty. Go to{" "}
                        <Link href="/" className="underline">
                            shopping page
                        </Link>
                    </div>
                ) : (
                    <div>
                        {/* order summary */}
                        <div className="card mb-8 p-4 md:w-[50%] lg:w-[30%]">
                            <h2 className="mb-2 text-lg font-semibold">
                                Order Summary
                            </h2>

                            <div className="mb-4 flex justify-between">
                                <div className="flex flex-col gap-1">
                                    <p>Items&apos; price :</p>
                                    <p>Delivery fee :</p>
                                    <p>Total :</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p>{itemsPrice} mmk</p>
                                    <p>{shippingPrice} mmk</p>
                                    <p>{totalPrice} mmk</p>
                                </div>
                            </div>
                            <button
                                onClick={confirmOrderHandler}
                                className="primary-button w-full">
                                Confirm Order
                            </button>
                        </div>

                        {/* customer's info */}
                        <div className="card mb-8 p-4">
                            <h2 className="mb-2 text-lg font-semibold">
                                Customer&apos;s shipping info
                            </h2>
                            <div className="flex flex-col gap-1">
                                <p>{shippingAddress.fullName}</p>
                                <p>{shippingAddress.phoneNumber}</p>
                                <p>{shippingAddress.city}</p>
                                <p>{shippingAddress.postalCode}</p>
                                <Link href="/shipping">
                                    <button className="primary-button w-auto">
                                        Edit info
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* ordered items */}
                        <div className="card mb-8 p-4">
                            <table className="min-w-full">
                                <thead className="border-b">
                                    <tr>
                                        <th className="p-4 text-left">Item</th>
                                        <th className="p-4 text-center">
                                            Quantity
                                        </th>
                                        <th className="p-4 text-center">
                                            Price
                                        </th>
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
                                                    <p>{item.quantity}</p>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="text-center">
                                                    {item.price * item.quantity}{" "}
                                                    mmk
                                                </p>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

ConfirmOrder.auth = true;

export default ConfirmOrder;
