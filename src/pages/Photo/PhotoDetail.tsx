import { useEffect, useState } from "react";
import { Photo } from "../../Interfaces/Photo";
import { useParams } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { BsDownload } from "react-icons/bs";
const PhotoDetail = () => {

    const [photo, setPhoto] = useState<Photo | null>(null);

    const headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Authorization": "Client-ID 0QuxCCaZBXT_3um02bZmS5ZwrZ7XXs08qyCTTjg1KhE"
    }

    const param = useParams();
    const { id } = param;

    console.log(param);

    useEffect(() => {

        const getPhoto = async () => {

            try {

                let response = await fetch(`https://api.unsplash.com/photos/${id}`, {
                    method: "GET",
                    headers: headersList
                });

                let data = await response.json();
                console.log(data);
                setPhoto(data)


            } catch (error) {
                console.log(error);
            }
        }

        getPhoto();

    }, []);

    return (
        <div className="w-full h-full p-4">
            <div className="grid lg:grid-cols-2 text-sm lg:text-base">
                <img
                    src={photo?.urls.full}
                    alt={photo?.alt_description}
                    className="rounded-lg shadow-lg w-full h-full object-cover aspect-square"
                />
                <div className="p-2 lg:p-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <img
                                src={photo?.user.profile_image.large}
                                alt=""
                                className="rounded-full aspect-square"
                                width={30}
                            />
                            {photo?.user.name}
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <FaRegHeart />
                                {photo?.likes}
                            </div>
                            <div className="flex items-center gap-2">
                                <BsDownload />
                                {photo?.downloads}
                            </div>
                        </div>
                    </div>
                    <div>
                        {photo?.description}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PhotoDetail;