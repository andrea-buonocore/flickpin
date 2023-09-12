import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "../../Interfaces/Photo";
import { FaSpinner } from "react-icons/fa";
import { FaXTwitter, FaInstagram, FaPaypal, FaDev } from "react-icons/fa6";

const UserPage = () => {

    const params = useParams();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { username } = params;

    const headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Authorization": "Client-ID 0QuxCCaZBXT_3um02bZmS5ZwrZ7XXs08qyCTTjg1KhE"
    }

    useEffect(() => {

        const getPhotos = async () => {

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

        getPhotos();
    }, []);


    return (
        <div className="w-full h-full p-4 lg:p-8">
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

            {/* followers & download */}

            <div className="flex items-center justify-around my-4">
                <div className="flex flex-col items-center">
                    <div>
                        {user?.followers_count}
                    </div>
                    <div className="font-bold">
                        followers
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <div>
                        {user?.downloads}
                    </div>
                    <div className="font-bold">
                        downloads
                    </div>
                </div>
            </div>

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
                        {user?.social.instagram_username}
                    </div>
                }
                {
                    user?.social.twitter_username &&
                    <div className="flex items-center gap-4 mb-4">
                        <FaXTwitter size={40} />
                        {user?.social.twitter_username}
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
                        {user?.portfolio_url}
                    </div>
                }
            </div>



        </div>
    )
}

export default UserPage;