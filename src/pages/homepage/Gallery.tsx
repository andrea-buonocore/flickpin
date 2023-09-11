import { useEffect, useState } from "react";
import { Photo } from "../../Interfaces/Photo";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Gallery = () => {

    const [photos, setPhotos] = useState<Photo[] | null>([]);

    const headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Authorization": "Client-ID 0QuxCCaZBXT_3um02bZmS5ZwrZ7XXs08qyCTTjg1KhE"
    }

    useEffect(() => {

        const getPhotos = async () => {

            try {

                let response = await fetch("https://api.unsplash.com/photos/", {
                    method: "GET",
                    headers: headersList
                });

                let data = await response.json();
                console.log(data);
                setPhotos(data)


            } catch (error) {
                console.log(error);
            }
        }

        getPhotos();
    }, []);

    return (
        <div className="p-8">
            <h3 className="text-2xl font-bold text-center mb-4">Gallery</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {
                    photos &&
                    photos.map(photo => {
                        return (
                            <div key={photo.id}>
                                <Link to={`/photo/${photo.id}`}>
                                    <div className="aspect-square overflow-hidden rounded-lg mb-2 shadow-lg">
                                        <img
                                            src={photo.urls.full}
                                            alt={photo.alt_description}
                                            className="w-full h-full object-cover hover:scale-125 cursor-pointer transition"
                                            loading="lazy"
                                        />
                                    </div>
                                </Link>
                                <div className="flex justify-between items-center text-xs lg:text-sm">
                                    <div className="flex items-center gap-2">
                                        <div>
                                            <img
                                                src={photo.user.profile_image.small}
                                                alt=""
                                                className="rounded-full aspect-square"
                                                width={20}
                                            />
                                        </div>
                                        {photo.user.name}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <FaRegHeart />
                                        {photo.likes}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Gallery;