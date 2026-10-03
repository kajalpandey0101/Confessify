import { useState, type FormEvent, type MouseEvent } from 'react'
import { Eye, EyeOff, MoveRight } from 'lucide-react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import SignupPage from './SignupPage.tsx'
import './App.css'

function GoogleMark() {
  return (
    <svg className="google-mark" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#4285F4" d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15Z" />
      <path fill="#34A853" d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.6-5.1c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.5H5.8v5.3A20 20 0 0 0 24 44Z" />
      <path fill="#FBBC05" d="M12.6 27.5a12 12 0 0 1 0-7v-5.3H5.8a20 20 0 0 0 0 17.6l6.8-5.3Z" />
      <path fill="#EA4335" d="M24 12c3 0 5.7 1 7.8 3.1l5.8-5.8A19.5 19.5 0 0 0 24 4 20 20 0 0 0 5.8 15.2l6.8 5.3C14.2 15.6 18.7 12 24 12Z" />
    </svg>
  )
}

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [touched, setTouched] = useState({ email: false, password: false })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const emailError = !email.trim()
    ? 'Please enter your email address.'
    : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? 'Enter a valid email address.'
      : undefined
  const passwordError = !password
    ? 'Please enter a password.'
    : password.length < 8
      ? 'Use at least 8 characters.'
      : undefined

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setTouched({ email: true, password: true })
    setMessage('')
    if (emailError || passwordError) return

    setIsLoading(true)
    window.setTimeout(() => {
      setIsLoading(false)
      setMessage('Your details are ready to connect to authentication.')
    }, 650)
  }

  function handleGoogle() {
    setMessage('Google sign-in is ready to connect to your OAuth provider.')
  }

  function handleForgotPassword(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    setMessage('Password recovery will be available when authentication is connected.')
  }

  return (
    <main className="auth-shell">
      <aside className="brand-panel" aria-label="Confessify">
        <div className="brand-panel__texture" aria-hidden="true" />
      </aside>

      <section className="form-panel" aria-labelledby="login-heading">
        <div className="auth-form-wrap">
          <div className="form-heading">
            <h1 id="login-heading">Welcome back</h1>
            <p>A safe space to share what’s on your mind.</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="field-group">
              <label htmlFor="login-email">Email address</label>
              <input
                id="login-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                  setMessage('')
                }}
                onBlur={() => setTouched((current) => ({ ...current, email: true }))}
                aria-invalid={Boolean(touched.email && emailError)}
                aria-describedby={touched.email && emailError ? 'login-email-error' : undefined}
              />
              {touched.email && emailError && <span className="field-error" id="login-email-error">{emailError}</span>}
            </div>

            <div className="field-group">
              <div className="field-label-row">
                <label htmlFor="login-password">Password</label>
                <a className="text-link" href="#forgot-password" onClick={handleForgotPassword}>Forgot password?</a>
              </div>
              <div className="password-input-wrap">
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value)
                    setMessage('')
                  }}
                  onBlur={() => setTouched((current) => ({ ...current, password: true }))}
                  aria-invalid={Boolean(touched.password && passwordError)}
                  aria-describedby={touched.password && passwordError ? 'login-password-error' : undefined}
                />
                <button
                  className="visibility-toggle"
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              {touched.password && passwordError && <span className="field-error" id="login-password-error">{passwordError}</span>}
            </div>

            <button className="primary-button" type="submit" disabled={isLoading}>
              <span>{isLoading ? 'Please wait' : 'Log in'}</span>
              {!isLoading && <MoveRight size={17} strokeWidth={1.8} />}
              {isLoading && <span className="button-spinner" aria-hidden="true" />}
            </button>

            <div className="divider" aria-label="or"><span /><span className="divider__text">OR</span><span /></div>

            <button className="google-button" type="button" onClick={handleGoogle}>
              <GoogleMark />
              <span>Continue with Google</span>
            </button>

            <p className="form-status" role="status" aria-live="polite">{message}</p>
          </form>

          <p className="auth-switch">Don’t have an account? <Link to="/signup"></Link></p>
        </div>
      </section>
    </main>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
