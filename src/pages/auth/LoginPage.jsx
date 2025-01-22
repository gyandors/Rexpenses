import LoginForm from "../../components/Auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col justify-center min-h-screen">
      <div className="w-11/12 mt-10 mx-auto sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <LoginForm />
    </div>
  );
}
