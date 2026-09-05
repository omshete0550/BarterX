import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import Button from "../../component/common/Button";
import Input from "../../component/common/Input";
import { forgotPasswordRequest, resetPasswordRequest, verifyEmailRequest } from "../../features/auth/authAPI";
import "./Auth.css";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const submit = async (event) => { event.preventDefault(); try { const response = await forgotPasswordRequest(email); setMessage(response.data.message); } catch (requestError) { setError(requestError.response?.data?.message || "Unable to send reset link."); } };
  return <AuthLayout><div className="auth-card"><div className="auth-heading"><h2>Reset password</h2><p>Enter your email and we’ll send a secure reset link.</p></div><form className="auth-form" onSubmit={submit}><Input label="Email address" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />{error && <p className="auth-server-error">{error}</p>}{message && <p>{message}</p>}<Button type="submit" fullWidth>Send reset link</Button></form><p className="auth-switch"><Link to="/login">Back to login</Link></p></div></AuthLayout>;
}

export function ResetPassword() {
  const [params] = useSearchParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const submit = async (event) => { event.preventDefault(); try { const response = await resetPasswordRequest(params.get("token"), password); setMessage(response.data.message); } catch (requestError) { setError(requestError.response?.data?.message || "Unable to reset password."); } };
  return <AuthLayout><div className="auth-card"><div className="auth-heading"><h2>Choose a new password</h2></div><form className="auth-form" onSubmit={submit}><Input label="New password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />{error && <p className="auth-server-error">{error}</p>}{message && <p>{message}</p>}<Button type="submit" fullWidth>Reset password</Button></form></div></AuthLayout>;
}

export function VerifyEmail() {
  const [params] = useSearchParams();
  const [message, setMessage] = useState("Verifying your email...");
  useEffect(() => { verifyEmailRequest(params.get("token")).then((response) => setMessage(response.data.message)).catch((error) => setMessage(error.response?.data?.message || "Unable to verify email.")); }, [params]);
  return <AuthLayout><div className="auth-card"><div className="auth-heading"><h2>Email verification</h2><p>{message}</p><Link to="/login">Go to login</Link></div></div></AuthLayout>;
}
