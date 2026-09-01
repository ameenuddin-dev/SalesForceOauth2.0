const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
export default function Login() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-slate-900">Salesforce CRUD</h1>
        <p className="mt-2 text-sm text-slate-500">
          Sign in with your Salesforce Developer Org.
        </p>
        <button
          onClick={() => (window.location.href = `${API}/auth/login`)}
          className="mt-8 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Login with Salesforce
        </button>
        <p className="mt-5 text-xs text-slate-400">
          Authentication uses OAuth 2.0 + PKCE and an HttpOnly cookie.
        </p>
      </div>
    </main>
  );
}
