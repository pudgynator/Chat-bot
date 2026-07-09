import { useState } from "react"
import axios from "axios";

export function RegisterPage() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    const handleSumbit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        await axios.post('http://localhost:3000/api/register', {
            phone,
            name,
            password
        })
    }
    return (
        <div className="flex relative p-0 md:p-2 h-screen w-screen overflow-hidden bg-[url('/images/bg-image.jpg')] bg-cover bg-center bg-no-repeat" > 
            <div className="flex flex-col items-center justify-center
                bg-white/70 backdrop-blur-md border border-white/30 shadow-sm rounded-2xl 
                md:w-[350px] md:min-w-[300px] w-full h-full bg-white
            ">
                <h1>Sign in to Messanger</h1>
                <h3>Please enter your phone number and name</h3>
                <form className="flex flex-col" onSubmit={handleSumbit}>
                    <input 
                        className="rounded-lg" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        type="tel" 
                        placeholder="Phone number" />
                    <input 
                        className="rounded-lg" 
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        type="text" 
                        placeholder="Name" />
                    <input
                        className="rounded-lg"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <button type='submit' className="bg-zinc-400 text-white rounded-lg p-2">Sign In</button>
                </form>
            </div>
        </div>
    )
}