import { IWorkout } from "@/types/workout";
import WorkoutCard from "./WorkoutCard";


const getWorkouts = async() => {
    const res = await fetch('https://api.abcz.workers.dev/api/fitlog');
    return res.json();
}

const WorkoutLibrary = async() => {

    const workouts = await getWorkouts();

    return (

        <section id="library" className="mx-auto mt-10 w-full max-w-7xl p-4 sm:p-6 lg:mt-20">
            <h2 className="text-3xl font-bold sm:text-4xl">THE LIBRARY</h2>
            <p className="my-2 text-sm text-gray-500 sm:text-[15px]">Twelve lifts covering every major muscle group.</p>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-15 lg:grid-cols-3">
                {
                    workouts.map((workout: IWorkout) => (
                        <WorkoutCard key={workout.id}
                                    workout={workout}></WorkoutCard>
                    ))
                }
            </div>
        </section>
    )
};

export default WorkoutLibrary;
