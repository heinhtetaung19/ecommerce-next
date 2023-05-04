import { useSession } from "next-auth/react";
import Layout from "@/components/Layout";

const Profile = () => {
    const { data: session } = useSession();

    return (
        <Layout title="Profile Page">
            {session?.user && (
                <div className="card mx-auto p-4 md:w-[40%]">
                    <h1 className="mb-2 text-xl font-bold">User Profile</h1>
                    <div className="mb-2">
                        <span>Name : </span>
                        <span>{session.user.name}</span>
                    </div>

                    <div className="mb-2">
                        <span>Email : </span>
                        <span>{session.user.email}</span>
                    </div>

                    {session.user.isAdmin ? (
                        <div className="mb-2">
                            <span>Role : </span>
                            <span>Admin</span>
                        </div>
                    ) : (
                        <div className="mb-2">
                            <span>Role : </span>
                            <span>User</span>
                        </div>
                    )}
                </div>
            )}
        </Layout>
    );
};

Profile.auth = true;

export default Profile;
