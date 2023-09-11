import { useEffect, useState } from "react";
import { Photo } from "../../Interfaces/Photo";

const Hero = () => {

    const [photo, setPhoto] = useState<Photo | null>(null);

    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Authorization": "Client-ID 0QuxCCaZBXT_3um02bZmS5ZwrZ7XXs08qyCTTjg1KhE"
    }

    useEffect(() => {

        const getPhoto = async () => {

            try {

                let response = await fetch("https://api.unsplash.com/photos/random", {
                    method: "GET",
                    headers: headersList
                });

                let data = await response.json();
                console.log('hero', data);
                setPhoto(data);


            } catch (error) {
                console.log(error);
            }
        }

        getPhoto();

    }, []);

    return (


        <div className="h-[70vh] relative flex flex-col items-center justify-center">

            <div className="absolute top-0 left-0 w-full h-full bg-black/70 text-white flex flex-col items-center justify-center p-8">

                <h1 className="text-3xl lg:text-5xl font-bold mb-4">Trova l'Ispirazione</h1>
                <h2 className="text-xs lg:text-base font-light mb-4 text-center">La galleria fotografica che unisce l'arte di Flickr con l'ispirazione di Pinterest</h2>
                
                <form className="w-full text-center">
                    <input
                        type="search"
                        name="search"
                        className="rounded-full py-3 px-4 outline-none w-[80%] md:w-[50%] lg:w-[30%] text-black font-light text-xs placeholder:italic shadow"
                        placeholder="Lasciati ispirare.."
                    />
                </form>

            </div>

            <img
                src={photo?.urls.full}
                alt={photo?.alt_description}
                className="h-full w-full object-cover"
            />

        </div>

    )
}

export default Hero;