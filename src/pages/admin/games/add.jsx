
import { useState, useEffect } from 'react';
import Link from 'next/link';


export default function AddGame() {
    return (
        <section className="bg-gray-100 min-h-screen">
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold mb-4">Add Game</h1>
                <div className="flex flex-row items-center justify-center h-screen">
                    <Link href="/admin/games/guess-movie/add" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Guess Movie</Link>
                </div>
            </div>

        </section>
    )
}





