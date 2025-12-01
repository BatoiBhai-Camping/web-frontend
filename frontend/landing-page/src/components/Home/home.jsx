import Activites from "./activites";
import Explore from "./explore";
import Hero from "./hero";
import Offers from "./offers";
import Search from "./search";
import SpecialPackages from "./specialPackages";
import TopDestinations from "./topDestinations";

export default function Home(params) {
    return(
        <>
            <Hero/>
            <div className="w-screen flex justify-center mt-[-30px]">
                <Search/>
            </div>
            <Explore/>
            <TopDestinations/>
            <Offers/>
            <Activites/>
            <SpecialPackages/>
        </>
    )
}