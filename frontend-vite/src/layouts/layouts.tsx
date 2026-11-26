import { courses } from "@/features/dashboard/sampleData";
import { Link, NavLink, Outlet } from "react-router";

const NAV = [
  ["Dashboard", "/dashboard"],
  ["Courses", "/dashboard/courses"],
  ["Upload syllabus", "/dashboard/uploaded-syllabus"],
  ["Busy weeks", "/dashboard/busy-week"],
] as const;

export default function MainLayout() {
  return (
    <div className="grid h-svh grid-cols-[220px_minmax(0,1fr)] bg-background">
      <aside className="flex flex-col gap-0.5 overflow-y-auto border-r px-3.5 py-[22px]">
        <div className="flex items-center gap-[9px] px-2 pb-[22px]">
          <div className="size-5 bg-steel-900" />
          <span className="font-heading text-lg font-semibold">
            Syllabus Scheduler
          </span>
        </div>
        <nav className="flex flex-col gap-0.5">
          {NAV.map(([label, to]) => (
            <NavLink
              key={to}
              to={to}
              end
              className={({ isActive }) =>
                `px-2.5 py-[7px] text-sm ${isActive ? "bg-steel-100 font-medium text-steel-800" : "hover:bg-neutral-100"}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="px-2.5 pt-[22px] pb-2 text-[11px] tracking-widest text-neutral-600 uppercase">
          Courses
        </div>
        {courses.map((c) => (
          <div
            key={c.code}
            className="flex items-center gap-[9px] px-2.5 py-1.5 text-[13px]"
          >
            <span className="size-[9px] flex-none" style={{ background: c.color }} />
            {c.code}
          </div>
        ))}
        <div className="mt-auto flex flex-col gap-3 px-2">
          <div className="flex items-center gap-1.5 text-xs text-neutral-700">
            <span className="size-1.5 rounded-full bg-primary" />
            Canvas synced 12 min ago
          </div>
          <div className="flex items-center justify-between border-t pt-3">
            {/* ponytail: placeholder name until the auth store is wired up */}
            <span className="text-sm font-medium">Jack Ngo</span>
            <Link className="text-xs text-steel-700 hover:text-steel-900" to="/login">
              Log out
            </Link>
          </div>
        </div>
      </aside>
      <Outlet />
    </div>
  );
}
