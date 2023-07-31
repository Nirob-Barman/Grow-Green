
const Service = ({ title, description, icon }) => {
    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            <div className="flex items-center justify-center w-16 h-16 bg-green-500 rounded-full">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    {icon}
                </svg>
            </div>
            <div className="mt-4">
                <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
                <p className="mt-2 text-gray-600">{description}</p>
            </div>
        </div>
    );
};

export default Service;
