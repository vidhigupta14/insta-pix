export default function LandingPolaroid() {
    return (
    <div className="bg-white h-130 w-1/3 p-6 m-10 rotate-3 ml-30 mt-16 relative">
      {/* Yellow Tape */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-accent backdrop-blur-sm z-10 rotate-2 border border-accent flex items-center justify-center pointer-events-none shadow-sm">
        <div className="w-full h-full border-x-2 border-accent" />
      </div>
      
      <a href="https://unsplash.com/photos/tabby-cat-touching-persons-palm-xulIYVIbYIc?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink">
        <img src="/jonas-vincent-xulIYVIbYIc-unsplash.jpg" alt="A tabby cat touching a person's palm" className="w-full h-4/5 object-cover shadow-md" />
      </a>
    </div>
    );
}