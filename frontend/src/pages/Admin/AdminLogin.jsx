import React, { useState } from 'react';
import { ShieldCheck, User, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import { ADMIN_LOGIN_API_URL } from '../../config';

const AdminLogin = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username.trim() || !password.trim()) {
            toast.warn('Please fill in all fields.');
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(ADMIN_LOGIN_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: username.trim(), password: password.trim() })
            });

            const data = await response.json();
            if (response.ok && data.ok) {
                toast.success('Access Granted! Logging in...');
                setTimeout(() => {
                    onLogin(data.token);
                }, 1000);
            } else {
                toast.error(data.message || 'Invalid username or password.');
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error('Unable to connect to the server. Please ensure the backend is running.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-[117.65vh] flex items-center justify-center bg-[#0d1117] p-4">
            {/* Ambient Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div className="relative w-full max-w-md">
                {/* Visual Glassmorphic Glow Container */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#1f6feb] to-[#388bfd] rounded-2xl blur-lg opacity-10 pointer-events-none" />

                <div className="relative bg-[#161b22] border border-[#30363d] p-8 rounded-2xl shadow-2xl flex flex-col items-center">
                    {/* Shield Logo Icon */}
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#1f6feb] to-[#388bfd] flex items-center justify-center shadow-lg shadow-blue-500/10 mb-6">
                        <ShieldCheck size={32} className="text-white" />
                    </div>

                    <h2 className="text-2xl font-bold text-[#e6edf3] text-center tracking-tight">
                        MANO ERP Control
                    </h2>
                    <p className="text-xs text-[#8b949e] mt-1 mb-8 text-center">
                        Secure administrative login for portal operations
                    </p>

                    <form className="w-full space-y-5" onSubmit={handleSubmit} autoComplete="off">
                        {/* Username Input */}
                        <div>
                            <label className="block text-xs font-semibold text-[#8b949e] uppercase tracking-wider mb-2">
                                Username
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#8b949e]">
                                    <User size={16} />
                                </span>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter admin username"
                                    disabled={isLoading}
                                    autoComplete="username"
                                    className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] rounded-lg py-2.5 pl-10 pr-4 text-sm text-[#e6edf3] placeholder-[#484f58] transition-all outline-none"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-xs font-semibold text-[#8b949e] uppercase tracking-wider mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#8b949e]">
                                    <Lock size={16} />
                                </span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    disabled={isLoading}
                                    autoComplete="current-password"
                                    className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] rounded-lg py-2.5 pl-10 pr-10 text-sm text-[#e6edf3] placeholder-[#484f58] transition-all outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    disabled={isLoading}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#8b949e] hover:text-[#e6edf3] transition-colors"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full mt-2 bg-[#238636] hover:bg-[#2ea44f] border border-[#2188ff]/10 text-white font-semibold py-2.5 px-4 rounded-lg shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    Authorizing...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} theme="dark" />
        </div>
    );
};

export default AdminLogin;
