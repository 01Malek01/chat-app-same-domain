import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRegister } from "../ApiHooks/useRegister";
import toast from "react-hot-toast";

// Define the validation schema using zod
const formSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    displayName: z.string().min(1, "Display Name is required"),
    email: z.string().email("Invalid email address"),
    gender: z.enum(["male", "female"], { required_error: "Gender is required" }),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Define the form's data structure using TypeScript
export type SignUpFormValues = z.infer<typeof formSchema>;

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(formSchema),
  });
  const { register: registerFunction, loading } = useRegister();
  const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
    await registerFunction(data);
  };

  return (
    <>
{
  loading && toast.loading("Loading...") 

}
      <div className="flex flex-col items-center justify-center w-96 mx-auto">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-15">
          <h1 className="text-3xl font-semibold text-center text-gray-300">
            Sign Up
            <span className="rounded-full bg-sky-400 p-3">ChatWme.com</span>
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="label p-5">
                <span className="label-text text-base">
                  Name (this won't be public)
                </span>
              </label>
              <input
                className="input input-bordered h-10 w-full"
                placeholder="Bob"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500">{errors.name?.message}</p>
              )}
            </div>
            <div>
              <label className="label p-5">
                <span className="label-text text-base">Display Name</span>
              </label>
              <input
                className="input input-bordered h-10 w-full"
                placeholder="Bobby"
                {...register("displayName")}
              />
              {errors.displayName && (
                <p className="text-red-500">{errors.displayName?.message}</p>
              )}
            </div>
            <div>
              <label className="label p-5">
                <span className="label-text text-base">Email</span>
              </label>
              <input
                className="input input-bordered h-10 w-full"
                placeholder="example@ex.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email?.message}</p>
              )}
            </div>
            <div>
              <div className="space-y-4 space-x-5">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio h-5 w-5 text-primary cursor-pointer"
                    value="male"
                    {...register("gender")}
                  />
                  <span className="ml-2 text-gray-700">Male</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio h-5 w-5 text-primary cursor-pointer"
                    value="female"
                    {...register("gender")}
                  />
                  <span className="ml-2 text-gray-700">Female</span>
                </label>
              </div>
              {errors.gender && (
                <p className="text-red-500">{errors.gender?.message}</p>
              )}
            </div>
            <div>
              <label className="label p-5">
                <span className="label-text text-base">Password</span>
              </label>
              <input
                className="input input-bordered h-10 w-full"
                placeholder="Password"
                type="password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password?.message}</p>
              )}
            </div>
            <div>
              <label className="label p-5">
                <span className="label-text text-base">Password Confirm</span>
              </label>
              <input
                className="input input-bordered h-10 w-full"
                placeholder="Password Confirm"
                type="password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-red-500">
                  {errors.confirmPassword?.message}
                </p>
              )}
              <span>
                Already have an account?{" "}
                <Link to="/login" className="link link-primary">
                  Login
                </Link>
              </span>
              <button
                className="btn btn-block btn-sm mt-2 hover:bg-blue-400 hover:text-black h-10"
                type="submit"
                disabled={loading}
              >
                {loading ? "Loading..." : "Sign Up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
