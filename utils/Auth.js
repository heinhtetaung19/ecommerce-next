import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Auth = ({ children }) => {
    const router = useRouter();
    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/login");
        },
    });

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    return children;
};

export default Auth;
