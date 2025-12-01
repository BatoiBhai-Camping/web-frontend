import AllCards from "./allCards";

export default function Offers(params) {
    return (
        <section className=" py-5 px-6 lg:flex lg:flex-col lg:items-center">
            <h1 className="text-2xl font-bold">Top Offers</h1>
            <AllCards />
        </section>
    )
}