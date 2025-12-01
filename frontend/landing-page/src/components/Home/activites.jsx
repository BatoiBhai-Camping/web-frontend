import AllCards from "./allCards";

export default function Activites(params) {
    return (
        <section className=" py-5 px-6 lg:flex lg:flex-col lg:items-center">
            <h1 className="text-2xl font-bold">All Activites</h1>
            <AllCards/>
        </section>
    )
}