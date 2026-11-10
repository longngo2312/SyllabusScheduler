import { PageTransition } from "@/components/animate-ui/components/page-transition";
import ShapeGrid from "@/components/ui/ShapeGrid";
import TechText from "@/components/ui/TechText";
import { Effect } from "@animate-ui/react/primitives/effects/effect";
import { Outlet } from "react-router";

function Auth() {
  return (
    <div className="grid min-h-svh overflow-x-clip bg-background lg:grid-cols-[minmax(0,1fr)_520px]">
      <div className="relative isolate flex flex-col justify-between gap-10 overflow-hidden px-4 py-8 sm:px-6 lg:px-10 lg:py-14 xl:px-16">
        {/* Desk-calendar sheet, tilted so its left edge recedes. Decorative, so hidden from screen readers. */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 -right-0.5 -z-10 hidden -translate-y-1/2 lg:block"
          style={{ perspective: 1400 }}
        >
          <div
            className="relative border border-neutral-200 bg-[#fdfaf4] p-6 pt-9 shadow-[0_40px_80px_-30px_rgba(29,45,61,0.35)]"
            style={{ transform: "rotateY(-24deg) rotateX(4deg)" }}
          >
            <div className="absolute inset-x-8 -top-3 flex justify-between">
              {Array.from({ length: 22 }, (_, k) => (
                <span
                  key={k}
                  className="h-6 w-1.5 rounded-full bg-neutral-400 ring-1 ring-neutral-500/40"
                />
              ))}
            </div>
            <div className="mb-4 inline-flex items-baseline gap-2 bg-[#e8d3b9] px-3 py-1 font-heading text-steel-800">
              <span className="text-sm font-semibold">#11</span>
              <span className="text-2xl font-bold tracking-wide uppercase">
                November
              </span>
              <span className="text-sm font-semibold">2026</span>
            </div>
            <div className="grid w-[504px] grid-cols-7 bg-steel-700 py-2 text-center font-heading text-[15px] text-white">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                (day, k) => (
                  <span key={day} className={k >= 5 ? "text-[#e8d3b9]" : ""}>
                    {day}
                  </span>
                ),
              )}
            </div>
            <ShapeGrid
              calendar
              cellSize={72}
              direction="up"
              lineColor="rgba(29, 31, 32, 0.08)"
              hoverColor="#5980a6"
              speed={0.25}
              fade={0}
              // Inline because ShapeGrid.css is unlayered and would beat Tailwind utilities.
              style={{ width: 504, height: 360 }}
            />
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="size-6 bg-steel-900" />
          <span className="font-heading text-[21px] font-semibold">
            Syllabus Scheduler
          </span>
        </div>
        <div className="flex max-w-[560px] flex-col gap-5">
          <h1>
            <TechText
              text={"Every syllabus, every\ndeadline, one system."}
              fontSize={64}
              letterSpacing={-0.02}
              align="left"
              accentColor="#5980a6"
              // Cancels TechText's 5% inset; the ratio lets the text scale with the column.
              // No pointer events: the sweep is the only effect, hover and drag stay off.
              style={{
                pointerEvents: "none",
                width: "111.11%",
                height: "auto",
                aspectRatio: "4.2 / 1",
                marginLeft: "-5.56%",
              }}
            />
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
        ></Effect>
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
