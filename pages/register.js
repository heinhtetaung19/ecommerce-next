import Layout from "@/components/Layout";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { getError } from "@/utils/error";
import axios from "axios";

const Register = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm();

    const onSubmit = async ({ name, email, password }) => {
        console.log(name, email, password);

        try {
            await axios.post("/api/auth/signup", {
                name,
                email,
                password,
            });
            router.push("/login?signup=success");
        } catch (error) {
            console.error(getError(error));
        }
    };

    return (
        <Layout title="Register">
            <form
                className="mx-auto my-4 max-w-screen-sm p-4"
                onSubmit={handleSubmit(onSubmit)}>
                <h1 className="mb-4 text-xl font-bold">Register</h1>

                {/* Name */}
                <div className="mb-4 flex flex-col gap-2">
                    <label>Name</label>
                    <input
                        type="text"
                        className="w-full"
                        id="name"
                        autoFocus
                        {...register("name", {
                            required: "Please enter name",
                            minLength: {
                                value: 3,
                                message:
                                    "Your name must be at least 3 characters",
                            },
                        })}
                    />
                    {errors.name && (
                        <div className="text-red-500">
                            {errors.name.message}
                        </div>
                    )}
                </div>

                {/* Email */}
                <div className="mb-4 flex flex-col gap-2">
                    <label>Email</label>
                    <input
                        type="email"
                        className="w-full"
                        id="email"
                        {...register("email", {
                            required: "Please enter email",
                            pattern: {
                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                                message: "Please enter valid email",
                            },
                        })}
                    />
                    {errors.email && (
                        <div className="text-red-500">
                            {errors.email.message}
                        </div>
                    )}
                </div>

                {/* Password */}
                <div className="mb-4 flex flex-col gap-2">
                    <label>Password</label>
                    <input
                        type="password"
                        className="w-full"
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
                        <div className="text-red-500">
                            {errors.password.message}
                        </div>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="mb-4 flex flex-col gap-2">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        className="w-full"
                        id="confirmPassword"
                        {...register("confirmPassword", {
                            required: "Please enter passowrd",
                            validate: value => value === getValues("password"),
                            minLength: {
                                value: 5,
                                message:
                                    "Password must be at least 5 characters",
                            },
                        })}
                    />
                    {errors.confirmPassword && (
                        <div className="text-red-500">
                            {errors.confirmPassword.message}
                        </div>
                    )}

                    {errors.confirmPassword &&
                        errors.confirmPassword.type === "validate" && (
                            <div className="text-red-500">
                                Passwords do not match
                            </div>
                        )}
                </div>

                <div className="mb-4">
                    <button className="primary-button w-full">Register</button>
                </div>
            </form>
        </Layout>
    );
};

export default Register;
