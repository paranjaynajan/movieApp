"use client"
import Image, { StaticImageData } from "next/image";
import PrimaryButton from "@/app/components/ButtonPrimary/ButtonPrimary";
import SecondaryButton from "@/app/components/ButtonSecondary/ButtonSecondary";
import InputFieldPrimary from "@/app/components/InputPrimary/InputPrimary";
import Download from "@/public/assets/svg/download.svg"
import { useParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react"
import movie2 from "@/public/assets/images/image_2.png"
import moviesData, { IMovie } from "@/app/utils/dummyData";

const EditMovie = () => {
    const [movieId, setMovieId] = useState<null | number>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [errorApi, setErrorApi] = useState<string>("")
    const [errors, setError] = useState({
        title: "",
        year: "",
    })
    const [movieData, setMovieData] = useState<IMovie>({
        id: 0,
        title: "",
        year: "",
        imageSrc: movie2
    })
    const { id } = useParams()

    const fetchMovieById = async (id: number) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000))

            const movie = moviesData.find(m => m.id === id)
            if (movie) {
                setMovieData(movie)
            } else {
                setErrorApi("Movie not found.")
            }
        } catch (e) {
            setErrorApi("Failed to fetch movies data.")
        } finally {
            setLoading(false)
        }
    }

    const handleChangeForEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event?.target
        setError((prev) => ({ ...prev, [name]: "" }))
        setMovieData((prev) => ({ ...prev, [name]: value }))
    }

    useEffect(() => {
        if (typeof id === "string") {
            const movieId = parseInt(id)
            if (!isNaN(movieId)) {
                setMovieId(movieId)
                fetchMovieById(movieId)
            } else {
                setErrorApi("Invalid movie ID.")
                setLoading(false)
            }
        }
    }, [id])

    const updateMovie = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const index = moviesData.findIndex(m => m.id === movieId);
        if (index !== -1) {
            moviesData[index] = movieData;
            alert("Movie updated!")
        } else {
            setErrorApi("Movie not found, could not update.");
        }
    }

    const createMovie = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newMovie = {
            ...movieData,
            imageSrc: movie2,
            id: moviesData.length + 1,
        };

        moviesData.push(newMovie);
        alert("Movie added successfully!")

    }
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log('File selected:', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                console.log('File read as data URL:', reader.result);
                setMovieData(prev => ({ ...prev, imageSrc: reader.result as string | StaticImageData }));
            };
            reader.readAsDataURL(file);
        } else {
            console.log('No file selected');
        }
    };

    const handleClear = () => {
        setMovieData((prev) => { return { ...prev, title: "", year: "" } })
    }


    return (
        <div className="p-8 sm:py-10 sm:px-20 lg:py-20 lg:px-40 flex flex-col gap-10 md:gap-20 min-h-[calc(100vh-200px)]">
            <div className="flex justify-between items-center text-white">
                <div className="flex items-center justify-center gap-5">
                    <h1 className="text-[16px] md:text-[32px] text-white font-[500]">
                        {movieId ? "Edit" : "Create a new movie"}
                    </h1>
                </div>
            </div>
            {movieId && loading ? (
                <div className="text-white text-center text-lg">Loading...</div>
            ) : movieId && errorApi ? (
                <div className="text-white text-center">{errorApi}</div>
            ) : (
                <form onSubmit={movieId ? updateMovie : createMovie}>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 sm:gap-20 lg:gap-32 w-full">
                        <div className="col-span-2 flex flex-col gap-10">
                            <div className="sm:hidden flex flex-col gap-5">
                                <div>
                                    <InputFieldPrimary name="title" error={errors.title} value={movieData.title} placeholder="Title"
                                        onChange={handleChangeForEdit} />
                                </div>
                                <div className="lg:w-[50%] w-full">
                                    <InputFieldPrimary name="year" error={errors.year} placeholder="Publishing year" value={movieData.year}
                                        onChange={handleChangeForEdit} />
                                </div>
                            </div>
                            {/* {movieId ? <div className="flex items-center justify-center cursor-pointer rounded-lg p-10 bg-[#224957] h-[350px] w-full">
                                <Image src={movieData.imageSrc} alt={movieData.title} className="cursor-pointer h-full w-full object-contain" />
                            </div> : <div className="flex items-center justify-center border-[1px] border-dashed cursor-pointer border-white rounded-lg p-10 bg-[#224957] h-[350px] w-full">
                                <div className="flex flex-col gap-5 justify-center items-center">
                                    <Image src={Download} width={20} height={20} alt="download" className="cursor-pointer" />
                                    <p className="text-[16px] text-white">Drop an image here</p>
                                </div>
                            </div>}  */}
                            {movieId ? (
                                <div className="flex items-center justify-center rounded-lg p-10 bg-[#224957] h-[350px] w-full">
                                    <label htmlFor="fileInput" className="w-full h-full flex items-center justify-center cursor-pointer relative">
                                        <Image
                                            src={movieData.imageSrc}
                                            alt={movieData.title}
                                            layout="fill" 
                                            objectFit="contain" 
                                            className="h-full w-full object-contain"
                                        />
                                        <input
                                            id="fileInput"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                    </label>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center border-[1px] border-dashed cursor-pointer border-white rounded-lg p-10 bg-[#224957] h-[350px] w-full">
                                    <label htmlFor="fileInput" className="w-full h-full flex items-center justify-center cursor-pointer relative">
                                        <div className="flex flex-col gap-5 justify-center items-center">
                                            <Image src={Download} width={20} height={20} alt="download" className="cursor-pointer" />
                                            <p className="text-[16px] text-white">Drop an image here</p>
                                        </div>
                                        <input
                                            id="fileInput"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                    </label>
                                </div>
                            )}

                        </div>
                        <div className="flex col-span-2 flex-col gap-5">
                            <div className="sm:flex hidden flex-col gap-5">
                                <div>
                                    <InputFieldPrimary name="title" error={errors.title} value={movieData.title} placeholder="Title"
                                        onChange={handleChangeForEdit} />
                                </div>
                                <div className="lg:w-[50%] w-full">
                                    <InputFieldPrimary name="year" error={errors.year} placeholder="Publishing year" value={movieData.year}
                                        onChange={handleChangeForEdit} />
                                </div>
                            </div>
                            <div className="flex gap-5">
                                <SecondaryButton type="button" onClick={handleClear}>
                                    Cancel
                                </SecondaryButton>
                                <PrimaryButton type="submit">
                                    Submit
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                </form>)}
        </div>
    )
}

export default EditMovie;
