"use client"
import Image, { StaticImageData } from "next/image"
import { useRouter } from "next/navigation"
import AddIcon from "@/public/assets/svg/add.svg"
import Logout from "@/public/assets/svg/logout.svg"
import Card from "../components/Card/Card"
import moviesData, { IMovie } from "@/app/utils/dummyData"
import { useEffect, useState } from "react"

const Movies = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [movies, setMovies] = useState<IMovie[]>([])
    const [error, setError] = useState("")
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState<number>(0)

    const moviesPerPage = 8

    const logout = () => {
        localStorage.clear()
        router.push("/")
    }

    const fetchData = async () => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000))

            const len = moviesData.length
            const total = Math.ceil(len / moviesPerPage)
            setTotalPages(total)

            const start = currentPage * moviesPerPage
            const end = start + moviesPerPage
            const setData = moviesData.slice(start, end)

            setMovies(setData)
        } catch (e) {
            setError("Failed to fetch movies data.")
        } finally {
            setLoading(false)
        }
    }

    const handlePageChange = (index: number) => {
        setCurrentPage(index)
    }

    const handlePrevPage = () => {
        if (currentPage > 0) {
            handlePageChange(currentPage - 1)
        }
    }

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            handlePageChange(currentPage + 1)
        }
    }

    const handleEdit = (id: number) => {
        router.push(`/movies/${id}`)
    }

    const handleNew = () => {
        router.push(`/movies/null`)
    }

    useEffect(() => { fetchData() }, [currentPage])

    return (
        <div className="p-8 sm:py-10 sm:px-20 lg:py-20 lg:px-40 flex flex-col gap-10 md:gap-20 min-h-[calc(100vh-200px)]">
            <div className="flex justify-between items-center text-white">
                <div className="flex items-center justify-center gap-2 sm:gap-5">
                    <h1 className="text-[16px] md:text-[32px] text-white font-[500]">
                        My movies
                    </h1>
                    <Image src={AddIcon} width={30} height={30} alt="add" className="cursor-pointer" onClick={handleNew} />
                </div>
                <div className="cursor-pointer flex items-center justify-center gap-2 sm:gap-5" onClick={logout}>
                    <h4>
                        Logout
                    </h4>
                    <Image src={Logout} width={20} height={20} alt="add" />
                </div>
            </div>
            <div>
                {loading ? (
                    <div className="text-white text-center text-lg">Loading...</div>
                ) : error ? (
                    <div className="text-white text-center">{error}</div>
                ) : (
                    <div className="flex flex-col gap-20">
                        <div className="grid grid-cols-2  md:grid-cols-3 place-items-center lg:grid-cols-4 gap-5 md:gap-10">
                            {movies.map((movie, index: number) => (
                                <div key={index} onClick={() => handleEdit(movie.id)} className="flex justify-center">
                                    <Card
                                        title={movie.title}
                                        year={movie.year}
                                        imageSrc={movie.imageSrc}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center items-center gap-5 text-white">
                            <div className={`cursor-pointer font-bold ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={handlePrevPage}>
                                Prev
                            </div>

                            <div className="flex justify-center items-center gap-2">
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <div key={index} onClick={() => handlePageChange(index)} className={`cursor-pointer font-bold text-white h-10 w-10 text-center p-2 ${currentPage === index ? "bg-[#2BD17E]" : "bg-[#092C39]"} rounded-md`}>
                                        {index + 1}
                                    </div>
                                ))}
                            </div>
                            <div className={`cursor-pointer font-bold ${currentPage === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={handleNextPage}>
                                Next
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Movies
