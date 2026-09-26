import AddButton from "@/components/workoutDetails/AddButton";
import SaveButton from "@/components/workoutDetails/SaveButton";
import { IWorkout } from "@/types/workout";
import Image from "next/image";
import { notFound } from "next/navigation";

interface IWorkoutDetailsProp {
    params: Promise<{
        workoutID: string;
    }>
}

const getWorkouts = async(): Promise<IWorkout[]> => {
    const res = await fetch('https://api.abcz.workers.dev/api/fitlog', {next: { revalidate: 3600 }});
    if (!res.ok) {
        throw new Error("Failed to load workouts");
    }
    return res.json();
}

const WorkoutDetailsPage = async({params}: IWorkoutDetailsProp) => {
    const {workoutID} = await params;
    const workouts: IWorkout[] = await getWorkouts();
    const workout = workouts.find(
        (wk: IWorkout) => wk.id === Number(workoutID)
    );
    if (!workout) {
    notFound();
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

                <div className='mt-5 flex gap-3'>
                    {
                        workout.muscleGroups.map((mgrp: string) => (
                            <span key={mgrp}
                                className='badge h-5 rounded-2xl py-4 px-5 border-0 bg-lime-400 text-sm font-medium text-zinc-950'>
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

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <AddButton workout={workout} />
          <SaveButton workout={workout} />
        </div>

            </div>
        </div>
    );
};

export default WorkoutDetailsPage;