import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");
  const [loadingSession, setLoadingSession] = useState(true);

  const { session, setSession, checkEmailConfirmed } = useAuthStore();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/auth/session", {
          credentials: "include", // if your backend uses cookies
        });
        if (!res.ok) {
          throw new Error("Failed to fetch session");
        }
        const data = await res.json();
        setSession(data.session);
      } catch (err) {
        setError("Error fetching session. Please log in again.");
      } finally {
        setLoadingSession(false);
      }
    };

    if (!session) {
      fetchSession();
    } else {
      setLoadingSession(false);
    }
  }, [session, setSession]);

  const handleCheck = async () => {
    setChecking(true);
    setError("");
    try {
      const isConfirmed = await checkEmailConfirmed();
      if (isConfirmed) {
        navigate("/onboarding");
      } else {
        setError("Your email is still not verified. Please check your inbox.");
      }
    } catch (err) {
      setError(err.message || "Error checking email status. Please try again.");
    } finally {
      setChecking(false);
    }
  };

  if (loadingSession) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin mr-2" />
        Loading session...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Session Not Found</h1>
        <p className="text-center mb-4">
          Please log in to continue.
        </p>
        <Button onClick={() => navigate("/login")}>Go to Login</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Check Your Email</h1>
      <p className="text-center mb-4">
        We’ve sent you a verification link. Please check your email and click the link to verify your account.
      </p>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <Button onClick={handleCheck} disabled={checking}>
        {checking ? <Loader2 className="animate-spin mr-2" /> : null}
        Refresh Status
      </Button>
    </div>
  );
};

export default VerifyEmail;
