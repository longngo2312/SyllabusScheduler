const MARK =
  "absolute size-[11px] text-foreground/55 before:absolute before:top-0 before:left-[5px] before:h-full before:w-px before:bg-current after:absolute after:top-[5px] after:left-0 after:h-px after:w-full after:bg-current";

/** The four "+" registration marks of a blueprint frame. The parent must be `relative`. */
function Corners() {
  return (
    <>
      <i className={`${MARK} -top-1.5 -left-1.5`} />
      <i className={`${MARK} -top-1.5 -right-1.5`} />
      <i className={`${MARK} -bottom-1.5 -left-1.5`} />
      <i className={`${MARK} -right-1.5 -bottom-1.5`} />
    </>
  );
}

export default Corners;
