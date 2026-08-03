import { useState } from "react"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export function RegisterPage() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSumbit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage(null);

        try {
            await axios.post(`${import.meta.env['VITE_API_URL']}/api/register`, {
                phone,
                name,
                password
            })
            navigate('/login');
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const serverMessage = error.response.data?.message;

                if (serverMessage.status === 400 || error.response.status === 409) {
                    setErrorMessage(serverMessage || 'User with this phone number already exists');
                } else {
                    setErrorMessage(serverMessage || 'Failed to register. Please try again.');
                }
            } else {
                setErrorMessage('Network error. Please check your connection.');
            }
        }
    }
    return (
        <div className="flex relative p-0 md:p-2 h-screen w-screen overflow-hidden 
            justify-center
            bg-[url('/images/bg-image.jpg')] bg-cover bg-center bg-no-repeat" 
        > 
            <div className="flex flex-col items-center justify-center
                bg-zinc-200 backdrop-blur-md border border-white/30 shadow-sm md:rounded-2xl 
                md:w-[350px] md:min-w-[300px] w-full h-full bg-white
            ">
                <h1 className="text-xl font-semibold">Sign in to Messenger</h1>
                <h3 className="flex flex-col items-center text-zinc-400 text-sm mb-4">Please enter your phone number, 
                    <span className="">
                        name and password for registration.
                    </span>
                </h3>
                <form className="flex flex-col gap-4 md:w-full w-[350px] p-4" onSubmit={handleSumbit}>
                    <div className="rounded-3xl px-4 bg-white shadow-sm">
                        <input 
                            className="w-full  text-sm border-b border-zinc-300 bg-transparent py-3 outline-none" 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            type="tel" 
                            pattern="^\+380\d{9}$"
                            placeholder="+38 0.. ... ...." />
                        <input 
                            className="w-full text-sm border-b border-zinc-300 bg-transparent py-3 outline-none" 
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            type="text" 
                            placeholder="Name" />
                        <input
                            className="w-full text-sm py-2 outline-none mb-2"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                    </div>
                    <button type='submit' className="bg-zinc-600 text-white rounded-3xl p-2 font-medium cursor-pointer">SIGN IN</button>
                    {errorMessage && (
                        <div className="flex items-center justify-center text-red-500 text-center font-light text-sm max-w-[70%] mx-auto">
                            {errorMessage}
                        </div>
                    )}
                </form>
                <span className="text-zinc-400 text-sm mb-4">
                    Already have an account? {" "}
                    <Link to="/login" className="text-zinc-800 underline">Log in</Link>
                </span>
            </div>
        </div>
    )
}