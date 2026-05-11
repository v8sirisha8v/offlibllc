import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BookOpen, Loader2, Eye, EyeOff, X } from "lucide-react";
import API_BASE from '../config';

const API = `${API_BASE}/auth`;

const inputBase = {
  width: "100%",
  padding: "11px 14px",
  border: "1px solid #E8E4DE",
  borderRadius: 10,
  fontSize: 14,
  color: "#1C1A17",
  background: "#ffffff",
  WebkitTextFillColor: "#1C1A17",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "'Satoshi', sans-serif",
  appearance: "none",
  WebkitAppearance: "none",
};

const labelStyle = {
  fontSize: 12,
  color: "#6B6560",
  display: "block",
  marginBottom: 6,
  fontFamily: "'Satoshi', sans-serif",
};

const Home = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [adminExists, setAdminExists] = useState(null);

  const [forgotMode, setForgotMode] = useState("idle");
  const [forgotUsername, setForgotUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState("");

  const [showSignup, setShowSignup] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupError, setSignupError] = useState("");
  const [signupData, setSignupData] = useState({
    username: "", password: "", first_name: "", last_name: ""
  });

  const [recoveryCode, setRecoveryCode] = useState("");
  const [showRecoveryCode, setShowRecoveryCode] = useState(false);

  useEffect(() => {
    fetch(`${API}/admin-exists`)
      .then(r => r.json())
      .then(d => setAdminExists(d.exists))
      .catch(() => setAdminExists(false));
  }, []);

  const resetForgotState = () => {
    setForgotMode("idle");
    setForgotUsername("");
    setOtp("");
    setNewPassword("");
    setForgotError("");
    setShowNewPassword(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) { setError("Please enter username and password."); return; }
    setLoading(true); setError("");
    try {
      const res = await fetch(`${API}/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password }),
      });
      if (!res.ok) { const d = await res.json().catch(() => null); throw new Error(d?.detail ?? "Invalid username or password."); }
      const data = await res.json();
      login(data);
      navigate("/library");
    } catch (e) { setError(e.message || "Login failed."); }
    finally { setLoading(false); }
  };

  const verifyCode = async () => {
    setForgotLoading(true); setForgotError("");
    try {
      const params = new URLSearchParams({
        username: forgotUsername.trim(),
        otp,
        new_password: newPassword,
      });
      const res = await fetch(`${API}/forgot-password/verify-code?${params}`, { method: "POST" });
      if (!res.ok) { const d = await res.json(); throw new Error(d.detail); }
      resetForgotState();
      setError("Password reset! Please log in.");
    } catch (e) { setForgotError(e.message || "Failed to verify."); }
    finally { setForgotLoading(false); }
  };

  const handleSignup = async () => {
    setSignupLoading(true); setSignupError("");
    try {
      const res = await fetch(`${API}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });
      if (!res.ok) { const d = await res.json().catch(() => null); throw new Error(d?.detail ?? "Signup failed."); }
      const data = await res.json();
      await fetch(`${API}/make-admin/${signupData.username}`, { method: "POST" });
      setRecoveryCode(data.recovery_code);
      setShowRecoveryCode(true);
      setAdminExists(true);
    } catch (e) { setSignupError(e.message || "Signup failed."); }
    finally { setSignupLoading(false); }
  };

  const signupValid =
    signupData.first_name.trim() &&
    signupData.last_name.trim() &&
    signupData.username.trim().length >= 4 &&
    signupData.password.length >= 15;

  const forgotValid = forgotUsername.trim() && otp.trim() && newPassword.length >= 15;

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF9", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Satoshi', sans-serif", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 420 }}>

        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: "#F5EDD8", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", boxShadow: "0 4px 16px rgba(184,146,42,0.18)" }}>
            <BookOpen size={28} color="#B8922A" />
          </div>
          <h1 style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 30, fontWeight: 700, color: "#1C1A17", margin: "0 0 6px", letterSpacing: "-0.02em" }}>Offlib LLC</h1>
        </div>

        <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #E8E4DE", boxShadow: "0 4px 24px rgba(28,26,23,0.07)", overflow: "hidden" }}>
          <div style={{ padding: "28px 28px 20px" }}>
            <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 10, color: "#A09890", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 20px", fontWeight: 600 }}>Admin Login</p>

            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <label style={labelStyle}>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Enter username..."
                  autoComplete="username"
                  style={inputBase}
                />
              </div>
              <div>
                <label style={labelStyle}>Password</label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter password..."
                    style={{ ...inputBase, paddingRight: 40 }}
                  />
                  <button type="button" onClick={() => setShowPassword(p => !p)}
                    style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#A09890", padding: 0, display: "flex" }}>
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {error && (
                <p style={{ margin: 0, fontSize: 12, fontFamily: "'Satoshi', sans-serif", color: error.includes("reset") || error.includes("created") ? "#B8922A" : "#A09890", textAlign: "center" }}>
                  {error}
                </p>
              )}

              <button type="submit" disabled={loading}
                style={{ padding: "13px 0", background: loading ? "#E8E4DE" : "#B8922A", color: loading ? "#A09890" : "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "'Satoshi', sans-serif", marginTop: 4 }}>
                {loading ? <><Loader2 size={14} className="spin" /> Signing in...</> : "Sign In as Admin"}
              </button>

              {forgotMode === "idle" && (
                <button type="button" onClick={() => { setForgotMode("enter"); setForgotError(""); setError(""); }}
                  style={{ background: "none", border: "none", color: "#A09890", fontSize: 12, cursor: "pointer", fontFamily: "'Satoshi', sans-serif", textAlign: "center" }}>
                  Forgot password?
                </button>
              )}

              {forgotMode === "enter" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8, borderTop: "1px solid #F0EDE8", paddingTop: 16, marginTop: 4 }}>
                  <p style={{ fontSize: 12, color: "#6B6560", margin: 0 }}>
                    Enter your username and the recovery code you saved when you created your account.
                  </p>
                  <input value={forgotUsername} onChange={e => setForgotUsername(e.target.value)} placeholder="Your username..." style={inputBase} />
                  <input value={otp} onChange={e => setOtp(e.target.value)} placeholder="6-digit recovery code..." style={inputBase} />
                  <div style={{ position: "relative" }}>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      placeholder="New password (min 15 chars)..."
                      style={{ ...inputBase, paddingRight: 40 }}
                    />
                    <button type="button" onClick={() => setShowNewPassword(p => !p)}
                      style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#A09890", padding: 0, display: "flex" }}>
                      {showNewPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  {newPassword.length > 0 && newPassword.length < 15 && (
                    <p style={{ fontSize: 11, color: "#D94F3D", margin: 0, fontFamily: "'Satoshi', sans-serif" }}>
                      {15 - newPassword.length} more characters needed
                    </p>
                  )}
                  {forgotError && (
                    <p style={{ margin: 0, fontSize: 12, color: "#A09890", fontFamily: "'Satoshi', sans-serif", textAlign: "center" }}>
                      {forgotError}
                    </p>
                  )}
                  <button type="button" onClick={verifyCode} disabled={forgotLoading || !forgotValid}
                    style={{ padding: "11px 0", background: forgotLoading || !forgotValid ? "#E8E4DE" : "#B8922A", color: forgotLoading || !forgotValid ? "#A09890" : "#fff", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: forgotLoading || !forgotValid ? "not-allowed" : "pointer", fontFamily: "'Satoshi', sans-serif" }}>
                    {forgotLoading ? "Verifying..." : "Reset Password"}
                  </button>
                  <button type="button" onClick={resetForgotState}
                    style={{ background: "none", border: "none", color: "#A09890", fontSize: 12, cursor: "pointer", fontFamily: "'Satoshi', sans-serif" }}>
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 28px" }}>
            <div style={{ flex: 1, height: 1, background: "#E8E4DE" }} />
            <span style={{ fontSize: 12, color: "#A09890" }}>or</span>
            <div style={{ flex: 1, height: 1, background: "#E8E4DE" }} />
          </div>

          <div style={{ padding: "20px 28px 28px", display: "flex", flexDirection: "column", gap: 10 }}>
            <button onClick={() => navigate("/library")}
              onMouseEnter={e => e.currentTarget.style.background = "#F0EDE8"}
              onMouseLeave={e => e.currentTarget.style.background = "#F7F5F2"}
              style={{ width: "100%", padding: "13px 0", background: "#F7F5F2", color: "#6B6560", border: "1px solid #E8E4DE", borderRadius: 12, fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "'Satoshi', sans-serif" }}>
              Continue as Student
            </button>

            {adminExists === false && (
              <button onClick={() => setShowSignup(true)}
                onMouseEnter={e => e.currentTarget.style.background = "#F5EDD8"}
                onMouseLeave={e => e.currentTarget.style.background = "#fff"}
                style={{ width: "100%", padding: "13px 0", background: "#fff", color: "#B8922A", border: "1.5px solid #B8922A", borderRadius: 12, fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "'Satoshi', sans-serif" }}>
                Create Admin Account
              </button>
            )}
          </div>
        </div>
      </div>

      {/* FIRST-RUN SIGNUP MODAL */}
      {showSignup && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(28,26,23,0.4)", backdropFilter: "blur(6px)" }}>
          <div style={{ background: "#fff", borderRadius: 20, width: "100%", maxWidth: 440, margin: "0 16px", boxShadow: "0 32px 80px rgba(28,26,23,0.18)", overflow: "hidden", maxHeight: "90vh", overflowY: "auto" }}>

            {showRecoveryCode ? (
              <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 20, textAlign: "center" }}>
                <div>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: "#F5EDD8", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                    <BookOpen size={22} color="#B8922A" />
                  </div>
                  <h2 style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 20, fontWeight: 700, color: "#1C1A17", margin: "0 0 8px" }}>Account Created!</h2>
                  <p style={{ fontSize: 13, color: "#6B6560", margin: 0, lineHeight: 1.5 }}>
                    Write down your recovery code. You'll need it to reset your password if you ever forget it.
                  </p>
                </div>
                <div style={{ background: "#F5EDD8", border: "1.5px solid #D4A93A", borderRadius: 14, padding: "20px 24px" }}>
                  <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 11, color: "#A09890", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 10px", fontWeight: 600 }}>Recovery Code</p>
                  <div style={{ fontFamily: "monospace", fontSize: 28, fontWeight: 700, color: "#B8922A", letterSpacing: "0.25em" }}>
                    {recoveryCode}
                  </div>
                </div>
                <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 12, color: "#A09890", margin: 0, textAlign: "center", lineHeight: 1.6 }}>
                  Write this down somewhere safe — this code will not be shown again.
                </p>
                <button
                  onClick={() => {
                    setShowSignup(false);
                    setShowRecoveryCode(false);
                    setRecoveryCode("");
                    setSignupData({ username: "", password: "", first_name: "", last_name: "" });
                    setError("Account created! You can now log in.");
                  }}
                  style={{ padding: "13px 0", background: "#B8922A", color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'Satoshi', sans-serif" }}>
                  I've written it down — Continue
                </button>
              </div>
            ) : (
              <>
                <div style={{ padding: "22px 24px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: 19, fontWeight: 700, color: "#1C1A17" }}>Create Admin Account</span>
                  <button onClick={() => setShowSignup(false)} style={{ width: 34, height: 34, borderRadius: 10, border: "1px solid #E8E4DE", background: "#F7F5F2", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#6B6560" }}>
                    <X size={15} />
                  </button>
                </div>
                <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ display: "flex", gap: 10 }}>
                    <div style={{ flex: 1 }}>
                      <label style={labelStyle}>First name</label>
                      <input value={signupData.first_name} onChange={e => setSignupData(p => ({ ...p, first_name: e.target.value }))} placeholder="First..." style={inputBase} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={labelStyle}>Last name</label>
                      <input value={signupData.last_name} onChange={e => setSignupData(p => ({ ...p, last_name: e.target.value }))} placeholder="Last..." style={inputBase} />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Username</label>
                    <input value={signupData.username} onChange={e => setSignupData(p => ({ ...p, username: e.target.value }))} placeholder="min 4 characters..." style={inputBase} />
                  </div>
                  <div>
                    <label style={labelStyle}>Password</label>
                    <div style={{ position: "relative" }}>
                      <input
                        type={showSignupPassword ? "text" : "password"}
                        value={signupData.password}
                        onChange={e => setSignupData(p => ({ ...p, password: e.target.value }))}
                        placeholder="min 15 characters..."
                        style={{ ...inputBase, paddingRight: 40 }}
                      />
                      <button type="button" onClick={() => setShowSignupPassword(p => !p)}
                        style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#A09890", padding: 0, display: "flex" }}>
                        {showSignupPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                    {signupData.password.length > 0 && signupData.password.length < 15 && (
                      <p style={{ fontSize: 11, color: "#D94F3D", margin: "4px 0 0", fontFamily: "'Satoshi', sans-serif" }}>
                        {15 - signupData.password.length} more characters needed
                      </p>
                    )}
                  </div>
                  {signupError && (
                    <p style={{ margin: 0, fontSize: 12, color: "#A09890", fontFamily: "'Satoshi', sans-serif", textAlign: "center" }}>
                      {signupError}
                    </p>
                  )}
                  <button onClick={handleSignup} disabled={signupLoading || !signupValid}
                    style={{ padding: "13px 0", background: signupLoading || !signupValid ? "#E8E4DE" : "#B8922A", color: signupLoading || !signupValid ? "#A09890" : "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: signupLoading || !signupValid ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "'Satoshi', sans-serif" }}>
                    {signupLoading ? <><Loader2 size={14} className="spin" /> Creating...</> : "Create Account"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @import url('https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600,700&display=swap');
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }
        * { box-sizing: border-box; }
        input { -webkit-text-fill-color: #1C1A17 !important; background-color: #ffffff !important; }
        input::placeholder { color: #A09890 !important; -webkit-text-fill-color: #A09890 !important; opacity: 1; }
        input:focus { -webkit-text-fill-color: #1C1A17 !important; }
        button { transition: all 0.15s ease; }
      `}</style>
    </div>
  );
};

export default Home;