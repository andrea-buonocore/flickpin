import { useEffect, useState } from "react";
import { Photo } from "../../Interfaces/Photo";
import { useParams } from "react-router-dom";
import { FaRegHeart, FaSpinner } from "react-icons/fa";
import { BsDownload } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai"
import { headersList } from "../../utilities/headerlist";
const PhotoDetail = () => {

    const [photo, setPhoto] = useState<Photo | null>(null);
    const [modal, setModal] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const param = useParams();
    const { id } = param;

    const handleModal = () => {
        if (!modal) {
            window.scrollTo(0, 0);
        }
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

            finally {
                setIsLoading(false);
            }
        }

        if (modal) {
            document.body.style.overflowY = 'hidden'
        } else {
            document.body.style.overflowY = 'visible'
        }

        getPhoto();



    }, [modal]);

    return (


        <div className="w-full h-full p-8">
            {
                modal && (
                    <div className="absolute top-0 left-0 bg-black/90 w-full h-screen p-8 lg:p-[5rem] flex items-center">
                        <div className="absolute top-8 right-8 text-white cursor-pointer z-20" onClick={handleModal}>
                            <AiOutlineClose
                                size={30}
                            />
                        </div>
                        <img
                            src={photo?.urls.full}
                            alt={photo?.alt_description}
                            className="w-full h-full object-contain"
                        />
                    </div>
                )
            }

            {
                isLoading && (
                    <div className="flex justify-center my-4">
                        <FaSpinner size={30} className="animate-spin" />
                    </div>
                )
            }

            {
                photo &&

                <div className="grid lg:grid-cols-2 text-sm lg:text-base border rounded-lg shadow-lg">
                    <img
                        src={photo?.urls.regular}
                        alt={photo?.alt_description}
                        className="rounded-t-lg lg:rounded-s-lg aspect-square w-full h-full object-cover cursor-zoom-in"
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
            }
        </div>

    )
}

export default PhotoDetail;