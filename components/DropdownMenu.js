import Link from "next/link";
import { useStoreContext } from "@/utils/Store";
import { Menu } from "@headlessui/react";
import { useSession, signOut } from "next-auth/react";
import { IoMdArrowDropdown as DropdownIcon } from "react-icons/io";

const DropdownMenu = () => {
    const { data: session } = useSession();
    const { dispatch } = useStoreContext();

    const logoutHandler = () => {
        dispatch({ type: "CLEAR_CART" });
        signOut({ callbackUrl: "/login" });
    };

    return (
        <Menu as="div" className="inline-block">
            <Menu.Button className="flex items-center">
                {session.user.name}
                <span>
                    <DropdownIcon />
                </span>
            </Menu.Button>

            <Menu.Items className="absolute right-0 z-20 flex w-40 origin-top-right flex-col bg-white shadow-lg">
                <Menu.Item>
                    <Link className="dropdown-link" href="/profile">
                        Profile
                    </Link>
                </Menu.Item>

                <Menu.Item>
                    <Link
                        className="dropdown-link"
                        href="/login"
                        onClick={logoutHandler}>
                        Logout
                    </Link>
                </Menu.Item>
            </Menu.Items>
        </Menu>
    );
};

export default DropdownMenu;
