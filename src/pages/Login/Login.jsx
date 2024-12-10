import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGreetings from "../../components/Greetings/Greetings";
import { TbEyeFilled } from "react-icons/tb";
import { AiFillEyeInvisible } from "react-icons/ai";
import Lottie from "lottie-react";
import animation from "../../assets/animation/Animation - 1731918504107.json";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import PrimaryLoading from "../../components/Loading/PrimaryLoading";
import { jwtDecode } from "jwt-decode";
import { setUser } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";

const Login = () => {
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    usernameOrMobile: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (value.trim() === "") {
      setErrorMessage(
        `${name.charAt(0).toUpperCase() + name.slice(1)} is required`
      );
    } else {
      setErrorMessage("");
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      usernameOrMobile: formData?.usernameOrMobile,
      password: formData?.password,
    };

    if (!data?.usernameOrMobile || !data?.password) {
      setErrorMessage("All fields are required");
      return;
    }

    try {
      const res = await login(data).unwrap();
      const token = res?.accessToken;
      const decoded = jwtDecode(token);

      const user = {
        user: decoded,
        token: token,
      };
      dispatch(setUser(user));
      toast.success("Logged in successfully");
      navigate("/");
    } catch (error) {
      setErrorMessage("Login failed: " + error?.data?.message);
    }
  };

  const { currentDateTime, greeting } = useGreetings();
  return (
    <div className="min-h-screen login">
      <div className="flex justify-center items-center min-h-screen login-content max-w-[118rem] mx-auto px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-3xl font-bold text-center">{greeting}</h2>
          <p className="text-center mb-6 text-[16px]">{currentDateTime}</p>

          {errorMessage && (
            <div
              className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{errorMessage}</span>
            </div>
          )}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="email">
                Username or Mobile
              </label>
              <input
                className="w-full p-3 border border-gray-300 rounded mt-1"
                type="text"
                name="usernameOrMobile"
                value={formData.usernameOrMobile}
                onChange={handleChange}
                placeholder="Username or Mobile"
              />
            </div>
            <div className="mb-4 relative">
              <label className="block text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                className="w-full p-3 border border-gray-300 rounded mt-1"
                type={visible ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
              {visible ? (
                <TbEyeFilled
                  onClick={() => setVisible(!visible)}
                  className="absolute bottom-[14px] right-3 cursor-pointer text-xl"
                />
              ) : (
                <AiFillEyeInvisible
                  onClick={() => setVisible(!visible)}
                  className="absolute bottom-[14px] right-3 cursor-pointer text-xl"
                />
              )}
            </div>
            <div className="mb-4 flex items-center justify-end">
              <Link
                href="#"
                className="text-sm text-yellow-500 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <button
              disabled={
                formData?.email?.length == 0 ||
                formData?.password?.length == 0 ||
                isLoading
                // fetchCurrentUserInfoLoading
              }
              type="submit"
              className="w-full flex justify-center items-center bg-[#001529] text-white p-3 rounded-lg hover:bg-[#E6F4FF] transition duration-500 hover:text-[#5977FF]"
            >
              {isLoading ? <PrimaryLoading /> : "LOGIN"}
            </button>
          </form>
        </div>
        <div className="hidden md:block w-1/2 h-full">
          <div className="flex flex-col justify-center items-center h-full">
            <Lottie
              className="h-[380px]"
              animationData={animation}
              loop={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
