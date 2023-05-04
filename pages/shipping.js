import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import { useStoreContext } from "@/utils/Store";
import { useForm } from "react-hook-form";
import { AiFillWarning as WarningIcon } from "react-icons/ai";

const Shipping = () => {
    const { state, dispatch } = useStoreContext();
    const { cart } = state;
    const { cartItems, shippingAddress } = cart;

    const router = useRouter();

    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
    } = useForm();

    useEffect(() => {
        if (shippingAddress) {
            setValue("fullName", shippingAddress.fullName);
            setValue("phoneNumber", shippingAddress.phoneNumber);
            setValue("city", shippingAddress.city);
            setValue("postalCode", shippingAddress.postalCode);
        }
    }, [setValue, shippingAddress]);

    const onSubmit = ({ fullName, phoneNumber, city, postalCode }) => {
        dispatch({
            type: "SAVE_SHIPPING_ADDRESS",
            payload: { fullName, phoneNumber, city, postalCode },
        });

        router.push("/confirmorder");
    };

    console.log('cart', cart);

    return (
        <Layout title="Shipping">
            {cartItems.length < 1 ? (
                <div className="alert">
                    <span className="mr-2">Cart is empty.</span>
                    <span>Please fill your cart first.</span>

                    <p>
                        <Link href="/" className="underline">
                            Go to shopping page
                        </Link>
                    </p>
                </div>
            ) : (
                <div>
                    <form
                        className="mx-auto max-w-[450px]"
                        onSubmit={handleSubmit(onSubmit)}>
                        <h1 className="mb-4 text-xl font-bold">
                            Shipping Address
                        </h1>

                        <div className="mb-4">
                            <label htmlFor="fullName">Full Name</label>
                            <input
                                type="text"
                                className="w-full"
                                autoFocus
                                {...register("fullName", {
                                    required: "Please enter full name",
                                })}
                            />
                            {errors.fullName && (
                                <div className="error-status">
                                    <WarningIcon />
                                    <p>{errors.fullName.message}</p>
                                </div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input
                                type="text"
                                className="w-full"
                                {...register("phoneNumber", {
                                    required: "Please enter phone number",
                                    pattern: {
                                        value: /^[0-9\b]+$/,
                                        message: "Please enter only number",
                                    },
                                })}
                            />
                            {errors.phoneNumber && (
                                <div className="error-status">
                                    <WarningIcon />
                                    <p>{errors.phoneNumber.message}</p>
                                </div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="city">City</label>
                            <input
                                type="text"
                                className="w-full"
                                {...register("city", {
                                    required: "Please enter city",
                                })}
                            />
                            {errors.city && (
                                <div className="error-status">
                                    <WarningIcon />
                                    <p>{errors.city.message}</p>
                                </div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="postalCode">Postal Code</label>
                            <input
                                type="text"
                                className="w-full"
                                {...register("postalCode", {
                                    required: "Please enter postal code",
                                })}
                            />
                            {errors.postalCode && (
                                <div className="error-status">
                                    <WarningIcon />
                                    <p>{errors.postalCode.message}</p>
                                </div>
                            )}
                        </div>

                        <div>
                            <button className="primary-button">Confirm</button>
                        </div>
                    </form>
                </div>
            )}
        </Layout>
    );
};

Shipping.auth = true;

export default Shipping;
