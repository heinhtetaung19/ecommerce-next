import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import NavItemsForWeb from "./NavItemsForWeb";
import NavItemsForMobile from "./NavItemsForMobile";
import { useStoreContext } from "@/utils/Store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ title, children }) => {
    const [toggle, setToggle] = useState(false);

    const { state } = useStoreContext();
    const { cart } = state;

    const [cartItemCount, setcartItemCount] = useState(0);

    useEffect(() => {
        setcartItemCount(
            cart.cartItems.reduce(
                (accumulator, currentValue) =>
                    accumulator + currentValue.quantity,
                0,
            ),
        );
    }, [cart.cartItems]);

    return (
        <div>
            <Head>
                <title>{title ? title : "N31 Sports"}</title>
            </Head>

            <ToastContainer
                position="bottom-center"
                autoClose={1000}
                limit={1}
                theme="dark"
            />

            <div className="flex min-h-screen flex-col justify-between">
                <header className="fixed z-20 min-w-full">
                    <nav className="flex h-12 items-center justify-between bg-white px-4 shadow-md">
                        <Link
                            href="/"
                            className="nav-brand text-2xl font-extrabold text-pink-600">
                            N31 Sports
                        </Link>

                        <NavItemsForWeb cartItemCount={cartItemCount} />

                        <NavItemsForMobile
                            toggle={toggle}
                            setToggle={setToggle}
                            cartItemCount={cartItemCount}
                        />
                    </nav>
                </header>

                <main className="container m-auto mt-16 px-4">{children}</main>

                <footer className="mt-8 bg-gray-700 p-4 font-thin text-white shadow-inner">
                    <h4 className="mb-4 text-center">
                        Copyright &copy; 2022, owned by N31 Sports
                    </h4>
                    <div className="mx-auto mb-4 grid w-[80%] gap-4 text-sm md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
                        <div>
                            <p className="font-semibold">For styling</p>
                            <p>tailwindcss</p>
                            <p>react toastify</p>
                            <p>headless ui</p>
                            <p>framer motion</p>
                        </div>

                        <div>
                            <p>React context and reducer for state management</p>
                            <p>react-hook-form for form validation</p>
                            <p>react-icon for icons</p>
                            <p>next-auth for user authentication</p>
                        </div>

                        <div>
                            <p>Mongo Atlas for database</p>
                            <p>Mongoose for schema</p>
                            <p>Axios for fetching api</p>
                            <p>js-cookie for managing cookies</p>
                        </div>

                        <div>
                            <p>Developed with NextJS</p>
                            <p>Deployed by Vercel</p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Layout;
