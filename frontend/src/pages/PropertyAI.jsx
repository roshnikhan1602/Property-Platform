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
    const [generating, setGenerating] =
        useState(false);

    const [generatedImage, setGeneratedImage] =
        useState("");

    const [error, setError] = useState("");

    const generateDesign = async () => {

        try {
            setGenerating(true);
            setError("");

            const response = await fetch(
                "http://localhost:5000/api/ai/generate-interior",
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
                    }),
                }
            );

            const data = await response.json();

            if (data.success) {
                setGeneratedImage(data.image);
            } else {
                setError(data.message);
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
                    `http://localhost:5000/api/properties/${id}`,
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
            <div className="min-h-screen flex justify-center items-center text-xl">
                Loading...
            </div>
        );
    }

    if (!property) {
        return (
            <div className="min-h-screen flex justify-center items-center text-xl">
                Property not found.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-6">

            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8">

                <h1 className="text-3xl font-bold mb-3">
                    ✨ AI Property Elevation
                </h1>

                <p className="text-gray-600 mb-8">
                    Select one of this property's images and let AI redesign the room
                    with your preferred interior style.
                </p>


                {/* Thumbnail Gallery */}

                {property.images &&
                    property.images.length > 1 && (

                        <div className="flex gap-4 mt-5 overflow-x-auto pb-2">

                            {property.images.map(
                                (image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Property ${index + 1}`}
                                        onClick={() =>
                                            setSelectedImage(image)
                                        }
                                        className={`w-32 h-24 rounded-xl object-cover cursor-pointer border-4 transition ${selectedImage === image
                                            ? "border-blue-600"
                                            : "border-transparent hover:border-gray-300"
                                            }`}
                                    />
                                )
                            )}

                        </div>

                    )}


                {/* AI Interior Designer */}

                <div className="mt-10 bg-white border rounded-2xl p-6">

                    <h2 className="text-2xl font-bold mb-6">
                        ✨ AI Interior Designer
                    </h2>

                    <div className="space-y-6">

                        <div>

                            <div>
                                <label className="block font-medium mb-2">
                                    Room Type
                                </label>

                                <select
                                    value={roomType}
                                    onChange={(e) => setRoomType(e.target.value)}
                                    className="w-full border rounded-xl p-3"
                                >
                                    <option>Living Room</option>
                                    <option>Bedroom</option>
                                    <option>Kitchen</option>
                                    <option>Bathroom</option>
                                    <option>Dining Room</option>
                                    <option>Office</option>
                                </select>
                            </div>

                            <div>
                                <label className="block font-medium mb-2">
                                    Interior Style
                                </label>

                                <select
                                    value={style}
                                    onChange={(e) => setStyle(e.target.value)}
                                    className="w-full border rounded-xl p-3"
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

                            <select
                                value={style}
                                onChange={(e) =>
                                    setStyle(e.target.value)
                                }
                                className="w-full border rounded-xl p-3"
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

                        <div>

                            <label className="block font-medium mb-2">
                                Tell AI what you want
                            </label>

                            <textarea
                                rows={5}
                                value={prompt}
                                onChange={(e) =>
                                    setPrompt(e.target.value)
                                }
                                placeholder="Example:Example:

Luxury living room with beige sofa, marble flooring, wooden TV unit, warm lighting, indoor plants, false ceiling and large glass windows.
."
                                className="w-full border rounded-xl p-4 resize-none"
                            />

                        </div>

                        <button
                            onClick={generateDesign}
                            disabled={generating}
                            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-xl font-semibold transition"
                        >
                            {generating
                                ? "Generating..."
                                : "✨ Generate AI Design"}
                        </button>

                        {error && (
                            <p className="text-red-600 font-medium">
                                {error}
                            </p>
                        )}

                    </div>

                </div>

                {/* Generated Result */}

                {generatedImage && (

                    <div className="mt-10">

                        <h2 className="text-2xl font-bold mb-5">
                            AI Generated Design
                        </h2>

                        <img
                            src={generatedImage}
                            alt="Generated"
                            className="w-full rounded-2xl shadow-lg"
                        />

                    </div>

                )}

            </div>

        </div>
    );
}

export default PropertyAI;