import { Modal } from "flowbite-react";
import React, { useState } from "react";
import { login, signUp } from "./service/auth.service";
import { useDispatch } from "react-redux";
import { setToken } from "@/lib/redux/reducer/authReducer";

function Auth({ openModal, onCloseModal }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(""); // For error messages
  const [loading, setLoading] = useState(false); // For loading state

  const dispatch = useDispatch(); // Access Redux dispatch
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError("");
    setLoading(true);
    try {
      let response;
      if (isSignUp) {
        if (password !== confirmPassword) {
          setError("Passwords do not match.");
          setLoading(false);
          return;
        }
        response = await signUp({
          email,
          password,
          confirmPassword,
          firstName,
          lastName,
          gender,
          dob,
          phone,
        });
      } else {
        response = await login({ email, password });
      }
      // Dispatch token to Redux store
      if (response.token) {
        dispatch(setToken(response.token));
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
      <Modal
        show={openModal}
        theme={{ content: { base: "h-auto p-4 w-full" } }}
        size="lg"
        onClose={onCloseModal}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="relative mx-auto max-w-7xl">
            <div className="relative overflow-hidden bg-white">
              <div>
                <h2 className="text-xl md:text-3xl font-bold">
                  {isSignUp ? "Sign Up" : "Log In"}
                </h2>
                <form
                  method="POST"
                  onSubmit={handleSubmit}
                  className="mt-4 md:mt-8"
                >
                  <div className="space-y-2 md:space-y-4">
                    {isSignUp && (
                      <>
                        <div>
                          <label
                            htmlFor="first-name"
                            className="text-sm md:text-base font-medium text-gray-900 "
                          >
                            First Name
                          </label>
                          <div className="mt-2.5">
                            <input
                              type="text"
                              id="first-name"
                              placeholder="First Name"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              className="block w-full p-2 md:p-4 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="last-name"
                            className="text-sm md:text-base font-medium text-gray-900 "
                          >
                            Last Name
                          </label>
                          <div className="mt-2.5">
                            <input
                              type="text"
                              id="last-name"
                              placeholder="Last Name"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              className="block w-full p-2 md:p-4 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="gender"
                            className="text-sm md:text-base font-medium text-gray-900 "
                          >
                            Gender
                          </label>
                          <div className="mt-2.5">
                            <select
                              id="gender"
                              value={gender}
                              onChange={(e) => setGender(e.target.value)}
                              className="block w-full p-2 md:p-4 text-gray-900 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900"
                              required
                            >
                              <option value="">Select Gender</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="dob"
                            className="text-sm md:text-base font-medium text-gray-900 "
                          >
                            Date of Birth
                          </label>
                          <div className="mt-2.5">
                            <input
                              type="date"
                              id="dob"
                              value={dob}
                              onChange={(e) => setDob(e.target.value)}
                              className="block w-full p-2 md:p-4 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="phone"
                            className="text-sm md:text-base font-medium text-gray-900 "
                          >
                            Phone Number
                          </label>
                          <div className="mt-2.5">
                            <input
                              type="tel"
                              id="phone"
                              placeholder="Phone Number"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="block w-full p-2 md:p-4 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                              required
                            />
                          </div>
                        </div>
                      </>
                    )}

                    <div>
                      <label
                        htmlFor="email"
                        className="text-sm md:text-base font-medium text-gray-900 "
                      >
                        Email
                      </label>
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
                        <label
                          htmlFor="password"
                          className="text-sm md:text-base font-medium text-gray-900 "
                        >
                          Password
                        </label>
                        {!isSignUp && (
                          <a
                            href="#"
                            title=""
                            className="text-sm md:text-base font-medium text-gray-500 rounded hover:text-gray-900 hover:underline focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
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
                          <label
                            htmlFor="confirm-password"
                            className="text-sm md:text-base font-medium text-gray-900 "
                          >
                            Confirm Password
                          </label>
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

                    {error && (
                      <div className="text-red-500 text-sm mt-4">{error}</div>
                    )}

                    <div className="mt-5 md:mt-8">
                      <button
                        type="submit"
                        className="inline-flex w-full items-center justify-center px-4 py-2 md:px-6 md:py-4 text-base md:text-lg font-bold text-white bg-gray-900 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                      >
                        {loading
                          ? "Processing..."
                          : isSignUp
                          ? "Sign Up"
                          : "Log In"}
                      </button>
                    </div>
                  </div>
                </form>

                <div className="mt-4 md:mt-8">
                  <p className="text-center text-sm md:text-base font-medium text-gray-500">
                    {isSignUp ? (
                      <>
                        Already have an account?{" "}
                        <button
                          onClick={() => setIsSignUp(false)}
                          className="text-gray-900 hover:underline"
                        >
                          Log In
                        </button>
                      </>
                    ) : (
                      <>
                        Don't have an account?{" "}
                        <button
                          onClick={() => setIsSignUp(true)}
                          className="text-gray-900 hover:underline"
                        >
                          Sign Up
                        </button>
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Auth;
