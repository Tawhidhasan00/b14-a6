import { IWorkout } from "@/types/workout";
import WorkoutCard from "./WorkoutCard";


const getWorkouts = async() => {
    const res = await fetch('https://api.abcz.workers.dev/api/fitlog');
    return res.json();
}

const WorkoutLibrary = async() => {

    const workouts = await getWorkouts();

    return (
        <section id="library" className="max-w-7xl mx-auto w-full mt-20 p-6">
            <h2 className=" text-4xl font-bold">THE LIBRARY</h2>
            <p className="my-2 text-gray-500 text-[15px]">Twelve lifts covering every major muscle group.</p>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-15">
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