import { PageTransition } from "@/components/animate-ui/components/page-transition";
import Corners from "@/components/Corners";
import ShapeGrid from "@/components/ShapeGrid";
import TechText from "@/components/TechText";
import { Effect } from "@animate-ui/react/primitives/effects/effect";
import { Outlet } from "react-router";

// TechText draws a single line, so the headline is split by hand.
const HEADLINE = ["Every syllabus, every", "deadline, one calendar."];

const STEPS = [
  ["01 Upload", "Drop a syllabus PDF"],
  ["02 Review", "Confirm extracted data"],
  ["03 Plan", "See your busy weeks"],
];

function Auth() {
  return (
    <div className="grid min-h-svh overflow-x-clip bg-background lg:grid-cols-[minmax(0,1fr)_520px]">
      <div className="relative isolate flex flex-col justify-between gap-10 px-4 py-8 sm:px-6 lg:px-10 lg:py-14 xl:px-16">
        <ShapeGrid
          lineColor="rgba(29, 31, 32, 0.05)"
          hoverColor="#5980a6"
          speed={0.25}
          fade={0}
          // Inline because ShapeGrid.css is unlayered and would beat Tailwind utilities.
          style={{
            position: "absolute",
            inset: 0,
            width: "auto",
            height: "auto",
            zIndex: -1,
            pointerEvents: "none",
          }}
        />
        <div className="flex items-center gap-2.5">
          <div className="size-6 bg-steel-900" />
          <span className="font-heading text-[21px] font-semibold">
            Syllabus Scheduler
          </span>
        </div>
        <div className="flex max-w-[560px] flex-col gap-5">
          <h1>
            {HEADLINE.map((line, i) => (
              <TechText
                key={line}
                text={line}
                fontSize={64}
                letterSpacing={-0.02}
                align="left"
                accentColor="#5980a6"
                sweepIndex={i}
                sweepCount={HEADLINE.length}
                // Cancels TechText's 5% inset; the ratio lets the text scale with the column.
                // No pointer events: the sweep is the only effect, hover and drag stay off.
                style={{
                  pointerEvents: "none",
                  width: "111.11%",
                  height: "auto",
                  aspectRatio: "7 / 1",
                  marginLeft: "-5.56%",
                  marginTop: i ? "-4.5%" : undefined,
                }}
              />
            ))}
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
          className="w-full"
          fade
          slide={{ offset: 16 }}
          blur={{ initialBlur: 4 }}
        >
          <PageTransition className="flex w-full justify-center" effect="slide">
            <Outlet />
          </PageTransition>
        </Effect>
      </main>
    </div>
  );
}

export default Auth;
