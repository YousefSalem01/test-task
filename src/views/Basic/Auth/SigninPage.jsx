import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Button } from "../../../uikit/Button/Button";
import TextField from "../../../uikit/TextField/TextField";
import IconButton from "../../../uikit/IconButton/IconButton";
import { Link } from "react-router-dom";
import videoSrc from "../../../assets/videos/hero.webm";
import logoSrc from "../../../assets/logos/armin-cx-logo-blue.0885e649.svg";
import { FaGoogle } from "react-icons/fa";
import { ChatWidget } from "../../../components/ChatWidget/ChatWidget";

// Custom Microsoft icon component
const Microsoft = props => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...props}>
    <path fill="#f25022" d="M0 0h11.5v11.5H0z" />
    <path fill="#00a4ef" d="M0 12.5h11.5V24H0z" />
    <path fill="#7fba00" d="M12.5 0H24v11.5H12.5z" />
    <path fill="#ffb900" d="M12.5 12.5H24V24H12.5z" />
  </svg>
);

export function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    // In a real app, this would authenticate the user
    // For demo purposes, we'll navigate to the onboarding page
    window.location.href = "/onboarding";
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Video */}
      <div className="w-full md:w-1/2 bg-gray-900 relative overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          src={videoSrc}
          poster="/placeholder.svg?height=1080&width=1920"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue/80 to-light-blue/80 mix-blend-multiply" />
      </div>

      {/* Right side - Sign in form */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <img src={logoSrc} alt="armincx logo" className="h-8" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to armincx</h1>
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>

          {/* Social login buttons */}
          <div className="space-y-3 mb-6">
            <button className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg p-3 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
            <button className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg p-3 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
              <Microsoft />
              <span>Continue with Microsoft</span>
            </button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Email/password form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <TextField
                label="Email"
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                leftIcon={<Mail size={18} className="text-gray-400" />}
                required
              />

              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                leftIcon={<Lock size={18} className="text-gray-400" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                }
                onRightIconClick={() => setShowPassword(!showPassword)}
                required
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue focus:ring-blue border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-blue hover:underline">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <Button type="submit" className="w-full py-2.5 rounded-lg">
                Sign in
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center text-xs text-gray-500">
            By signing in, you agree to our{" "}
            <a href="#" className="text-blue hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
      <ChatWidget />
    </div>
  );
}
