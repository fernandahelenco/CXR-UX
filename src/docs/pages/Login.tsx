import { useState, useEffect } from "react"
import { WexButton } from "@/components/wex/wex-button"
import { WexFloatLabel } from "@/components/wex/wex-float-label"
import { WexCard } from "@/components/wex/wex-card"
import { wexToast } from "@/components/wex/wex-toast"
import { Eye, EyeOff } from "lucide-react"
import WexLogo from "/WEX_Logo_Red_Vector.svg"

interface LoginProps {
  onLoginSuccess: () => void
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [mfaCode, setMfaCode] = useState("")
  const [resendTimer, setResendTimer] = useState(13)
  const [generatedCode, setGeneratedCode] = useState("")
  const [codeError, setCodeError] = useState(false)

  // Generate code when entering Step 3
  useEffect(() => {
    if (step === 3) {
      const code = Math.floor(10000 + Math.random() * 90000).toString()
      setGeneratedCode(code)
      setCodeError(false)
      setMfaCode("")
      
      wexToast(`Your MFA code is: ${code}`, {
        duration: 30000,
        position: 'top-right'
      })
    }
  }, [step])

  // Handle countdown timer
  useEffect(() => {
    if (step === 3 && resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [step, resendTimer])

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim()) {
      setStep(2)
    }
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password.trim()) {
      setStep(3)
    }
  }

  const handleMfaSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (mfaCode.trim() === generatedCode) {
      // Code matches - success
      setCodeError(false)
      onLoginSuccess()
    } else {
      // Code doesn't match - show error
      setCodeError(true)
    }
  }

  const handleResendCode = () => {
    if (resendTimer === 0) {
      // Generate new code
      const code = Math.floor(10000 + Math.random() * 90000).toString()
      setGeneratedCode(code)
      setCodeError(false)
      setMfaCode("")
      setResendTimer(13)
      
      // Show new code in toast
      wexToast(`Your new MFA code is: ${code}`, {
        duration: 30000,
        position: 'top-right'
      })
    }
  }

  const handleEditUsername = () => {
    setStep(1)
  }

  const maskUsername = (value: string): string => {
    if (value.includes('@')) {
      // Email masking: show first 4 chars + ****** + domain with ****
      const [local, domain] = value.split('@')
      const maskedLocal = local.substring(0, 4) + '******'
      const maskedDomain = domain.substring(0, 5) + '*****'
      return `${maskedLocal}@${maskedDomain}`
    } else {
      // Phone masking: show first 3 + ****** + last 2
      return value.substring(0, 3) + '******' + value.slice(-2)
    }
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--wex-palette-blue-50))] relative overflow-hidden">
      {/* Background decorative elements - simplified version */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Decorative circles/squares would go here - simplified for now */}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Login Card */}
        <div className="flex-1 flex items-center justify-center px-4 py-8">
          <WexCard className="w-full max-w-[402px] shadow-[0px_8px_16px_0px_rgba(2,13,36,0.15),0px_0px_1px_0px_rgba(2,13,36,0.3)] border-0">
            <WexCard.Content className="p-8">
              <div className="flex flex-col gap-6">
                {/* Logo + Title + Subtext */}
                <div className="flex flex-col gap-6 items-center">
                  <div className="w-[150px] h-[50px]">
                    <img src={WexLogo} alt="WEX" className="w-full h-full object-contain" />
                  </div>
                  <div className="flex flex-col gap-2 items-center text-center">
                    <h1 className="text-[18px] font-semibold leading-6 tracking-[-0.252px] text-foreground">
                      {step === 1 ? "Welcome" : step === 2 ? "Enter your password" : "Verify your identity"}
                    </h1>
                    <p className="text-[16px] font-normal leading-6 tracking-[-0.176px] text-foreground max-w-[328px]">
                      {step === 1 
                        ? "Please enter your username or email address to log into WEX Health & Benefits"
                        : step === 2
                        ? "Please enter your password to log into WEX Health & Benefits"
                        : "We've sent an email with your code to"}
                    </p>
                  </div>
                </div>

                {/* Step 1: Username/Email Form */}
                {step === 1 && (
                  <>
                    <form onSubmit={handleUsernameSubmit} className="flex flex-col gap-6">
                      {/* Input Field with Floating Label */}
                      <WexFloatLabel
                        label="Username or Email address"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        size="lg"
                        className="text-[16px] leading-6 tracking-[-0.176px]"
                      />

                      {/* Continue Button */}
                      <WexButton
                        type="submit"
                        intent="primary"
                        className="w-full h-10 rounded-lg text-[14px] font-medium leading-6 tracking-[-0.084px]"
                      >
                        Continue
                      </WexButton>
                    </form>

                    {/* Sign Up Link */}
                    <div className="flex gap-2 items-center justify-center text-[16px] leading-6 tracking-[-0.176px]">
                      <p className="text-muted-foreground">Don't have an account?</p>
                      <button
                        type="button"
                        className="text-[hsl(var(--wex-primary))] hover:underline cursor-pointer font-normal"
                      >
                        Sign up
                      </button>
                    </div>
                  </>
                )}

                {/* Step 2: Password Form */}
                {step === 2 && (
                  <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-[21px]">
                    {/* Username Display Field (read-only with Edit) */}
                    <div className="relative">
                      <WexFloatLabel
                        label="Username or Email address"
                        type="text"
                        value={username}
                        readOnly
                        size="lg"
                        className="text-[16px] leading-6 tracking-[-0.176px] pr-16 cursor-default"
                      />
                      <button
                        type="button"
                        onClick={handleEditUsername}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[14px] text-[hsl(var(--wex-primary))] hover:underline"
                      >
                        Edit
                      </button>
                    </div>

                    {/* Password Input with Eye Icon */}
                    <div className="flex flex-col gap-[30px]">
                      <WexFloatLabel
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        size="lg"
                        className="text-[16px] leading-6 tracking-[-0.176px]"
                        rightIcon={
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="cursor-pointer hover:text-foreground transition-colors pointer-events-auto"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        }
                      />

                      {/* Forgot Password Link */}
                      <button
                        type="button"
                        className="text-[16px] text-[hsl(var(--wex-primary))] hover:underline text-left tracking-[-0.176px]"
                      >
                        Forgot password
                      </button>
                    </div>

                    {/* Continue Button */}
                    <WexButton
                      type="submit"
                      intent="primary"
                      className="w-full h-10 rounded-lg text-[14px] font-medium leading-6 tracking-[-0.084px]"
                    >
                      Continue
                    </WexButton>
                  </form>
                )}

                {/* Step 3: MFA Verification */}
                {step === 3 && (
                  <form onSubmit={handleMfaSubmit} className="flex flex-col gap-[21px]">
                    {/* Masked Email/Phone Field (read-only) */}
                    <WexFloatLabel
                      label="Email or Mobile number"
                      type="text"
                      value={maskUsername(username)}
                      readOnly
                      size="lg"
                      className="text-[16px] leading-6 tracking-[-0.176px] cursor-default"
                    />

                {/* Code Input Field */}
                <div className="flex flex-col gap-1">
                  <WexFloatLabel
                    label="Enter the code"
                    type="text"
                    value={mfaCode}
                    onChange={(e) => {
                      setMfaCode(e.target.value)
                      setCodeError(false) // Clear error on input
                    }}
                    size="lg"
                    invalid={codeError}
                    className="text-[16px] leading-6 tracking-[-0.176px]"
                  />
                  {codeError && (
                    <p className="text-[12px] text-[hsl(var(--wex-destructive))] px-3">
                      Incorrect Code, please try again
                    </p>
                  )}
                </div>

                    {/* Continue Button */}
                    <WexButton
                      type="submit"
                      intent="primary"
                      className="w-full h-10 rounded-lg text-[14px] font-medium leading-6 tracking-[-0.084px]"
                    >
                      Continue
                    </WexButton>

                    {/* Resend Code Text with Timer */}
                    <p className="text-[16px] leading-6 tracking-[-0.176px] text-foreground">
                      Didn't receive an email?{" "}
                      {resendTimer > 0 ? (
                        <span className="font-semibold">
                          Send again in 00:{resendTimer.toString().padStart(2, '0')}
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={handleResendCode}
                          className="font-semibold text-[hsl(var(--wex-primary))] hover:underline"
                        >
                          Send again
                        </button>
                      )}
                    </p>

                    {/* Try Another Method Link */}
                    <button
                      type="button"
                      className="text-[16px] font-semibold leading-6 tracking-[-0.176px] text-[hsl(var(--wex-primary))] hover:underline text-left"
                    >
                      Try another method
                    </button>
                  </form>
                )}
              </div>
            </WexCard.Content>
          </WexCard>
        </div>

        {/* Footer */}
        <footer className="bg-[hsl(var(--wex-primary-hover))] w-full py-[13px] px-[131px]">
          <div className="flex flex-col gap-[14px] items-center">
            {/* Footer Links */}
            <div className="flex gap-8 items-start text-[11px] font-semibold leading-4 tracking-[0.055px] text-white">
              <button className="underline decoration-solid underline-offset-2 hover:no-underline">
                Browser Requirements
              </button>
              <button className="underline decoration-solid underline-offset-2 hover:no-underline">
                Contact Us
              </button>
              <button className="underline decoration-solid underline-offset-2 hover:no-underline">
                Privacy Policy
              </button>
              <button className="underline decoration-solid underline-offset-2 hover:no-underline">
                Accessibility Statement
              </button>
            </div>
            {/* Copyright */}
            <div className="flex gap-[42px] items-start">
              <p className="text-[11px] font-normal leading-4 tracking-[0.055px] text-white text-center">
                Copyright 2005-2024. Powered by [Company name], a WEX Inc. Proprietary Web Product. All Rights Reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

