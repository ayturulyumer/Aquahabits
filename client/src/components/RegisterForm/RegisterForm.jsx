import GoogleIcon from "../../svg/google-icon.svg";
import RegisterIcon from "../../svg/add-user-icon.svg";
import { Link } from "react-router";
import { useForm } from "../../hooks/useForm.jsx";

import Button from "../Button/Button.jsx";

export default function RegisterForm() {

    const handleRegisterSubmit = (values) => {
        console.log(values)
    }

    const { values, changeHandler, onSubmit } = useForm({ email: "", password: "", rePassword: "" }, handleRegisterSubmit)

    return (

        <div className="max-w-screen-xl w-[300px] shadow rounded-box flex justify-center sm:w-auto ">
            <div className="p-6 sm:p-12">
                <div className="mt-6 flex flex-col items-center">
                    <div className="w-full flex-1 ">
                        <div className="flex flex-col items-center">
                            <Button isBlock iconLeft={GoogleIcon} iconAlt="Google Icon" variant="btn-outline" className="btn-primary-content">Sign up with google</Button>
                        </div>
                        <div className="my-12 border-b  border-gray-900 text-center">
                            <div className="leading-none px-2 inline-block text-sm   uppercase  tracking-wide font-medium  transform translate-y-1/2">
                                Or
                            </div>
                        </div>
                        {/** Form */}
                        <form className="mx-auto max-w-xs" onSubmit={onSubmit}>
                            <label htmlFor="email" className="block  mb-2 text-sm font-medium ">
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
                                placeholder="habi@tect.com"
                            />


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

                            <Button isBlock iconRight={RegisterIcon} iconAlt="Register Icon" className="btn-secondary  mt-8">Sign up</Button>
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
