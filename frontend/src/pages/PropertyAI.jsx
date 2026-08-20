import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PropertyAI() {
    const { id } = useParams();

    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState("");

    const [style, setStyle] = useState("Modern");
    const [roomType, setRoomType] = useState("Living Room");
    const [prompt, setPrompt] = useState("");
    const [generating, setGenerating] = useState(false);

    const [generatedImage, setGeneratedImage] = useState("");
    const [error, setError] = useState("");

    const generateDesign = async () => {
        try {
            setGenerating(true);
            setError("");

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/ai/generate-interior`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        roomType,
                        style,
                        prompt,
                        image: selectedImage,
                    }),
                }
            );

            const data = await response.json();

            if (data.success) {
                setGeneratedImage(data.image);
            } else {
                setError(
                    data.message || "Failed to generate AI design."
                );
            }
        } catch (error) {
            console.error(error);

            setError("Failed to generate AI design.");
        } finally {
            setGenerating(false);
        }
    };

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/properties/${id}`,
                    {
                        credentials: "include",
                    }
                );

                const data = await response.json();

                if (data.success) {
                    setProperty(data.property);

                    if (
                        data.property.images &&
                        data.property.images.length > 0
                    ) {
                        setSelectedImage(
                            data.property.images[0]
                        );
                    }
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center text-lg sm:text-xl px-4">
                Loading...
            </div>
        );
    }

    if (!property) {
        return (
            <div className="min-h-screen flex justify-center items-center text-lg sm:text-xl px-4 text-center">
                Property not found.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-6 sm:py-10 px-3 sm:px-6">

            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8">

                {/* HEADER */}

                <h1 className="text-2xl sm:text-3xl font-bold mb-3">
                    ✨ AI Property Elevation
                </h1>

                <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base leading-6">
                    Select one of this property's images and let AI redesign the room
                    with your preferred interior style.
                </p>


                {/* SELECTED IMAGE */}

                {selectedImage && (
                    <div className="mb-6">

                        <h2 className="text-lg sm:text-xl font-semibold mb-3">
                            Selected Property Image
                        </h2>

                        <img
                            src={selectedImage}
                            alt="Selected property"
                            className="w-full max-h-[500px] object-cover rounded-2xl shadow-md"
                        />

                    </div>
                )}


                {/* THUMBNAIL GALLERY */}

                {property.images &&
                    property.images.length > 1 && (

                        <div className="flex gap-3 sm:gap-4 mt-5 overflow-x-auto pb-3">

                            {property.images.map(
                                (image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Property ${index + 1}`}
                                        onClick={() =>
                                            setSelectedImage(image)
                                        }
                                        className={`flex-shrink-0 w-24 h-20 sm:w-32 sm:h-24 rounded-xl object-cover cursor-pointer border-4 transition ${
                                            selectedImage === image
                                                ? "border-blue-600"
                                                : "border-transparent hover:border-gray-300"
                                        }`}
                                    />
                                )
                            )}

                        </div>

                    )}


                {/* AI INTERIOR DESIGNER */}

                <div className="mt-8 sm:mt-10 bg-white border rounded-2xl p-4 sm:p-6">

                    <h2 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">
                        ✨ AI Interior Designer
                    </h2>

                    <div className="space-y-5 sm:space-y-6">

                        {/* ROOM TYPE */}

                        <div>
                            <label className="block font-medium mb-2 text-sm sm:text-base">
                                Room Type
                            </label>

                            <select
                                value={roomType}
                                onChange={(e) =>
                                    setRoomType(e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-xl p-3 bg-white outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500"
                            >
                                <option>Living Room</option>
                                <option>Bedroom</option>
                                <option>Kitchen</option>
                                <option>Bathroom</option>
                                <option>Dining Room</option>
                                <option>Office</option>
                            </select>
                        </div>


                        {/* INTERIOR STYLE */}

                        <div>
                            <label className="block font-medium mb-2 text-sm sm:text-base">
                                Interior Style
                            </label>

                            <select
                                value={style}
                                onChange={(e) =>
                                    setStyle(e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-xl p-3 bg-white outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500"
                            >
                                <option>Modern</option>
                                <option>Luxury</option>
                                <option>Minimal</option>
                                <option>Scandinavian</option>
                                <option>Industrial</option>
                                <option>Classic</option>
                                <option>Bohemian</option>
                            </select>
                        </div>


                        {/* PROMPT */}

                        <div>

                            <label className="block font-medium mb-2 text-sm sm:text-base">
                                Tell AI what you want
                            </label>

                            <textarea
                                rows={5}
                                value={prompt}
                                onChange={(e) =>
                                    setPrompt(e.target.value)
                                }
                                placeholder="Example: Luxury living room with beige sofa, marble flooring, wooden TV unit, warm lighting, indoor plants, false ceiling and large glass windows."
                                className="w-full border border-gray-300 rounded-xl p-3 sm:p-4 resize-none outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 text-sm sm:text-base"
                            />

                        </div>


                        {/* GENERATE BUTTON */}

                        <button
                            onClick={generateDesign}
                            disabled={generating || !selectedImage}
                            className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold transition cursor-pointer disabled:cursor-not-allowed"
                        >
                            {generating
                                ? "Generating..."
                                : "✨ Generate AI Design"}
                        </button>


                        {/* ERROR */}

                        {error && (
                            <p className="text-red-600 font-medium text-sm sm:text-base">
                                {error}
                            </p>
                        )}

                    </div>

                </div>


                {/* GENERATED RESULT */}

                {generatedImage && (

                    <div className="mt-8 sm:mt-10">

                        <h2 className="text-xl sm:text-2xl font-bold mb-5">
                            AI Generated Design
                        </h2>

                        <img
                            src={generatedImage}
                            alt="Generated AI interior design"
                            className="w-full rounded-2xl shadow-lg object-cover"
                        />

                    </div>

                )}

            </div>

        </div>
    );
}

export default PropertyAI;