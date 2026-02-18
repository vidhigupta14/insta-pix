export default function Nav() {
  return (
    <nav>
      <div className="h-22 w-3/4 m-auto bg-white flex items-center gap-4 px-3 rounded-b-[40px] pl-12 justify-between pr-12">
        <div className="flex items-center gap-3">
          <div className="bg-primary rounded-xl h-10 w-10 p-2 flex items-center justify-center">
            <img src="/camera.svg" alt="Camera Icon" />
          </div>
          <h1 className="text-2xl font-bold text-primary font-fredoka">insta-pix</h1>
        </div>
      <button className="bg-primary p-2 w-24 rounded-xl h-11 text-white font-montserrat font-bold">Login</button>
      </div>
    </nav>
  );
}