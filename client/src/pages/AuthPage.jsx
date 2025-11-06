import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function AuthPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const { login, signup } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let success;
        if (isLogin) {
            success = await login(email, password);
        } else {
            success = await signup(email, password);
        }
        if (success) {
            navigate("/");
        }
    }

    return (
        <div className="flex items-center justify-center h-screen bg-background overflow-hidden">
            <div className="md:flex w-80 bg-secondary rounded-3xl flex-col p-7 gap-4">
                <h2 className="text-xl font-semibold mb-4">{isLogin ? "Log In" : "Sign Up"}</h2>
                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                    <div className="flex items-center bg-muted rounded-xl px-4 py-2">
                        <input
                            type="email"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 outline-none placeholder:text-muted-foreground text-muted-foreground"
                        />
                    </div>
                    <div className="flex items-center bg-muted rounded-xl px-4 py-2">
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 outline-none placeholder:text-muted-foreground text-muted-foreground"
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-2 h-10 w-full rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center text-primary-foreground font-semibold transition-all shadow disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLogin ? "Sign In" : "Sign Up"}
                    </button>
                </form>
                <div className="mt-6 text-center text-sm text-muted-foreground">
                    {isLogin ? (
                        <span>
                            Don't have an account?{' '}
                            <button
                                type="button"
                                className="text-primary underline hover:opacity-80 transition"
                                onClick={() => setIsLogin(false)}
                            >
                                Sign Up
                            </button>
                        </span>
                    ) : (
                        <span>
                            Already have an account?{' '}
                            <button
                                type="button"
                                className="text-primary underline hover:opacity-80 transition"
                                onClick={() => setIsLogin(true)}
                            >
                                Log in
                            </button>
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}
