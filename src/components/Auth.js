import { Modal } from "flowbite-react";
import React, { useState } from "react";
import { login, signUp } from "./service/auth.service"; 

function Auth({ openModal, onCloseModal,setIsLoggedIn }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // For error messages
  const [loading, setLoading] = useState(false); // For loading state

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError("");
    setLoading(true);
    try {
      if (isSignUp) {
        if (password !== confirmPassword) {
          setError("Passwords do not match.");
          setLoading(false);
          return;
        }
        await signUp({ email, password });
      } else {
        await login({ email, password });
        setIsLoggedIn(true);
      }
      onCloseModal();
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Modal show={openModal} theme={{ content: { base: "h-auto p-4 w-full" } }} size="lg" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="relative mx-auto max-w-7xl">
            <div className="relative overflow-hidden bg-white">
              <div>
                <h2 className="text-xl md:text-3xl font-bold">
                  {isSignUp ? "Sign Up" : "Log In"}
                </h2>
                <form method="POST" onSubmit={handleSubmit} className="mt-4 md:mt-8">
                  <div className="space-y-2 md:space-y-4">
                    <div>
                      <label htmlFor="email" className="text-sm md:text-base font-medium text-gray-900 ">Email</label>
                      <div className="mt-2.5">
                        <input
                          type="email"
                          id="email"
                          placeholder="Email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="block w-full p-2 md:p-4 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <label htmlFor="password" className="text-sm md:text-base font-medium text-gray-900 ">Password</label>
                        {!isSignUp && (
                          <a
                            href="#"
                            title=""
                            className="text-sm md:text-base font-medium text-gray-500 rounded  hover:text-gray-900 hover:underline focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                          >
                            Forgot Password?
                          </a>
                        )}
                      </div>
                      <div className="mt-2.5">
                        <input
                          type="password"
                          id="password"
                          placeholder="Password (min. 8 characters)"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="block w-full p-2 md:p-4 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                          required
                        />
                      </div>
                    </div>

                    {isSignUp && (
                      <div>
                        <div className="flex items-center justify-between">
                          <label htmlFor="confirm-password" className="text-sm md:text-base font-medium text-gray-900 ">Confirm Password</label>
                        </div>
                        <div className="mt-2.5">
                          <input
                            type="password"
                            id="confirm-password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="block w-full p-2 md:p-4 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                            required
                          />
                        </div>
                      </div>
                    )}

                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    
                    <button
                      type="submit"
                      className={`flex items-center justify-center w-full px-8 py-4 text-sm md:text-base font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900  hover:bg-gray-600 ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
                      disabled={loading}
                    >
                      {loading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
                    </button>
                  </div>
                </form>
                <a
                  href="#"
                  title=""
                  className="flex items-center justify-center w-full px-8 py-4 mt-4 text-sm md:text-base font-bold text-gray-900 transition-all duration-200 bg-gray-100 border border-transparent rounded-xl hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 "
                  role="button"
                >
                  <svg className="w-5 h-5 mr-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* SVG paths */}
                  </svg>
                  Sign in with Google
                </a>

                <p className="mt-4 text-sm md:text-base font-normal text-center text-gray-900 ">
                  {isSignUp ? "Already have an account?" : "Don’t have an account?"}
                  <a
                    onClick={() => setIsSignUp((prev) => !prev)}
                    href="#"
                    title=""
                    className="font-bold rounded hover:underline focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                  >
                    {isSignUp ? "Log In" : "Create Free Account"}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Auth;
