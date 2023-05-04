import Layout from "@/components/Layout";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { AiFillWarning as WarningIcon } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { getError } from "@/utils/error";

const Login = () => {
    const router = useRouter();
    const { signup } = router.query;

    useEffect(() => {
        if (signup === "success") {
            toast.success(
                "Successfully registered your account. Please log in.",
            );
        }
    }, [signup]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async ({ email, password }) => {
        try {
            const result = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });

            if (result.error) {
                toast.error(result.error);
                return;
            }
            router.push("/");
        } catch (err) {
            toast.error(getError(err));
        }
    };

    return (
        <Layout title="Login">
            <form
                className="mx-auto my-4 max-w-[450px] p-4"
                onSubmit={handleSubmit(onSubmit)}>
                <h1 className="mb-4 text-xl font-bold">Login</h1>

                <div className="mb-4 flex flex-col gap-2">
                    <label>Email</label>
                    <input
                        type="email"
                        className="w-4/5"
                        id="email"
                        autoFocus
                        {...register("email", {
                            required: "Please enterr email",
                            pattern: {
                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                                message: "Please enter valid email",
                            },
                        })}
                    />
                    {errors.email && (
                        <div className="error-status">
                            <WarningIcon />
                            <p>{errors.email.message}</p>
                        </div>
                    )}
                </div>

                <div className="mb-4 flex flex-col gap-2">
                    <label>Password</label>
                    <input
                        type="password"
                        className="w-4/5"
                        id="password"
                        {...register("password", {
                            required: "Please enter passowrd",
                            minLength: {
                                value: 5,
                                message:
                                    "Password must be at least 5 characters",
                            },
                        })}
                    />
                    {errors.password && (
                        <div className="error-status">
                            <WarningIcon />
                            <p>{errors.password.message}</p>
                        </div>
                    )}
                </div>

                <div className="mb-4">
                    <button className="primary-button w-4/5">Login</button>
                </div>

                <div className="mb-4">
                    <span className="mr-2">
                        Don&apos;t have an account yet?
                    </span>
                    <span>
                        <Link
                            href="/register"
                            className="text-blue-600 underline">
                            Register
                        </Link>
                    </span>
                </div>
            </form>
        </Layout>
    );
};

export default Login;
