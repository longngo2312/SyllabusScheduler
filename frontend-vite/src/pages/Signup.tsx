import RegisterForm from "@/components/auth/RegisterForm";
import Corners from "@/components/Corners";
import { Effect } from "@animate-ui/react/primitives/effects/effect";

const STEPS = [
  ["01 Upload", "Drop a syllabus PDF"],
  ["02 Review", "Confirm extracted data"],
  ["03 Plan", "See your busy weeks"],
];

function Signup() {
  return (
    <div className="grid min-h-svh bg-background bg-blueprint-grid lg:grid-cols-[minmax(0,1fr)_520px]">
      <div className="flex flex-col justify-between gap-10 px-4 py-8 sm:px-6 lg:px-10 lg:py-14 xl:px-16">
        <div className="flex items-center gap-2.5">
          <div className="size-6 bg-steel-900" />
          <span className="font-heading text-[21px] font-semibold">
            Syllabus Scheduler
          </span>
        </div>
        <div className="flex max-w-[560px] flex-col gap-5">
          <div className="text-[11px] tracking-[0.12em] text-steel-700 uppercase">
            CSCE 3420 · Team 6
          </div>
          <h1 className="text-[clamp(44px,5vw,64px)] leading-none tracking-[-0.02em] text-pretty">
            Every syllabus, every deadline, one calendar.
          </h1>
          <Effect fade slide={{ offset: 16 }} blur={{ initialBlur: 2 }}>
            <p className="max-w-[480px] text-[17px] leading-normal text-muted-foreground">
              Upload your course PDFs and sync Canvas. Dates, grading weights
              and policies are pulled out for you to review.
            </p>
          </Effect>
        </div>
        <Effect
          fade
          slide={{ offset: 16 }}
          blur={{ initialBlur: 4 }}
          delay={100}
        >
          <ol className="grid max-w-[620px] gap-5 sm:grid-cols-3">
            {STEPS.map(([title, text]) => (
              <li
                className="relative border bg-background px-4 py-3.5"
                key={title}
              >
                <Corners />
                <div className="font-heading text-[17px] font-semibold">
                  {title}
                </div>
                <div className="text-[13px] text-muted-foreground">{text}</div>
              </li>
            ))}
          </ol>
        </Effect>
      </div>
      <main className="flex items-center justify-center border-t bg-background px-4 py-10 sm:px-6 lg:border-t-0 lg:border-l lg:p-12">
        <Effect
          className="flex w-full justify-center"
          fade
          slide={{ offset: 16 }}
          blur={{ initialBlur: 4 }}
        >
          <RegisterForm />
        </Effect>
      </main>
    </div>
  );
}

export default Signup;
