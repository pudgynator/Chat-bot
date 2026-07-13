import { useState } from "react"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export function RegisterPage() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();

    const handleSumbit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:3000/api/register', {
                phone,
                name,
                password
            })
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className="flex relative p-0 md:p-2 h-screen w-screen overflow-hidden 
            justify-center
            bg-[url('/images/bg-image.jpg')] bg-cover bg-center bg-no-repeat" 
        > 
            <div className="flex flex-col items-center justify-center
                bg-white/90 backdrop-blur-md border border-white/30 shadow-sm rounded-2xl 
                md:w-[350px] md:min-w-[300px] w-full h-full bg-white
            ">
                <h1 className="text-xl font-semibold">Sign in to Messenger</h1>
                <h3 className="flex flex-col items-center text-zinc-400 text-sm mb-4">Please enter your phone number 
                    <span className="">
                        and name for registration.
                    </span>
                </h3>
                <form className="flex flex-col gap-4 w-full p-4" onSubmit={handleSumbit}>
                    <input 
                        className="rounded-xl border border-zinc-400 px-2 py-2.5 text-xs opacity-80" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        type="tel" 
                        pattern="^\+380\d{9}$"
                        placeholder="+380 ... ... ..." />
                    <input 
                        className="rounded-xl border border-zinc-400 px-2 py-2.5 text-xs opacity-80" 
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        type="text" 
                        placeholder="Name" />
                    <input
                        className="rounded-xl border border-zinc-400 px-2 py-2.5 text-xs opacity-80 mb-2"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <button type='submit' className="bg-zinc-600 text-white rounded-xl p-2 font-medium cursor-pointer">SIGN IN</button>
                </form>
                <span className="text-zinc-400 text-sm mb-4">
                    Already have an account? {" "}
                    <Link to="/login" className="text-zinc-800 underline">Log in</Link>
                </span>
            </div>
        </div>
    )
}