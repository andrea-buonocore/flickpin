import { useEffect, useState } from "react";
import { Photo } from "../../Interfaces/Photo";
import { useParams } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { BsDownload } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai"
const PhotoDetail = () => {

    const [photo, setPhoto] = useState<Photo | null>(null);
    const [modal, setModal] = useState<boolean>(false);

    const headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Authorization": "Client-ID 0QuxCCaZBXT_3um02bZmS5ZwrZ7XXs08qyCTTjg1KhE"
    }

    const param = useParams();
    const { id } = param;

    const handleModal = () => {
        setModal(!modal);
    }

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


        <div className="w-full h-full p-8">
            {
                modal && (
                    <div className="absolute top-0 left-0 bg-black/90 w-full h-screen p-8 lg:p-[5rem] flex items-center">
                        <div className="absolute top-8 right-8 text-white cursor-pointer" onClick={handleModal}>
                            <AiOutlineClose
                                size={30}
                            />
                        </div>
                        <img
                            src={photo?.urls.full}
                            alt={photo?.alt_description}
                            className="w-full lg:h-full object-cover"
                        />
                    </div>
                )
            }
            <div className="grid lg:grid-cols-3 text-sm lg:text-base border rounded-lg shadow-lg">
                <img
                    src={photo?.urls.regular}
                    alt={photo?.alt_description}
                    className="rounded-t-lg lg:rounded-l-lg lg:rounded-t-none shadow-lg w-full h-full object-cover col-span-2 cursor-pointer"
                    onClick={handleModal}
                />
                <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <img
                                src={photo?.user.profile_image.large}
                                alt=""
                                className="rounded-full aspect-square cursor-pointer"
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