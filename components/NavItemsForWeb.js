import Link from "next/link";
import DropdownMenu from "./DropdownMenu";
import { useSession } from "next-auth/react";

const NavItemsForWeb = ({ cartItemCount }) => {
    const { status, data: session } = useSession();

    return (
        <div className="flex items-center">
            <div className="hidden md:block">
                <Link href="/cart">
                    <span className="nav-item p-2">
                        <span>Cart</span>
                        {cartItemCount > 0 && (
                            <span className="badge">{cartItemCount}</span>
                        )}
                    </span>
                </Link>

                {!session?.user && (
                    <Link href="/register">
                        <span className="nav-item p-2">Register</span>
                    </Link>
                )}

                {status === "loading" ? (
                    "Loading"
                ) : session?.user ? (
                    <DropdownMenu />
                ) : (
                    <Link href="/login">
                        <span className="nav-item p-2">Login</span>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default NavItemsForWeb;
