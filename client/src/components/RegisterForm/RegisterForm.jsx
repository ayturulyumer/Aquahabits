import GoogleIcon from "../../svg/google-icon.svg";
import RegisterIcon from "../../svg/add-user-icon.svg";
import { Link } from "react-router";

import Button from "../Button/Button.jsx";
export default function RegisterForm() {
    return (

        <div className="max-w-screen-xl m-0 sm:m-10 shadow sm:rounded-lg flex justify-center ">
            <div className="p-6 sm:p-12">
                <div className="mt-12 flex flex-col items-center">
                    <div className="w-full flex-1 mt-8">
                        <div className="flex flex-col items-center">
                            <Button isBlock iconLeft={GoogleIcon} iconAlt="Google Icon" variant="btn-outline" className="btn-primary-content">Sign up with google</Button>
                        </div>
                        <div className="my-12 border-b  border-gray-900 text-center">
                            <div className="leading-none px-2 inline-block text-sm   uppercase  tracking-wide font-medium  transform translate-y-1/2">
                                Or
                            </div>
                        </div>
                        <div className="mx-auto max-w-xs">
                            <label htmlFor="email" className="block  mb-2 text-sm font-medium ">
                                Email
                            </label>
                            <input
                                id="email"
                                className="w-full px-4 py-4 rounded-lg  font-medium bg-inherit border border-gray-200  focus:placeholder-gray-700 focus:text-gray-700 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                type="email"
                                placeholder="habi@tect.com"
                            />


                            <label htmlFor="password" className="block mt-5 mb-2 text-sm font-medium ">
                                Password
                            </label>
                            <input
                                id="password"
                                className="w-full px-4 py-4 rounded-lg  bg-inherit font-medium border border-gray-200 text-sm focus:outline-none focus:text-gray-700 focus:border-gray-400 focus:bg-white"
                                type="password"
                            />
                            <label htmlFor="re-password" className="block mt-5 mb-2 text-sm font-medium ">
                                Repeat Password
                            </label>
                            <input
                                id="re-password"
                                className="w-full px-4 py-4 rounded-lg  bg-inherit font-medium border border-gray-200 text-sm focus:outline-none focus:text-gray-700 focus:border-gray-400 focus:bg-white"
                                type="password"
                            />
                        </div>

                        <Button isBlock iconLeft={RegisterIcon} iconAlt="Register Icon" className="btn-secondary mt-8">Sign up</Button>
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
                <p className="text-center mt-4">Already have an account ? <Link className="link mx-1">Login</Link></p>
            </div>
        </div>


    )
}
