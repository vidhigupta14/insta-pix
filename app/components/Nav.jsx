export default function Nav() {
  return (
    <nav>
      <div className="h-22 w-3/4 m-auto bg-white flex items-center gap-4 px-3 rounded-b-[40px] pl-12">
        <div className="bg-[var(--color-primary)] rounded-xl h-10 w-10 p-2">
          <img src="/camera.svg" alt="Camera Icon" />
        </div>
        <h1 className="text-2xl font-bold text-[var(--color-primary)] font-[var(--font-fredoka)]">insta-pix</h1>
      </div>
    </nav >
  );
}