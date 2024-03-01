import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory hook
import { verifyUserEmail } from "../api-client";

const EmailVerification = () => {
  const [formData, setFormData] = useState<{ OTP: string }>({
    OTP: "",
  });
  const navigate=useNavigate()

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await verifyUserEmail(formData);
      console.log("Email verified successfully!");
      navigate('/')
       // Navigate to login page after successful verification
    } catch (error) {
      console.error("Error verifying email:", error.message);
    }
  };

  return (
    <div className="rounded flex justify-center bg-slate-300 h-[1000px]">
      <div className="m-40 flex h-[400px] w-[400px]">
        <div className="bg-white justify-center rounded-3xl">
          <div className="p-2 ">
            <form onSubmit={handleSubmit}>
              <p className="pt-4 pl-2 font-bold text-xl text-blue-950">
                Email Verification
              </p>
              <div className="">
                <label
                  htmlFor="OTP"
                  className="block pl-2 mt-2 text-sm font-semibold leading-4 text-gray-800"
                >
                  Enter OTP
                </label>
                <div className="mt-1">
                  <div className="relative">
                    <input
                      id="OTP"
                      name="OTP"
                      type="text"
                      placeholder="Enter your OTP"
                      required
                      value={formData.OTP}
                      onChange={handleInputChange}
                      className="block w-[350px] rounded-md border-0 py-3.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-4 mt-2 ml-2"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                    >
                      Verify Account
                    </button>
                    <button className="ml-2">I don't have OTP</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
