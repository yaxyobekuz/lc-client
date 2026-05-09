// Components
import LoginForm from "@/features/auth/components/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm p-6 border">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold">Tizimga kirish</h1>
          <p className="text-sm text-gray-500 mt-1">
            Davom etish uchun login va parolingizni kiriting
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
