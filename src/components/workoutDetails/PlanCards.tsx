import { IoMdStarOutline } from "react-icons/io";
import { AiFillFire } from "react-icons/ai";
import { FaRegClock } from "react-icons/fa6";
import Image from "next/image";

import { IWorkout } from "@/types/workout";
import Link from "next/link";
import { FiArrowRight, FiCheck, FiX } from "react-icons/fi";

type Props = {
    workout: IWorkout;
    activeTab: "plan" | "saved";
    completed: boolean;

    onDone: (id:number)=>void;
    onRemove:(id:number)=>void;
};



const PlanCards = ({workout, activeTab, completed,onDone, onRemove}: Props) => {
    return (

    <article className="grid grid-cols-1 gap-5 rounded-2xl border border-zinc-800 bg-zinc-950 p-4 md:grid-cols-[12rem_minmax(0,1fr)]" >

        <div className="relative h-48 overflow-hidden rounded-xl md:h-auto md:min-h-22">
            <Image
                src={workout.image}
                alt={workout.name}
                fill
                className="object-cover" />
        </div>

        <div className="flex min-w-0 flex-col justify-between lg:flex-row">
            <div>
                <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h2 className="text-2xl font-black uppercase">
                    {workout.name}
                    </h2>
                    <p className="mt-1 text-sm text-zinc-400">
                    {workout.equipment}
                    </p>
                </div>

                {completed && (
                    <span className="rounded-full bg-lime-400 px-3 py-1 text-xs font-bold text-black">
                    COMPLETED
                    </span>
                )}
                </div>

                <div className="mt-5 flex flex-wrap gap-5 text-sm text-zinc-400">
                <span className="flex items-center gap-2">
                    <FaRegClock />
                    {workout.duration} min
                </span>

                <span className="flex items-center gap-2">
                    <AiFillFire />
                    {workout.caloriesBurned} kcal
                </span>

                <span className="flex items-center gap-2">
                    <IoMdStarOutline />
                    {workout.rating}
                </span>
                </div>
            </div>


            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">

                <Link href={`/workouts/${workout.id}`}
                    className="flex h-10 items-center justify-center gap-2 rounded-md border border-zinc-700 px-4 py-2 text-sm font-bold text-white"
                    > View Details <FiArrowRight />
                </Link>

                {activeTab === "plan" && (
                    <button
                            onClick={() => onDone(workout.id)}
                            disabled={completed} className="flex h-10 items-center justify-center gap-2 rounded-md border bg-lime-400 text-black
                                                            px-4 py-2 text-sm font-bold disabled:text-zinc-800 disabled:bg-lime-700"
                        > <FiCheck />
                            {completed ? "Done" : "Mark as Done"}
                    </button>
                )}

                <button
                    onClick={() => onRemove(workout.id)}
                    aria-label={`Remove ${workout.name}`}
                    className="grid size-10 place-items-center rounded-md border border-red-900 text-red-400 hover:bg-red-950"
                    >
                    <FiX />
                </button>
            </div>
        </div>
    </article>
    );
};

export default PlanCards;
