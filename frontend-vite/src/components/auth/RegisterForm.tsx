import Corners from "@/components/Corners";
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
const LINK = "text-steel-700 hover:text-steel-900 underline-offset-[3px]";
const FIELD_LABEL = "text-xs font-normal text-foreground/70";
function RegisterForm() {
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  };
  return (
    <Card className="relative w-full max-w-[400px] gap-[18px] overflow-visible border py-7 shadow-md ring-0 [--card-spacing:--spacing(5)] sm:py-9 sm:[--card-spacing:--spacing(8)]">
      <Corners />
      <CardHeader>
        <h2 className="text-[34px]">Hello</h2>
        <CardDescription>Create your semester brain</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-[18px]">
        {/* ponytail: UI only, submit does nothing until the backend has /api/login */}
        <form className="flex flex-col gap-[18px]" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-[5px]">
            <Label className={FIELD_LABEL} htmlFor="register-username">
              Username
            </Label>
            <Input
              className="h-9 bg-secondary"
              id="register-username"
              type="username"
              name="username"
              placeholder="JohnDoe123"
              required
            ></Input>
          </div>
          <div className="flex flex-col gap-[5px]">
            <Label className={FIELD_LABEL} htmlFor="register-email">
              Email Address
            </Label>
            <Input
              className="h-9 bg-secondary"
              id="register-email"
              type="email"
              name="email"
              placeholder="you@university.edu"
              autoComplete="email"
              required
            />
          </div>
          <div className="flex flex-col gap-[5px]">
            <div className="flex items-center justify-between">
              <Label className={FIELD_LABEL} htmlFor="password">
                Password
              </Label>
            </div>
            <Input
              className="h-9 bg-secondary"
              id="password"
              type="password"
              name="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="flex items-center justify-between">
              <Label className={FIELD_LABEL} htmlFor="login-password">
                Confirm your password
              </Label>
            </div>
            <Input
              className="h-9 bg-secondary"
              id="confirm-password"
              type="password"
              name="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <Button className="relative h-[42px] w-full text-base" type="submit">
            <Corners />
            Sign Up →
          </Button>
        </form>
        <div className="flex items-center gap-2.5 text-[11px] tracking-[0.08em] text-neutral-600 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
          OR CONTINUE WITH
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Button className="h-[38px]" variant="outline" type="button">
            GitHub
          </Button>
          <Button className="h-[38px]" variant="outline" type="button">
            Google
          </Button>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          Have an account?{" "}
          <a className={`${LINK} font-medium underline`} href="/login">
            Log in
          </a>
        </div>
      </CardContent>
    </Card>
  );
}

export default RegisterForm;
