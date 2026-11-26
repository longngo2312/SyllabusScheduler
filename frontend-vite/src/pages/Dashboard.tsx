import Corners from "@/components/ui/Corners";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  events,
  policyReminder,
  type CalendarEvent,
} from "@/features/dashboard/sampleData";
import { useState } from "react";

const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Local YYYY-MM-DD (toISOString would shift to UTC). */
const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const addDays = (d: Date, n: number) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);

const byDate = new Map<string, CalendarEvent[]>();
for (const e of events) byDate.set(e.date, [...(byDate.get(e.date) ?? []), e]);

/** Every day shown in the month grid: whole weeks, Sunday first. */
function monthCells(month: Date) {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const count = Math.ceil((first.getDay() + daysInMonth) / 7) * 7;
  const start = addDays(first, -first.getDay());
  return Array.from({ length: count }, (_, i) => addDays(start, i));
}

function Dashboard() {
  const [today] = useState(() => new Date());
  const todayIso = iso(today);
  const weekStart = iso(addDays(today, -today.getDay()));
  const weekEnd = iso(addDays(today, 6 - today.getDay()));
  const [month, setMonth] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const shiftMonth = (n: number) =>
    setMonth(new Date(month.getFullYear(), month.getMonth() + n, 1));

  const cells = monthCells(month);
  const upcomingEnd = iso(addDays(today, 6));
  const upcoming = events.filter(
    (e) => e.date >= todayIso && e.date <= upcomingEnd,
  );

  return (
    <main className="grid min-w-0 grid-rows-[auto_minmax(0,1fr)]">
      <header className="flex items-center gap-3.5 border-b px-7 py-[18px]">
        <h2 className="w-[230px] text-[30px]">
          {month.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </h2>
        <div className="flex gap-1">
          <Button variant="outline" size="icon" className="size-[30px]" aria-label="Previous month" onClick={() => shiftMonth(-1)}>
            ‹
          </Button>
          <Button variant="outline" size="icon" className="size-[30px]" aria-label="Next month" onClick={() => shiftMonth(1)}>
            ›
          </Button>
        </div>
        <Button
          variant="outline"
          className="h-[30px]"
          onClick={() => setMonth(new Date(today.getFullYear(), today.getMonth(), 1))}
        >
          Today
        </Button>
        {/* ponytail: Week/List views not built yet, Month is the only real option */}
        <div className="ml-2 flex border text-[13px]">
          {["Month", "Week", "List"].map((v) => (
            <span
              key={v}
              className={`px-3 py-1 ${v === "Month" ? "bg-primary text-primary-foreground" : "text-neutral-700"}`}
            >
              {v}
            </span>
          ))}
        </div>
        <Input
          className="ml-auto h-9 w-[280px] bg-secondary"
          placeholder="Search assignments, exams, policies…"
        />
        <Button className="relative h-9 px-4">
          <Corners />+ Upload syllabus
        </Button>
      </header>

      <div className="grid min-h-0 grid-cols-[minmax(0,1fr)_300px]">
        <div className="grid min-h-0 grid-rows-[auto_minmax(0,1fr)] gap-1.5 pt-4 pr-5 pb-5 pl-7">
          <div className="grid grid-cols-7 text-[11px] tracking-widest text-neutral-600 uppercase">
            {DOW.map((d) => (
              <span key={d} className="px-2">
                {d}
              </span>
            ))}
          </div>
          <div
            className="grid grid-cols-7 border-t border-l"
            style={{ gridTemplateRows: `repeat(${cells.length / 7}, minmax(0, 1fr))` }}
          >
            {cells.map((d) => {
              const key = iso(d);
              const inMonth = d.getMonth() === month.getMonth();
              const isToday = key === todayIso;
              const thisWeek = key >= weekStart && key <= weekEnd;
              return (
                <div
                  key={key}
                  className={`flex min-h-0 flex-col gap-[3px] overflow-hidden border-r border-b px-[7px] py-1.5 ${isToday ? "bg-steel-100" : thisWeek ? "bg-neutral-100" : ""}`}
                >
                  <span
                    className={`font-heading text-[15px] font-semibold ${isToday ? "text-steel-700" : inMonth ? "" : "text-neutral-500"}`}
                  >
                    {d.getDate()}
                  </span>
                  {(byDate.get(key) ?? []).map((e) => (
                    <div
                      key={e.title}
                      className="flex items-center gap-[5px] text-[11.5px] leading-tight whitespace-nowrap"
                      title={`${e.course.code} · ${e.title}`}
                    >
                      <Swatch e={e} />
                      <span className="truncate">{e.title}</span>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex min-h-0 flex-col gap-[22px] overflow-y-auto border-l px-[22px] py-[18px]">
          <div className="flex flex-col gap-2.5">
            <div className="flex items-baseline justify-between">
              <h4 className="text-lg">Next 7 days</h4>
              <span className="text-xs text-neutral-700">
                {upcoming.length} items
              </span>
            </div>
            {upcoming.length === 0 && (
              <p className="text-sm text-muted-foreground">Nothing due. Nice.</p>
            )}
            {upcoming.map((e) => {
              const d = new Date(`${e.date}T00:00`);
              return (
                <div
                  key={e.date + e.title}
                  className="grid grid-cols-[40px_minmax(0,1fr)] gap-2.5 border-b border-foreground/8 py-2"
                >
                  <div className="flex flex-col items-center leading-none">
                    <span className="text-[10px] tracking-[0.08em] text-neutral-600 uppercase">
                      {DOW[d.getDay()]}
                    </span>
                    <span className="font-heading text-xl font-semibold">
                      {d.getDate()}
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <span className="truncate text-sm font-medium">{e.title}</span>
                    <span className="flex items-center gap-1.5 text-xs text-neutral-700">
                      <Swatch e={e} />
                      {e.course.code} · {e.source}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="relative flex flex-col gap-1.5 border p-4">
            <Corners />
            <div className="text-[11px] tracking-widest text-steel-700 uppercase">
              {policyReminder.kicker}
            </div>
            <div className="font-heading text-lg font-semibold leading-tight">
              {policyReminder.title}
            </div>
            <p className="text-sm text-neutral-700">{policyReminder.body}</p>
          </div>
        </div>
      </div>
    </main>
  );
}

function Swatch({ e }: { e: CalendarEvent }) {
  return (
    <span className="size-[7px] flex-none" style={{ background: e.course.color }} />
  );
}

export default Dashboard;
