import { useState } from "react";

interface LoginFormProps {
  onLoginSuccess: (token: string) => void;
}

function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "my-secret-key",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Email atau password salah");

      const data = await res.json();
      onLoginSuccess(data.token);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "24px" }}>
      <h2>Login</h2>
      <div style={{ marginBottom: "12px" }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "8px", width: "100%", marginBottom: "8px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "8px", width: "100%" }}
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button
        onClick={handleLogin}
        disabled={loading}
        style={{ padding: "8px 16px", cursor: "pointer" }}
      >
        {loading ? "Loading..." : "Login"}
      </button>
    </div>
  );
}

export default LoginForm;