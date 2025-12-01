import AllCards from "./allCards";

export default function TopDestinations(params) {
    return(
        <section className="md:mt-32 py-5 px-6 lg:flex lg:flex-col lg:items-center">
            <h1 className="text-2xl font-bold">Top Destinations</h1>
            <AllCards/>
        </section>
    )
}