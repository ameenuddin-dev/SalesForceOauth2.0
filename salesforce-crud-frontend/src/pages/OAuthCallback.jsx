import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const OAuthCallback = () => {
  const navigate = useNavigate();

  const { checkAuth } = useAuth();

  useEffect(() => {
    const completeLogin = async () => {
      console.log("OAuth callback page loaded");

      try {
        const authenticated = await checkAuth();

        console.log("AUTH RESULT:", authenticated);

        if (authenticated) {
          navigate("/dashboard", {
            replace: true,
          });
        } else {
          navigate("/login", {
            replace: true,
          });
        }
      } catch (error) {
        console.error("OAuth callback error:", error);

        navigate("/login", {
          replace: true,
        });
      }
    };

    completeLogin();
  }, [checkAuth, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

        <p className="text-sm text-slate-600">Completing Salesforce login...</p>
      </div>
    </div>
  );
};

export default OAuthCallback;
