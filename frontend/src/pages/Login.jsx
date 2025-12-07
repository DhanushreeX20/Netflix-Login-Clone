import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  function handleEmail(evt) {
    setEmail(evt.target.value);
  }

  function handlePass(evt) {
    setPassword(evt.target.value);
  }

  function check(e) {
    e.preventDefault();

    const newErrors = {};

    // Frontend validation
    if (!email || !email.includes("@")) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password || password.length < 4 || password.length > 60) {
      newErrors.password = "Your password must contain between 4 and 60 characters.";
    }

    // Stop submit if frontend fails
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear frontend errors
    setErrors({});

    // Backend validation
    axios
      .get(`http://localhost:5000/login?email=${email}&password=${password}`)
      .then((data) => {
        if (data.data === true) {
          navigate("/Dashboard");
        } else {
          setErrors({
            email: "Invalid email or password.",
            password: "Invalid email or password."
          });
        }
      })
      .catch(() => {
        setErrors({
          email: "Server error. Try again later.",
        });
      });
  }


  return (
    <>
      {/* Header/logo above gradient (z-20) */}
      <header className="absolute top-7 left-9 z-20">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix"
          className="w-[145px]"
        />
      </header>



      <div className="relative min-h-screen w-full inset-0  bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/274d310a-9543-4b32-87f3-147b372abc00/web/IN-en-20251201-TRIFECTA-perspective_baf6d3bc-eece-4a63-bcbb-e0a2f5d9d9ec_large.jpg')] bg-cover bg-center z-0">


        {/* Gradient overlay behind everything except header */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80 z-10"></div>

        {/* Login Box */}
        <div className="relative z-20 flex justify-center lg:justify-start items-center pt-24
mb-12 px-6 md:px-20 lg:ml-80">

          <div className="bg-black/75  p-10 md:p-14 rounded-md w-full max-w-lg text-white ">

            <h1
              className="mb-5 pt-0"
              style={{
                fontFamily: `"Netflix Sans", "Helvetica Neue", "Segoe UI", Roboto, Ubuntu, sans-serif`,
                fontSize: "32px",
                fontWeight: 700,
                color: "#fff",
              }}
            >
              Sign In
            </h1>

            <form className="flex flex-col gap-4" onSubmit={check}>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email or mobile number"
                  value={email}
                  onChange={handleEmail}
                  className={`w-full p-4 rounded bg-[#111] text-white outline-none border   
      ${errors.email ? "border-red-600" : "border-gray-600"}`}
                />

                {errors.email && (
                  <p className="mt-2 flex items-center gap-2 text-sm text-red-600">
                    <span className="w-4 h-4 border border-red-600 rounded-full flex items-center justify-center text-xs">
                      ✕
                    </span>
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePass}
                  className={`w-full p-4 rounded bg-[#111] text-white outline-none border 
      ${errors.password ? "border-red-600" : "border-gray-600"}`}
                />

                {errors.password && (
                  <p className="mt-2 flex items-center gap-2 text-sm text-red-600">
                    <span className="w-4 h-4 border border-red-600 rounded-full flex items-center justify-center text-xs">
                      ✕
                    </span>
                    {errors.password}
                  </p>
                )}
              </div>




              <button
                onClick={check}
                className="bg-[#D80C16] hover:bg-red-700 p-2 rounded w-full font-semibold"
              >
                Sign In
              </button>


              <div className="flex items-center justify-center gap-3 mt-2 text-gray-400 text-sm">

                OR

              </div>

              <button
                type="button"
                className="bg-[#333] hover:bg-[#444] p-2 text-neutral-100 font-semibold rounded transition-all duration-300"
              >
                Use a sign-in code
              </button>

              <div className="text-center  mt-1">
                <span className="text-sm  font-semibold text-neutral-100 hover:underline hover-bg-white-bold cursor-pointer">
                  Forgot password?
                </span>
              </div>

              <div className="flex items-center space-x-2 text-white font-semibold text-sm lg:text-lg mt-2">
                <input type="checkbox" defaultChecked className="accent-slate-100" />
                <p>Remember me</p>
              </div>

              <p className="text-sm lg:text-lg text-gray-400 mt-1 lg:text-md">
                New to Netflix?{" "}
                <span className="text-white font-semibold hover:underline cursor-pointer">
                  Sign up now.
                </span>
              </p>

              <p className="text-xs lg:text-sm text-gray-500 pb-10 mt-1 leading-5">
                This page is protected by Google reCAPTCHA to ensure you're not a bot.<br></br>
                <span className="text-blue-500 cursor-pointer hover:underline ml-1">
                  Learn more.
                </span>
              </p>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="lg:py-20 mt-28 bg-[#313030] text-[#BABABA] lg:text-md">
          <footer className="relative z-20 w-full text-sm px-10 md:px-10">
            <p className="mb-4 lg:text-lg ">Questions? Call 000-800-919-1694 (Toll-Free)</p>

            <div className=" text-[#BABABA] grid grid-cols-2 md:grid-cols-4 gap-3 mt-8 mb-4">
              <a href="https://help.netflix.com/support/412" className="underline cursor-pointer">FAQ</a>
              <a href="https://help.netflix.com/support/412" className="underline cursor-pointer">Help Centre</a>
              <a href="https://help.netflix.com/support/412" className="underline cursor-pointer">Terms of Use</a>
              <a href="https://help.netflix.com/support/412" className="underline cursor-pointer">Privacy</a>
              <a href="https://help.netflix.com/support/412" className="underline cursor-pointer">Cookie Preferences</a>
              <a href="https://help.netflix.com/support/412" className="underline cursor-pointer">Corporate Information</a>
            </div>

            <div className="inline-block relative mb-10 mt-4">
              {/* Select Box */}
              <select className="appearance-none bg-black text-white border border-gray-500 px-10 py-2 rounded text-sm cursor-pointer hover:border-white transition w-full">
                <option value="english">English</option>
                <option value="tamil">தமிழ்</option>
                <option value="hindi">हिन्दी</option>
              </select>

              {/* Globe icon on the left */}
              <svg
                viewBox="0 0 16 16"
                width="16"
                height="16"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M10.77 5.33 10.5 6 9.34 8.94l-.57 1.44L7.33 14h1.78l.73-1.97h3.58l.74 1.97H16l-3.43-8.67zm-.15 4.6-.24.63h2.51l-1.26-3.35zm-1.1-5.09.1-.19h-3.2V2h-1.5v2.65H.55V6h3.77A11 11 0 0 1 0 10.43c.33.28.81.8 1.05 1.16 1.5-.91 2.85-2.36 3.88-4.02v5.1h1.49V7.52q.6.95 1.33 1.8l.57-1.43a12 12 0 0 1-1.34-1.9h2.09z"
                  clipRule="evenodd"
                ></path>
              </svg>

              {/* Down arrow on the right */}
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-white text-sm">
                ▼
              </div>
            </div>


          </footer>
        </div>
      </div>
    </>
  );
}

