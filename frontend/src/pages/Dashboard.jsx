import { useEffect, useState } from "react";

export default function Dashboard() {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    useEffect(() => {
        let url = `https://api.themoviedb.org/3/movie/popular?page=${page}&api_key=c625e30dc84877f0eb2d64f5c9597b8c`;

        if (search) {
            url = `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=c625e30dc84877f0eb2d64f5c9597b8c`;
        }

        fetch(url)
            .then((res) => res.json())
            .then((data) => setMovies(data.results || []));
    }, [page, search]);

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">


            <header className="fixed top-0 w-full z-20 bg-black/80 backdrop-blur-md border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-6 py-4 relative flex items-center justify-center">

                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                        alt="Netflix"
                        className="h-9 absolute left-6"
                    />

                    <h1 className="text-2xl md:text-3xl font-bold text-red-600 tracking-wide">
                        Welcome to Netflix Dashboard
                    </h1>

                </div>
            </header>

           
            <div className="mt-28 flex justify-center">
                <input
                    type="text"
                    placeholder="Search Movies..."
                    className="w-3/4 md:w-1/2 p-3 rounded border border-gray-700
          bg-gray-900/70 backdrop-blur-md text-white focus:outline-none
          focus:ring-2 focus:ring-red-600 transition"
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <main className="flex-1 max-w-7xl mx-auto w-full px-6 mt-10">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {movies.map((movie) => (
                        <div key={movie.id}
                            className="bg-gray-900 rounded-xl overflow-hidden shadow hover:shadow-red-600/20 hover:scale-105 transition">

                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className="h-[340px] w-full object-cover"
                            />

                            <div className="p-3">
                                <h3 className="font-semibold text-lg truncate">{movie.title}</h3>

                                <p className="text-xs text-gray-300 mt-1 line-clamp-3">
                                    {movie.overview}
                                </p>
                            </div>

                        </div>
                    ))}
                </div>

            
                <div className="flex justify-between my-10">
                    <button
                        disabled={page === 1}
                        className="px-5 py-2 rounded bg-gray-800 hover:bg-red-600 transition disabled:opacity-40"
                        onClick={() => setPage((prev) => prev - 1)}
                    >
                        PREV
                    </button>

                    <button
                        className="px-5 py-2 rounded bg-gray-800 hover:bg-red-600 transition"
                        onClick={() => setPage((prev) => prev + 1)}
                    >
                        NEXT
                    </button>
                </div>
            </main>

            <div className="border-t border-gray-800 bg-black/90 backdrop-blur-md py-6  text-gray-500">
                <footer className="relative z-20 w-full text-sm px-10 md:px-10">
                    <p className="mb-4 lg:text-lg ">Questions? Call 000-800-919-1694 (Toll-Free)</p>

                    <div className=" text-[#BABABA] grid grid-cols-2 md:grid-cols-4 gap-3 mt-8 mb-4">
                        <a href="https://help.netflix.com/support/412" className="underline cursor-pointer">FAQ</a>
                        <a href="https://help.netflix.com/support/412" className="underline cursor-pointer">Help Centre</a>
                        <a href="https://help.netflix.com/support/412" className="underline cursor-pointer">Terms of Use</a>
                        <a href="https://help.netflix.com/support/412" className="underline cursor-pointer">Privacy</a>
                        <a href="https://help.netflix.com/support/412" className="underline cursor-pointer">Cookie Preferences</a>
                        <a href="https://help.netflix.com/support/412" className="underline cursor-pointer">Corporate Information</a>
                    </div>

                    <div className="inline-block relative mb-10 mt-4">
                 
                        <select className="appearance-none bg-black text-white border border-gray-500 px-10 py-2 rounded text-sm cursor-pointer hover:border-white transition w-full">
                            <option value="english">English</option>
                            <option value="tamil">தமிழ்</option>
                            <option value="hindi">हिन्दी</option>
                        </select>

                
                        <svg
                            viewBox="0 0 16 16"
                            width="16"
                            height="16"
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white pointer-events-none"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            aria-hidden="true"
                        >
                            <path
                                fill="currentColor"
                                fillRule="evenodd"
                                d="M10.77 5.33 10.5 6 9.34 8.94l-.57 1.44L7.33 14h1.78l.73-1.97h3.58l.74 1.97H16l-3.43-8.67zm-.15 4.6-.24.63h2.51l-1.26-3.35zm-1.1-5.09.1-.19h-3.2V2h-1.5v2.65H.55V6h3.77A11 11 0 0 1 0 10.43c.33.28.81.8 1.05 1.16 1.5-.91 2.85-2.36 3.88-4.02v5.1h1.49V7.52q.6.95 1.33 1.8l.57-1.43a12 12 0 0 1-1.34-1.9h2.09z"
                                clipRule="evenodd"
                            ></path>
                        </svg>

                        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-white text-sm">
                            ▼
                        </div>
                    </div>


                </footer>

            </div>
        </div>
    );
}
