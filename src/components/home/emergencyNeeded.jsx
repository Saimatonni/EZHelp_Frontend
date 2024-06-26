import { PhotoProvider } from "react-photo-view";
import { useState, useEffect } from "react";
import Image from "../UI/Image";
import { BASE_URL } from "../../utils/config"; // Ensure this is correctly set to your base URL

const EmergencyNeeded = () => {
    const [emergencyData, setEmergencyData] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/jobs`);
                const result = await response.json();
                if (response.ok) {
                    const filteredData = result.data.filter(item => item.emergency);
                    setEmergencyData(filteredData);
                } else {
                    console.error('Error fetching data:', result.message);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <section className="pb-2 bg-center bg-cover bg-fixed relative">
            <div className="max-w-screen-xl mx-auto relative">
                <div className="py-5 lg:py-10 w-full text-black text-left">
                    <h2 className="text-brand__font__size__xl font-brand__font__bold font-brand__font__family__fancy leading-tight">
                        Emergency
                    </h2>
                    <h3 className="mt-1">
                        Service Needed
                    </h3>
                </div>

                <div id="photo-gallery" className="p-4 border rounded-xl shadow-md bg-white">
                    <PhotoProvider
                        speed={() => 800}
                        easing={(type) =>
                            type === 2
                                ? 'cubic-bezier(0.36, 0, 0.66, -0.56)'
                                : 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                        }
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-1">
                            {emergencyData.map((item, index) => (
                                <div
                                    key={item._id}
                                    className="relative w-full h-full"
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    <Image
                                        src={item.images[0]}
                                        className="object-cover w-full h-full"
                                    />
                                    {hoveredIndex === index && (
                                        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                                            <div className="text-white p-5">
                                                <div className="flex justify-between">
                                                    <h1 className="text-lg font-bold">{item.workType}</h1>
                                                    <p className="text-[20px] mr-5">{item.payAmount}$/hour</p>
                                                </div>
                                                <h6 className="text-lg font-bold">{item.shortTitle}</h6>
                                                <p className="text-sm">{item.description}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </PhotoProvider>
                </div>
            </div>
        </section>
    );
};

export default EmergencyNeeded;
