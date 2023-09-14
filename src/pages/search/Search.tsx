import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SearchResult } from "../../Interfaces/Photo";
import { FaRegHeart, FaSpinner } from "react-icons/fa";


const Search = () => {

    const [photos, setPhotos] = useState<SearchResult | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [pageCounter, setPageCounter] = useState<number>(1);
    const params = useParams();
    const { query } = params;

    const headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Authorization": "Client-ID 0QuxCCaZBXT_3um02bZmS5ZwrZ7XXs08qyCTTjg1KhE"
    }

    useEffect(() => {

        const getPhotos = async () => {

            try {

                let response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=12&page=${pageCounter}`, {
                    method: "GET",
                    headers: headersList
                });

                let data = await response.json();
                console.log(data);
                setPhotos(data)


            } catch (error) {
                console.log(error);
            }

            finally {
                setIsLoading(false);
            }
        }

        getPhotos();

    }, [pageCounter]);

    return (
        <div className="p-8">
            <h3 className="mb-4">{photos?.total} result for: <b>{query}</b></h3>
            {
                isLoading && (
                    <div className="flex justify-center my-4">
                        <FaSpinner size={30} className="animate-spin" />
                    </div>
                )
            }
            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 mb-12">
                {
                    photos &&
                    photos?.results.map(photo => {
                        return (
                            <div key={photo.id}>
                                <Link to={`/photo/${photo.id}`}>
                                    <div className="aspect-square overflow-hidden rounded-lg mb-2 shadow-lg">
                                        <img
                                            src={photo.urls.regular}
                                            alt={photo.alt_description}
                                            className="w-full h-full object-cover hover:scale-125 cursor-pointer transition"
                                            loading="lazy"
                                        />
                                    </div>
                                </Link>
                                
                                <Link to={`/user/${photo.user.username}`}>
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
                                </Link>

                            </div>
                        )
                    })
                }
            </div>
            <div className="flex items-center justify-center gap-1">                
                <button className="border rounded px-2 hover:bg-slate-200 transition" onClick={() => setPageCounter(s => s-1)}>{'<<'}</button>
                <button className="border rounded px-2 hover:bg-slate-200 transition" onClick={() => setPageCounter(s => s+1)}>{'>>'}</button>                
            </div>
        </div>
    )
}

export default Search;
