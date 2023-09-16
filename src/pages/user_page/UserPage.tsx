import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Photo, User } from "../../Interfaces/Photo";
import { FaSpinner } from "react-icons/fa";
import { FaXTwitter, FaInstagram, FaDev } from "react-icons/fa6";

const UserPage = () => {

    const params = useParams();
    const [user, setUser] = useState<User | undefined>(undefined);
    const [userPhotos, setUserPhotos] = useState<Photo[] | []>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { username } = params;

    const headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Authorization": "Client-ID 0QuxCCaZBXT_3um02bZmS5ZwrZ7XXs08qyCTTjg1KhE"
    }

    useEffect(() => {

        const getUserProfile = async () => {

            try {

                let response = await fetch(`https://api.unsplash.com/users/${username}`, {
                    method: "GET",
                    headers: headersList
                });

                let data = await response.json();
                console.log('data', data);
                setUser(data);

            } catch (error) {
                console.log(error);
            }

            finally {
                setIsLoading(false);
            }
        }

        const getUserPhotos = async () => {

            try {
                let url = `https://api.unsplash.com/users/${username}/photos`;
                console.log('url', url)
        
                if (url) {
                    let response = await fetch(url, {
                        method: "GET",
                        headers: headersList
                    });
        
                    if (response.ok) {
                        let data = await response.json();
                        console.log('foto', data);
                        setUserPhotos(data);
                    } else {
                        console.error('Errore nella richiesta: ' + response.statusText);
                    }
                } else {
                    console.error('L\'URL non è valido');
                }
            } catch (error) {
                console.error(error);
            }
        }
        

        

        Promise.all([getUserProfile(), getUserPhotos()])

    }, []);


    return (
        // main container
        <div className="w-full h-full p-4 lg:p-8 text-center">

            {
                isLoading && (
                    <div className="flex justify-center my-8">
                        <FaSpinner size={0} className="animate-spin" />
                    </div>
                )
            }

            {/* username & photo */}
            <div className="flex flex-col items-center gap-2 my-8">
                <img
                    src={user?.profile_image.large}
                    alt=""
                    className=" aspect-square rounded-full lg:w-24"
                />
                <div className="font-bold text-xl">
                    {user?.username.toLowerCase()}
                </div>
            </div>

            {/* photos & likes */}

            <div className="flex items-center justify-around my-8">
                <div className="flex flex-col items-center">
                    <div>
                        {user?.total_photos}
                    </div>
                    <div className="font-bold">
                        photos
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <div>
                        {user?.total_likes}
                    </div>
                    <div className="font-bold">
                        likes
                    </div>
                </div>
            </div>

            {/* bio & social grid container */}
            <div className="flex flex-col lg:flex-row">

                {/* bio */}
                {
                    user?.bio && (
                        <>
                            <div className="my-8 flex-1">
                                <div className="font-bold text-lg mb-4">About me</div>
                                {user?.bio}
                            </div>
                        </>
                    )
                }

                {/* social */}
                <div className="my-8 flex-1">
                    {
                        user?.social &&
                        <div className="font-bold text-lg mb-4">Social</div>
                    }
                    <div className="flex items-center justify-around">

                        {
                            user?.social.instagram_username &&
                            <div>
                                <a href={`https://www.instagram.com/${user?.social.instagram_username}`} target="_blank"><FaInstagram size={40} /></a>
                            </div>
                        }
                        {
                            user?.social.twitter_username &&
                            <div>
                                <a href={`https://www.twitter.com/${user?.social.twitter_username}`} target="_blank"><FaXTwitter size={40} /></a>
                            </div>
                        }
                        {
                            user?.social.portfolio_url &&
                            <div>
                                <a href={user?.portfolio_url} target="_blank"><FaDev size={40} /></a>
                            </div>
                        }
                    </div>
                </div>

            </div>

            {/* user photos */}
            {
                userPhotos &&
                <div className="my-8">
                    <div className="font-bold text-lg mb-4">My Pics</div>
                    <div className="grid grid-cols-3 lg:grid-cols-4 gap-2">
                        {
                            userPhotos?.map((photo) => {
                                return (
                                    <div className="overflow-hidden rounded-lg aspect-square" key={photo.id}>
                                        <img
                                            src={photo.urls.regular}
                                            alt={photo.alt_description}
                                            className=" w-full h-full object-cover hover:scale-125 cursor-pointer transition"
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
            }

        </div>
    )
}

export default UserPage;