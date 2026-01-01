export default function MsgCard(params) {
    return (<>
        {/* Title */}
        <h1 className="text-3xl font-bold text-center">Yay! Payment Completed</h1>
        <p className="text-gray-500 text-center mt-1">
            Kindly follow all the steps.
        </p>
        <div className="flex flex-col mt-10 gap-3 w-full max-w-xs">
            <img src="/payments/paymentSuccessful.png" alt="payment successful" />
            <p className="text-center text-gray-500">
                Please check your email & phone Message.
                We have sent all the Information
            </p>
            <button className="bg-blue-600 text-white rounded-lg py-3 font-medium hover:bg-blue-700">
                Go to Dashboard
            </button>
        </div>
    </>)
}