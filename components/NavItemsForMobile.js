import Link from "next/link";
import { useStoreContext } from "@/utils/Store";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import {
    AiOutlineClose as CloseIcon,
    AiOutlineMenu as MenuIcon,
} from "react-icons/ai";

const NavItemsForMobile = ({ toggle, setToggle, cartItemCount }) => {
    const { data: session } = useSession();

    const { dispatch } = useStoreContext();

    const logoutHandler = () => {
        dispatch({ type: "CLEAR_CART_ITEMS" });
        signOut({ callbackUrl: "/login" });
    };

    return (
        <div className="block text-xl md:hidden">
            {toggle ? (
                <motion.div
                    animate={{ x: [200, 0] }}
                    transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                    }}
                    className="absolute right-0 top-0 z-10 min-h-screen w-[200px] bg-gray-700">
                    <CloseIcon
                        className="float-right m-2 cursor-pointer text-xl text-white"
                        onClick={() => setToggle(false)}
                    />

                    <div className="mx-4 mt-10">
                        {session?.user && (
                            <Link href="profile">
                                <div className="nav-item mb-2">
                                    {session.user.name}
                                </div>
                            </Link>
                        )}

                        <Link href="/">
                            <div className="nav-item mb-2">Home</div>
                        </Link>

                        {session?.user && (
                            <Link href="/profile">
                                <div className="nav-item mb-2">Profile</div>
                            </Link>
                        )}

                        <Link href="/cart">
                            <div className="nav-item mb-2">
                                Cart
                                {cartItemCount > 0 && (
                                    <span className="badge">
                                        {cartItemCount}
                                    </span>
                                )}
                            </div>
                        </Link>

                        {!session?.user && (
                            <Link href="/register">
                                <div className="nav-item mb-2">Register</div>
                            </Link>
                        )}

                        {!session?.user && (
                            <Link href="/login">
                                <div className="nav-item mb-2">Login</div>
                            </Link>
                        )}

                        {session?.user && (
                            <Link
                                href="/login"
                                onClick={logoutHandler}>
                                <div className="nav-item mb-2">Logout</div>
                            </Link>
                        )}
                    </div>
                </motion.div>
            ) : (
                <MenuIcon
                    className="cursor-pointer text-xl"
                    onClick={() => setToggle(true)}
                />
            )}
        </div>
    );
};

export default NavItemsForMobile;
