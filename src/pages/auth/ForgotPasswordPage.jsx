import ForgotPasswordForm from "../../components/Auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col justify-center min-h-screen">
      <div className="w-11/12 mt-10 mx-auto sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Forgot password
        </h2>
      </div>

      <ForgotPasswordForm />
    </div>
  );
}
