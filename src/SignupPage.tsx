import { useState, type FormEvent } from 'react'
import { Eye, EyeOff, MoveRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import './App.css'

type FormValues = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const emptyValues: FormValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

function GoogleMark() {
  return (
    <svg className="signup-google-mark" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#4285F4" d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15Z" />
      <path fill="#34A853" d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.6-5.1c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.5H5.8v5.3A20 20 0 0 0 24 44Z" />
      <path fill="#FBBC05" d="M12.6 27.5a12 12 0 0 1 0-7v-5.3H5.8a20 20 0 0 0 0 17.6l6.8-5.3Z" />
      <path fill="#EA4335" d="M24 12c3 0 5.7 1 7.8 3.1l5.8-5.8A19.5 19.5 0 0 0 24 4 20 20 0 0 0 5.8 15.2l6.8 5.3C14.2 15.6 18.7 12 24 12Z" />
    </svg>
  )
}

export default function SignupPage() {
  const [values, setValues] = useState<FormValues>(emptyValues)
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const errors: Partial<Record<keyof FormValues, string>> = {
    ...(!values.name.trim() ? { name: 'Please enter your name.' } : {}),
    ...(!values.email.trim()
      ? { email: 'Please enter your email address.' }
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
        ? { email: 'Enter a valid email address.' }
        : {}),
    ...(!values.password
      ? { password: 'Please enter a password.' }
      : values.password.length < 8
        ? { password: 'Use at least 8 characters.' }
        : {}),
    ...(!values.confirmPassword
      ? { confirmPassword: 'Please confirm your password.' }
      : values.confirmPassword !== values.password
        ? { confirmPassword: 'Your passwords do not match.' }
        : {}),
  }

  function updateValue(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
    setMessage('')
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setTouched({ name: true, email: true, password: true, confirmPassword: true })
    setMessage('')
    if (Object.keys(errors).length > 0) return

    setIsLoading(true)
    window.setTimeout(() => {
      setIsLoading(false)
      setMessage('Your details are ready to connect to authentication.')
    }, 650)
  }

  function handleGoogle() {
    setMessage('Google sign-in is ready to connect to your OAuth provider.')
  }

  function fieldError(field: keyof FormValues) {
    return touched[field] ? errors[field] : undefined
  }

  return (
    <main className="signup-page">
      <img
        className="signup-logo"
        src="/assets/confessify-logo.png"
        alt="Confessify"
      />

      <section className="signup-card" aria-labelledby="signup-heading">
        <div className="signup-form">
          <header className="signup-heading">
            <h1 id="signup-heading">Create your account</h1>
            <p>Your space to speak freely.</p>
          </header>

          <form className="signup-fields" onSubmit={handleSubmit} noValidate>
            <div className="signup-field">
              <label htmlFor="signup-name">Full name</label>
              <input
                id="signup-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Full name"
                value={values.name}
                onChange={(event) => updateValue('name', event.target.value)}
                onBlur={() => setTouched((current) => ({ ...current, name: true }))}
                aria-invalid={Boolean(fieldError('name'))}
                aria-describedby={fieldError('name') ? 'signup-name-error' : undefined}
              />
              {fieldError('name') && <span className="signup-error" id="signup-name-error">{fieldError('name')}</span>}
            </div>

            <div className="signup-field">
              <label htmlFor="signup-email">Email address</label>
              <input
                id="signup-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email address"
                value={values.email}
                onChange={(event) => updateValue('email', event.target.value)}
                onBlur={() => setTouched((current) => ({ ...current, email: true }))}
                aria-invalid={Boolean(fieldError('email'))}
                aria-describedby={fieldError('email') ? 'signup-email-error' : undefined}
              />
              {fieldError('email') && <span className="signup-error" id="signup-email-error">{fieldError('email')}</span>}
            </div>

            <div className="signup-field">
              <label htmlFor="signup-password">Password</label>
              <div className="signup-password">
                <input
                  id="signup-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Password"
                  value={values.password}
                  onChange={(event) => updateValue('password', event.target.value)}
                  onBlur={() => setTouched((current) => ({ ...current, password: true }))}
                  aria-invalid={Boolean(fieldError('password'))}
                  aria-describedby={fieldError('password') ? 'signup-password-error' : undefined}
                />
                <button
                  className="signup-visibility"
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {fieldError('password') && <span className="signup-error" id="signup-password-error">{fieldError('password')}</span>}
            </div>

            <div className="signup-field">
              <label htmlFor="signup-confirm-password">Confirm password</label>
              <div className="signup-password">
                <input
                  id="signup-confirm-password"
                  name="confirmPassword"
                  type={showConfirmation ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Confirm password"
                  value={values.confirmPassword}
                  onChange={(event) => updateValue('confirmPassword', event.target.value)}
                  onBlur={() => setTouched((current) => ({ ...current, confirmPassword: true }))}
                  aria-invalid={Boolean(fieldError('confirmPassword'))}
                  aria-describedby={fieldError('confirmPassword') ? 'signup-confirm-password-error' : undefined}
                />
                <button
                  className="signup-visibility"
                  type="button"
                  onClick={() => setShowConfirmation((visible) => !visible)}
                  aria-label={showConfirmation ? 'Hide confirmation password' : 'Show confirmation password'}
                  aria-pressed={showConfirmation}
                >
                  {showConfirmation ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {fieldError('confirmPassword') && <span className="signup-error" id="signup-confirm-password-error">{fieldError('confirmPassword')}</span>}
            </div>

            <button className="signup-submit" type="submit" disabled={isLoading}>
              <span>{isLoading ? 'Please wait' : 'Create account'}</span>
              {!isLoading && <MoveRight size={16} strokeWidth={1.8} />}
              {isLoading && <span className="button-spinner" aria-hidden="true" />}
            </button>

            <div className="signup-divider" aria-label="or"><span /><span>OR</span><span /></div>

            <button className="signup-google" type="button" onClick={handleGoogle}>
              <GoogleMark />
              <span>Continue with Google</span>
            </button>

            <p className="signup-status" role="status" aria-live="polite">{message}</p>
          </form>

          <p className="signup-login">Already have an account? <Link to="/login">Log in</Link></p>
        </div>
      </section>
    </main>
  )
}
