import { useState } from "react";
import { useForgotPasswordMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import PrimaryLoading from "../../components/Loading/PrimaryLoading";

const ForgotPassword = () => {
  const [answer, setAnswer] = useState("");
  const [mobile, setMobile] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showMobileInput, setShowMobileInput] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const navigate = useNavigate();

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleAnswerChange = (e) => {
    const newAnswer = e.target.value;
    setAnswer(newAnswer);

    if (newAnswer.toLowerCase() === "black cat") {
      setShowMobileInput(true);
    } else {
      setShowMobileInput(false);
      setMobile("");
    }
  };

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (answer.trim() === "") {
      toast.error("Please provide an answer to the security question.");
      return;
    }

    if (showMobileInput && mobile.trim() === "") {
      toast.error("Please provide your mobile number.");
      return;
    }

    // Simulate verification of the answer
    const isCorrectAnswer = answer.toLowerCase() === "black cat";

    if (isCorrectAnswer) {
      setShowPasswordFields(true);
    } else {
      toast.error("Incorrect answer. Please try again.");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword.trim() === "" || confirmPassword.trim() === "") {
      toast.error("Please fill in both password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const data = {
      answer,
      mobile,
      newPassword,
    };

    try {
      const res = await forgotPassword(data).unwrap();
      if (res?.success) {
        toast.success("Password updated successfully.");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.message || error?.data?.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Forgot Password
      </h1>

      {!showPasswordFields ? (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
        >
          <label
            htmlFor="security-question"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            What is your favourite pet?
          </label>
          <input
            type="text"
            id="security-question"
            value={answer}
            onChange={handleAnswerChange}
            placeholder="Enter your answer"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4"
          />

          {showMobileInput && (
            <>
              <label
                htmlFor="mobile-number"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Enter your mobile number
              </label>
              <input
                type="tel"
                id="mobile-number"
                value={mobile}
                onChange={handleMobileChange}
                placeholder="Enter your mobile number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4"
              />
            </>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            {isLoading ? <PrimaryLoading /> : "Submit Answer"}
          </button>
        </form>
      ) : (
        <form
          onSubmit={handlePasswordSubmit}
          className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
        >
          <label
            htmlFor="new-password"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            New Password
          </label>
          <input
            type="password"
            id="new-password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            placeholder="Enter new password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4"
          />

          <label
            htmlFor="confirm-password"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirm new password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4"
          />

          <button
            type="submit"
            className="w-full bg-green-500 text-white font-medium py-2 rounded-lg hover:bg-green-600 transition duration-200"
          >
            Update Password
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
