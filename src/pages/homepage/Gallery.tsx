import { FaRegHeart, FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Photo } from "../../Interfaces/Photo";

interface GalleryProps {
    photos: Photo[] | null,
    loading: boolean
}

const Gallery = ({photos, loading} : GalleryProps) => {

   

    return (
        
        <div className="p-8">
            {
                !photos && loading && (
                    <div className="mb-8 flex justify-center">
                        <FaSpinner size={30} className="animate-spin" />
                    </div>
                )
            }
            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {
                    photos &&
                    photos.map(photo => {
                        return (
                            <div key={photo.id} className="lg:mb-4">
                                {/* photo */}
                                <Link to={`/photo/${photo.id}`}>
                                    <div className="overflow-hidden rounded-lg mb-3 shadow-xl">
                                        <img
                                            src={photo.urls.regular}
                                            alt={photo.alt_description}
                                            className="aspect-square w-full h-full object-cover hover:scale-125 cursor-pointer transition hover:brightness-110"
                                            loading="lazy"
                                        />
                                    </div>
                                </Link>
                                {/* user */}
                                <div className="flex justify-between items-center text-xs lg:text-sm">
                                    <Link to={`/user/${photo.user.username}`}>
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
                                    </Link>
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