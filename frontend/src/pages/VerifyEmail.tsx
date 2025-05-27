import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, MailCheck } from "lucide-react";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");

  const handleCheck = async () => {
    setChecking(true);
    // You can add real verification check here if needed
    setTimeout(() => {
      setChecking(false);
      navigate("/login");
    }, 1500); // simulate loading
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#e0f7f7] to-[#f7f7f7] p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center animate-fade-in">
        <div className="flex justify-center mb-4">
          <MailCheck className="h-16 w-16 text-[#22CCBE]" />
        </div>
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Check Your Email</h1>
        <p className="text-gray-600 mb-4">
          We’ve sent you a verification link. Please check your inbox and click the link to verify your account.
        </p>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <Button
          onClick={handleCheck}
          className="w-full flex justify-center items-center gap-2 bg-[#22CCBE] hover:bg-[#1db5a9] text-white font-semibold rounded-lg py-3 transition"
          disabled={checking}
        >
          {checking && <Loader2 className="h-5 w-5 animate-spin" />}
          Continue to Login
        </Button>
      </div>
    </div>
  );
};

export default VerifyEmail;
