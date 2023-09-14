import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Photo, User } from "../../Interfaces/Photo";
import { FaSpinner } from "react-icons/fa";
import { FaXTwitter, FaInstagram, FaPaypal, FaDev } from "react-icons/fa6";

const UserPage = () => {

    const params = useParams();
    const [user, setUser] = useState<User | null>(null);
    const [userPhotos, setUserPhotos] = useState<Photo[] | [] | null>([])
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

                let response = await fetch(`${user?.links.photos}`, {
                    method: "GET",
                    headers: headersList
                });

                let data = await response.json();
                console.log('foto', data);
                setUserPhotos(data);


            } catch (error) {
                console.log(error);
            }

        }

        getUserProfile();
        getUserPhotos();

    }, []);


    return (
        // main container
        <div className="w-full h-full p-4 lg:p-8 text-center">

            {
                isLoading && (
                    <div className="flex justify-center my-4">
                        <FaSpinner size={0} className="animate-spin" />
                    </div>
                )
            }

            {/* username & photo */}
            <div className="flex flex-col items-center gap-2 my-4">
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

            <div className="flex items-center justify-around my-4">
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
            <div className="md:grid md:grid-cols-2 gap-12">

                {/* bio */}
                <div className="my-4">
                    <div className="font-bold text-lg mb-4">About me:</div>
                    {user?.bio}
                </div>

                {/* social */}
                <div className="my-4">
                    <div className="font-bold text-lg mb-4">Social:</div>
                    {
                        user?.social.instagram_username &&
                        <div className="flex items-center gap-4 mb-4">
                            <FaInstagram size={40} />
                            <a href={`https://www.instagram.com/${user?.social.instagram_username}`} target="_blank">{user?.social.instagram_username}</a>

                        </div>
                    }
                    {
                        user?.social.twitter_username &&
                        <div className="flex items-center gap-4 mb-4">
                            <FaXTwitter size={40} />
                            <a href={`https://www.twitter.com/${user?.social.twitter_username}`} target="_blank">{user?.social.twitter_username}</a>

                        </div>
                    }
                    {
                        user?.social.paypal_email &&
                        <div className="flex items-center gap-4 mb-4">
                            <FaPaypal size={40} />
                            {user?.social.paypal_email}
                        </div>
                    }
                    {
                        user?.social.portfolio_url &&
                        <div className="flex items-center gap-4 mb-4">
                            <FaDev size={40} />
                            <a href={user?.portfolio_url} target="_blank">{user?.portfolio_url}</a>


                        </div>
                    }
                </div>

            </div>

            {/* user photos */}
            <div className="my-4">
                <div className="font-bold text-lg mb-4">My Pics:</div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {
                        userPhotos && userPhotos.map((photo) => {
                            return (
                                <img src={photo.urls.regular} alt={photo.alt_description} className="rounded-lg aspect-square object-cover" />
                            )
                        })
                    }
                </div>

            </div>

        </div>
    )
}

export default UserPage;