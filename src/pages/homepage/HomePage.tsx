import { useEffect, useState } from "react";
import { Photo } from "../../Interfaces/Photo";
import { headersList } from "../../utilities/headerlist";
import Gallery from "./Gallery";
import Hero from "./Hero";

const HomePage = () => {

    const [hero, setHero] = useState<Photo | null>(null);
    const [gallery, setGallery] = useState<Photo[] | null>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {

        const getHeroPhoto = async () => {

            try {

                let response = await fetch("https://api.unsplash.com/photos/random", {
                    method: "GET",
                    headers: headersList
                });

                let data = await response.json();
                setHero(data);


            } catch (error) {
                console.log(error);
            }
        }

        const getPhotos = async () => {

            try {

                let response = await fetch("https://api.unsplash.com/photos?per_page=12", {
                    method: "GET",
                    headers: headersList
                });

                let data = await response.json();
                setGallery(data);

            } catch (error) {
                console.log(error);
            }

        }

        Promise.all([getHeroPhoto(), getPhotos()])
            .then(() => setIsLoading(false))
            .catch(error => console.log(error));


    }, []);

    return (
        <div>
            <Hero photo={hero} />
            <Gallery photos={gallery} loading={isLoading} />
        </div>
    )
}

export default HomePage;

