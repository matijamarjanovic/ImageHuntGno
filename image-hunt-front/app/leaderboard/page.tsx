'use client';
import React, {useContext, useEffect, useState} from 'react';
import Config from "@/app/config";
import ProviderContext from "@/app/context/ProviderContext";
import {parseTopScores} from "@/app/parsers/parseTopScores";
import {ITopScore} from "@/app/leaderboard/topScore.types";

const Leaderboard: React.FC = () => {
    const [topScores, setTopScores] = useState<ITopScore[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { provider } = useContext(ProviderContext);

    const fetchTopScores = async () => {
        try {

            try {
                if (provider) {
                    const response: string = await provider.evaluateExpression(
                        Config.REALM_PATH,
                        `GetTop10()`,
                    );

                    const topscores = parseTopScores(response);

                    topscores.sort((a, b) => b.points - a.points);

                    setTopScores(topscores);
                }
            } catch (error) {
                console.error('Error fetching scores:', error);
            }

        } catch (error) {
            console.error("Failed to send transaction:", error);
            setError("Error sending transaction.");
        }
    };


    useEffect(() => {
        fetchTopScores(); // Send transaction when the component mounts
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Leaderboard</h1>
            {error && <div className="text-red-500">{error}</div>}
            <table className="min-w-full border-collapse border bg-slate-800 text-center font-sans">
                <thead className="bg-gray-800 text-white">
                <tr>
                    <th className="border border-gray-600 px-4 py-2">Rank</th>
                    <th className="border border-gray-600 px-4 py-2">Address</th>
                    <th className="border border-gray-600 px-4 py-2">Points</th>
                </tr>
                </thead>
                <tbody>
                {topScores.map((score, index) => (
                    <tr key={index} className="border border-gray-600">
                        <td className="border border-gray-600 px-4 py-2">{index + 1}</td>
                        <td className="border border-gray-600 px-4 py-2 break-words max-w-xs">
                            {score.address}
                        </td>
                        <td className="border border-gray-600 px-4 py-2">{score.points}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
