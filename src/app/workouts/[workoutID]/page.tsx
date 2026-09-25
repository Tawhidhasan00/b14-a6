import { IWorkout } from "@/types/workout";
import Image from "next/image";
import { CiCalendarDate } from "react-icons/ci";
import { LuBookmark } from "react-icons/lu";

interface IWorkoutDetailsProp {
    params: Promise<{
        workoutID: string;
    }>
}

const getWorkouts = async(): Promise<IWorkout[]> => {
    const res = await fetch('https://api.abcz.workers.dev/api/fitlog');
    return res.json();
}

const WorkoutDetailsPage = async({params}: IWorkoutDetailsProp) => {
    const {workoutID} = await params;
    const workouts: IWorkout[] = await getWorkouts();
    const workout = workouts.find((wk: IWorkout) => wk.id === Number(workoutID));
    if(!workout) {
        return (
            <div>
                Not Found
            </div>
        )
    }

    return (
        <div className="card card-side bg-base-100 shadow-sm max-w-7xl mx-auto grid grid-cols-2 w-full mt-10 gap-10">
            <figure className="relative h-162.5 w-full overflow-hidden rounded-2xl">
                <Image
                src={workout.image}
                alt={workout.name}
                fill
                className="object-cover rounded-2xl" />
            </figure>
            <div className="space-y-2 ml-7">
                <h2 className=" text-4xl font-bold ">{workout.name}</h2>
                <p className=" text-gray-500 text-[15px] w-full h-10">{workout.description}</p>

                <div className=' flex gap-3'>
                    {
                        workout.muscleGroups.map((mgrp: string) => (
                            <span key={mgrp}
                                className='badge h-5 rounded-2xl py-3 px-4 border-0 bg-lime-400 text-sm font-medium text-zinc-950'>
                                {mgrp}
                            </span>
                        ))
                    }
                </div>  
                
                <div className="bg-[#181c24] border border-[#252533] rounded-2xl flex flex-col mt-6">
                    <div className="flex justify-between border border-[#252533] py-2 px-4">
                        <p>EQUIPMENT</p>
                        <span>{workout.equipment}</span>
                    </div>
                    <div className="flex justify-between border border-[#252533] py-2 px-4">
                        <p>DIFFICULTY</p>
                        <span>{workout.difficulty}</span>
                    </div>
                    <div className="flex justify-between border border-[#252533] py-2 px-4">
                        <p>SETS</p>
                        <span>{workout.sets}</span>
                    </div>
                    <div className="flex justify-between border border-[#252533] py-2 px-4">
                        <p>REPS</p>
                        <span>{workout.reps}</span>
                    </div>
                    <div className="flex justify-between border border-[#252533] py-2 px-4">
                        <p>DURATION</p>
                        <span>{workout.duration}</span>
                    </div>
                    <div className="flex justify-between border border-[#252533] py-2 px-4">
                        <p>CALORIES</p>
                        <span>{workout.caloriesBurned}</span>
                    </div>
                    <div className="flex justify-between  py-2 px-4">
                        <p>RATING</p>
                        <span>{workout.rating}</span>
                    </div>

                </div>

                <div className="mt-8">
                    <h3 className="text-[18px] font-semibold">INSTRUCTIONS</h3>
                    <ol>
                        {
                            workout.instructions.map((ins, ind) => (
                                <li key={ind} className="grid grid-cols-[1rem_1fr] gap-3  py-2">
                                    <span className="display-title text-lg text-lime-400">
                                        {String(ind + 1)}.
                                    </span> 
                                    <p>{ins}</p>
                                </li>
                            ))
                        }
                    </ol>
                </div>

                <div className="flex gap-4 mb-10 mt-5">
                    <button className="bg-lime-600 text-zinc-800 rounded-md px-6 py-2 font-medium flex items-center gap-1">
                        <CiCalendarDate/>
                        <p>Add to todays plan</p>
                    </button>
                    <button className="border border-zinc-700 rounded-md px-6 py-2 font-medium flex items-center gap-1">
                        <LuBookmark/>
                        <p>Save for later</p>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default WorkoutDetailsPage;