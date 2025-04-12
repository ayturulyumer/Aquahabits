import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { useForm } from "../../hooks/useForm.jsx";

import GoogleIcon from "../../svg/google-icon.svg";
import RegisterIcon from "../../svg/add-user-icon.svg";
import { useGoogleLogin } from '@react-oauth/google';
import toast from "react-hot-toast";


import Button from "../Button/Button.jsx";

import { useAuth } from "../../context/authContext.jsx";

import * as auth from "../../actions/authActions.js";

export default function RegisterForm() {
    const [errors, setErrors] = useState({})
    const { login } = useAuth()

    const navigate = useNavigate()

    const handleRegisterSubmit = async (values) => {
        const newErrors = {};

        if (!values.name) {
            newErrors.name = "Name is required !"
        } else if (values.name.length < 4 || values.name.length > 20) {
            newErrors.name = "Name must be between 4 and 20 characters !"
        }

        if (!values.email) {
            newErrors.email = "Email is required !"
        }

        if (!values.password) {
            newErrors.password = "Password is required !"
        } else if (values.password.length < 8 || values.password.length > 20) {
            newErrors.password = "Password must be between 8 and 20 characters !"
        }

        if (!values.rePassword) {
            newErrors.rePassword = "Repeat password is required !"
        } else if (values.rePassword !== values.password) {
            newErrors.password = "Passwords must match !"
            newErrors.rePassword = "Passwords must match !"

        }


        setErrors(newErrors)
        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await auth.register(values.name, values.email, values.password)
                login(response.user, response.accessToken)
                navigate("/dashboard")
            } catch (err) {
                console.log(err)
                console.error("Registration failed:", err.message || err.message);
            }
            setErrors({})
        } else {
            console.log(errors)
        }

    }

    const handleGoogleSuccess = async (tokenResponse) => {
        toast.promise(
            auth.googleAuth(tokenResponse.code)
                .then((response) => {
                    login(response.user, response.accessToken);
                    navigate("/dashboard");
                    return response;
                }),
            {
                loading: "Please wait...",
                success: "Registered successfully!",
                error: "Register failed. Please try again.",
            }
        );
    };

    const handleGoogleError = (error) => {
        console.error("Google login error:", error);
    };

    const googleLogin = useGoogleLogin({
        onSuccess: handleGoogleSuccess,
        onError: handleGoogleError,
        flow: "auth-code"
    });

    const { values, changeHandler, onSubmit } = useForm({ name: "", email: "", password: "", rePassword: "" }, handleRegisterSubmit)

    return (

        <div className="max-w-screen-xl w-[300px] shadow rounded-box flex justify-center sm:w-auto ">
            <div className="p-6 sm:p-12">
                <div className="mt-6 flex flex-col items-center">
                    <div className="w-full flex-1 ">
                        <div className="flex flex-col items-center">
                            <Button onClick={() => googleLogin()} isBlock iconLeft={GoogleIcon} iconAlt="Google Icon" variant="btn-outline" className="btn-primary-content">Sign up with google</Button>
                        </div>
                        <div className="my-12 border-b border-gray-900 text-center">
                            <div className="leading-none px-2 inline-block text-sm   uppercase  tracking-wide font-medium  transform translate-y-1/2">
                                Or
                            </div>
                        </div>
                        {/** Form */}
                        <form onSubmit={onSubmit} className="mx-auto max-w-xs" >
                            <label htmlFor="name" className="block  mb-2 text-sm font-medium ">
                                Name
                            </label>
                            <input
                                id="name"
                                className="w-full px-4 py-4 rounded-lg  font-medium bg-inherit border border-gray-200  focus:placeholder-gray-700 focus:text-gray-700 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                type="name"
                                name="name"
                                value={values.name}
                                onChange={changeHandler}
                                required
                                placeholder="Stephen Strange"
                            />
                            {errors.name && <p className="text-red-600 tracking-wider text-sm mt-1">{errors.name}</p>}
                            <label htmlFor="email" className="block  mt-5 text-sm font-medium ">
                                Email
                            </label>
                            <input
                                id="email"
                                className="w-full px-4 py-4 rounded-lg  font-medium bg-inherit border border-gray-200  focus:placeholder-gray-700 focus:text-gray-700 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                type="email"
                                name="email"
                                value={values.email}
                                onChange={changeHandler}
                                required
                                placeholder="aqua@habits.com"
                            />
                            {errors.email && <p className="text-red-600 tracking-wider text-sm mt-1">{errors.email}</p>}
                            <label htmlFor="password" className="block mt-5 mb-2 text-sm font-medium ">
                                Password
                            </label>
                            <input
                                id="password"
                                className="w-full px-4 py-4 rounded-lg  bg-inherit font-medium border border-gray-200 text-sm focus:outline-none focus:text-gray-700 focus:border-gray-400 focus:bg-white"
                                type="password"
                                name="password"
                                value={values.password}
                                onChange={changeHandler}
                                required
                            />
                            {errors.password && <p className="text-red-500 tracking-wider text-sm mt-1">{errors.password}</p>}
                            <label htmlFor="rePassword" className="block mt-5 mb-2 text-sm font-medium ">
                                Repeat Password
                            </label>
                            <input
                                id="rePassword"
                                className="w-full px-4 py-4 rounded-lg  bg-inherit font-medium border border-gray-200 text-sm focus:outline-none focus:text-gray-700 focus:border-gray-400 focus:bg-white"
                                type="password"
                                name="rePassword"
                                value={values.rePassword}
                                onChange={changeHandler}
                                required
                            />
                            {errors.rePassword && <p className="text-red-500 tracking-wider text-sm mt-1">{errors.rePassword}</p>}
                            <Button isBlock iconRight={RegisterIcon} iconAlt="Register Icon" className=" mt-8">Sign up</Button>
                        </form>
                    </div>
                    <div className="text-xs text-center  mt-4 opacity-60">By signing up, you agree to our
                        <Link to="/tos" className="link mx-1" >
                            TOS
                        </Link>
                        &
                        <Link to="/privacy-policy" className="link mx-1">
                            Privacy Policy
                        </Link>
                    </div>
                </div>
                <p className="text-center mt-4">Already have an account ? <Link to="/login" className="link mx-1">Login</Link></p>
            </div>
        </div>


    )
}
