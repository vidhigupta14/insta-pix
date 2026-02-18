import LandingPolaroid from "./components/LandingPolaroid";
import PolaroidForm from "./components/PolaroidForm";

export default function Home() {
  return (
    <div className="flex justify-around items-center ml-20 mr-20">
      <LandingPolaroid />
      <PolaroidForm />
    </div>

  )
}
