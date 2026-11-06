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

const LINK = "text-steel-700 hover:text-steel-900 underline-offset-[3px]";
const FIELD_LABEL = "text-xs font-normal text-foreground/70";

function LoginForm() {
  return (
    <Card className="relative w-full max-w-[400px] gap-[18px] overflow-visible border py-7 shadow-md ring-0 [--card-spacing:--spacing(5)] sm:py-9 sm:[--card-spacing:--spacing(8)]">
      <Corners />
      <CardHeader>
        <h2 className="text-[34px]">Welcome Back</h2>
        <CardDescription>Log in to your semester brain</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-[18px]">
        {/* ponytail: UI only, submit does nothing until the backend has /api/login */}
        <form
          className="flex flex-col gap-[18px]"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-col gap-[5px]">
            <Label className={FIELD_LABEL} htmlFor="login-email">
              Email Address
            </Label>
            <Input
              className="h-9 bg-secondary"
              id="login-email"
              type="email"
              name="email"
              placeholder="you@university.edu"
              autoComplete="email"
              required
            />
          </div>
          <div className="flex flex-col gap-[5px]">
            <div className="flex items-center justify-between">
              <Label className={FIELD_LABEL} htmlFor="login-password">
                Password
              </Label>
              <a className={`${LINK} text-xs`} href="#">
                Forgot password?
              </a>
            </div>
            <Input
              className="h-9 bg-secondary"
              id="login-password"
              type="password"
              name="password"
              autoComplete="current-password"
              required
            />
          </div>
          <Button className="relative h-[42px] w-full text-base" type="submit">
            <Corners />
            Sign In →
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
          Don’t have an account?{" "}
          <a className={`${LINK} font-medium underline`} href="/signup">
            Sign Up
          </a>
        </div>
      </CardContent>
    </Card>
  );
}

export default LoginForm;
