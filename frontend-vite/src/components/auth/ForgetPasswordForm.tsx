import Corners from "@/components/ui/Corners";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { Link } from "react-router";
const LINK = "text-steel-700 hover:text-steel-900 underline-offset-[3px]";
const FIELD_LABEL = "text-xs font-normal text-foreground/70";

type Step = "email" | "code" | "reset" | "done";

const COPY: Record<Step, [string, string]> = {
  email: ["Forgot Password", "We’ll email you a 6-digit code"],
  code: ["Check Your Email", "Enter the code we just sent"],
  reset: ["New Password", "Choose a new password for your account"],
  done: ["Password Updated", "You can now log in with your new password"],
};

function ForgetPasswordForm() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const mismatch = confirm !== "" && confirm !== password;

  // ponytail: UI only, each step just advances until the backend has
  // /api/forgot-password (send OTP), /api/verify-otp and /api/reset-password.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step === "email") setStep("code");
    else if (step === "code") setStep("reset");
    else if (step === "reset" && !mismatch) setStep("done");
  };

  const [title, description] = COPY[step];

  return (
    <Card className="relative w-full max-w-[400px] gap-[18px] overflow-visible border py-7 shadow-md ring-0 [--card-spacing:--spacing(5)] sm:py-9 sm:[--card-spacing:--spacing(8)]">
      <Corners />
      <CardHeader>
        <h2 className="text-[34px]">{title}</h2>
        <CardDescription>
          {description}
          {step === "code" && (
            <>
              {" "}
              to <span className="font-medium text-foreground">{email}</span>
            </>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-[18px]">
        {step === "done" ? (
          <Button asChild className="relative h-[42px] w-full text-base">
            <Link to="/login">
              <Corners />
              Back to Sign In →
            </Link>
          </Button>
        ) : (
          <form className="flex flex-col gap-[18px]" onSubmit={handleSubmit}>
            {step === "email" && (
              <div className="flex flex-col gap-[5px]">
                <Label className={FIELD_LABEL} htmlFor="forgot-email">
                  Email
                </Label>
                <Input
                  className="h-9 bg-secondary"
                  id="forgot-email"
                  type="email"
                  name="email"
                  placeholder="john@school.edu"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
              </div>
            )}

            {step === "code" && (
              <div className="flex flex-col gap-[5px]">
                <div className="flex items-center justify-between">
                  <Label className={FIELD_LABEL} htmlFor="forgot-code">
                    Verification code
                  </Label>
                  {/* ponytail: resend does nothing until the backend exists */}
                  <button className={`${LINK} text-xs`} type="button">
                    Resend code
                  </button>
                </div>
                <Input
                  className="h-12 bg-secondary text-center font-heading text-2xl tracking-[0.5em]"
                  id="forgot-code"
                  name="code"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  pattern="\d{6}"
                  maxLength={6}
                  placeholder="000000"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                  required
                  autoFocus
                />
              </div>
            )}

            {step === "reset" && (
              <>
                <div className="flex flex-col gap-[5px]">
                  <Label className={FIELD_LABEL} htmlFor="forgot-password">
                    New password
                  </Label>
                  <Input
                    className="h-9 bg-secondary"
                    id="forgot-password"
                    type="password"
                    name="password"
                    placeholder="••••••"
                    autoComplete="new-password"
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
                <div className="flex flex-col gap-[5px]">
                  <Label className={FIELD_LABEL} htmlFor="forgot-confirm">
                    Confirm password
                  </Label>
                  <Input
                    className="h-9 bg-secondary"
                    id="forgot-confirm"
                    type="password"
                    name="confirm"
                    placeholder="••••••"
                    autoComplete="new-password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    aria-invalid={mismatch}
                    aria-describedby="forgot-confirm-error"
                    required
                  />
                  {mismatch && (
                    <p
                      className="text-xs text-destructive"
                      id="forgot-confirm-error"
                    >
                      Passwords don’t match
                    </p>
                  )}
                </div>
              </>
            )}

            <Button className="relative h-[42px] w-full text-base" type="submit">
              <Corners />
              {step === "email" && "Send Code →"}
              {step === "code" && "Verify Code →"}
              {step === "reset" && "Update Password →"}
            </Button>
          </form>
        )}

        <div className="text-center text-sm text-muted-foreground">
          {step === "code" ? (
            <button
              className={`${LINK} font-medium underline`}
              type="button"
              onClick={() => {
                setCode("");
                setStep("email");
              }}
            >
              Use a different email
            </button>
          ) : (
            step !== "done" && (
              <>
                Remembered it?{" "}
                <Link className={`${LINK} font-medium underline`} to="/login">
                  Sign In
                </Link>
              </>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default ForgetPasswordForm;
