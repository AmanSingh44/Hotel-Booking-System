import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { verifyUserEmail } from "../api-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppContext } from "../contexts/AppContext";

export type EmailVerificationFormData = {
  userId: string;
  OTP: string;
};

const EmailVerification = () => {
  const { userData } = useAppContext();
  const userId = userData?.user?.id || "";
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<EmailVerificationFormData>();

  const mutation = useMutation(async (data: EmailVerificationFormData) => {
    await verifyUserEmail(data);
  }, {
    onSuccess: async () => {
      console.log("Email verified successfully!");
      toast.success("Email verified successfully!");
      navigate('/');
    },
    onError: (error: Error) => {
      console.error("Error verifying email:", error.message);
      toast.error("Error verifying email: " + error.message);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate({ ...data, userId });
  });

  return (
    <div className="rounded flex justify-center bg-slate-300 h-[1000px]">
      <div className="m-40 flex h-[400px] w-[400px]">
        <div className="bg-white justify-center rounded-3xl">
          <div className="p-2 ">
            <form onSubmit={handleSubmit(onSubmit)}>
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
                      {...register("OTP", { required: true })}
                      className="block w-[350px] rounded-md border-0 py-3.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-4 mt-2 ml-2"
                    />
                  </div>
                  {errors.OTP && <span className="text-red-600">This field is required</span>}
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
      <ToastContainer />
    </div>
  );
};

export default EmailVerification;
