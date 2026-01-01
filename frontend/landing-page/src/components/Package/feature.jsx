export default function Feature({ icon, title, text }) {
    return (
        <div className="flex space-x-3 p-3 border rounded-lg bg-white shadow-sm">
            <div className="text-[#7BBCB0]">{icon}</div>
            <div>
                <p className="font-semibold text-gray-800">{title}</p>
                <p className="text-gray-500 text-sm">{text}</p>
            </div>
        </div>
    );
}