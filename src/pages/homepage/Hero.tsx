import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Photo } from "../../Interfaces/Photo";

interface HeroProps {
    photo: Photo | null
}

const Hero = ({photo} : HeroProps) => {


    const [query, setQuery] = useState<string>('');
    const navigate = useNavigate()

    

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    const formSubmit = (e: FormEvent) => {
        e.preventDefault();
        navigate(`/search/${query}`)

    }

    return (

        
        <div className="h-[70vh] relative flex flex-col items-center justify-center">

            <div className="absolute top-0 left-0 w-full h-full bg-black/70 text-white flex flex-col items-center justify-center p-8">

                <h1 className="text-3xl lg:text-5xl font-bold mb-4">FlickPin</h1>
                <h2 className="text-xs lg:text-base font-light mb-4 text-center">La galleria fotografica che unisce l'arte di Flickr con l'ispirazione di Pinterest</h2>

                <form className="w-full text-center" onSubmit={formSubmit}>
                    <input
                        type="search"
                        name="image"
                        className="rounded-full py-3 px-4 outline-none w-[80%] md:w-[50%] lg:w-[30%] text-black font-light text-xs placeholder:italic shadow"
                        placeholder="Lasciati ispirare.."
                        value={query}
                        onChange={handleChange}
                    />
                </form>

            </div>

            <img
                src={photo?.urls.regular}
                alt={photo?.alt_description}
                className="h-full w-full object-cover"
            />

        </div>

    )
}

export default Hero;