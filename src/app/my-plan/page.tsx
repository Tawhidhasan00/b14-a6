'use client'
import Link from "next/link";
import { FiArrowRight,  FiPlus, FiSearch } from "react-icons/fi";

import { useWorkouts } from "@/contexts/WorkoutContext";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import PlanCards from "@/components/workoutDetails/PlanCards";


type TabType = "plan" | "saved";
type SortType = "duration" | "calories" | "rating";




const MyPlanPage = () => {

  const {
    plan,
    saved,
    completed,
    isLoaded,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
  } = useWorkouts();

  const [activeTab, setActiveTab] = useState<TabType>("plan");
  const [sortBy, setSortBy] = useState<SortType>("duration");
  const [search, setSearch] = useState("");

    const currentWorkouts = activeTab === "plan" ? plan : saved;

    // for total shown
  const totalMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );



  const visibleWorkouts = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    const filteredWorkouts = currentWorkouts.filter((workout) => {

      const nameMatches = workout.name
        .toLowerCase().includes(searchValue);
      const tagMatches = workout.muscleGroups.some((group) =>
        group.toLowerCase().includes(searchValue)
      );
      return nameMatches || tagMatches;
    });

    return [...filteredWorkouts].sort((a, b) => {
      if (sortBy === "calories") {
        return b.caloriesBurned - a.caloriesBurned;
      }
      if (sortBy === "rating") {
        return b.rating - a.rating;
      }
      return a.duration - b.duration;
    });
  }, [search, currentWorkouts,  sortBy]);


  const handleRemove = (id: number) => {
    if (activeTab === "plan") {
      removeFromPlan(id);
      toast.info("Workout removed from today's plan");
    } else {
      removeFromSaved(id);
      toast.info("Workout removed from saved");
    }
  };

  const handleDone = (id: number) => {
    markAsDone(id);
    toast.success("Workout marked as done");
  };

  if (!isLoaded) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <div className="text-center">
          <span className="mx-auto block size-10 animate-spin rounded-full border-4 border-zinc-700 border-t-lime-400" />
          <p className="mt-4 text-sm text-zinc-400">
            Loading workouts...
          </p>
        </div>
      </div>
    );
  }

  const hasSearch = search.trim().length > 0;

  
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
        <div>
            <h1 className="display-title text-4xl font-black sm:text-5xl">
            MY PLAN
            </h1>
            <p className="mt-2 text-zinc-400">
            Cap of five lifts for today. Finish them, then load more.
            </p>
        </div>

        <div className='grid grid-cols-3 p-7 bg-[#000f19] rounded-2xl'>
            <div className='border-r border-r-zinc-700'>
                <p>Exercises</p>
                <span className='text-4xl font-bold'> {plan.length} </span>
            </div>
            <div className='border-r border-r-zinc-700 pl-5'>
                <p>Minutes</p>
                <span className='text-4xl font-bold'> {totalMinutes} </span>
            </div>
            <div className='pl-5'>
                <p>Calories</p>
                <span className='text-4xl font-bold '> {totalCalories} </span>
            </div>
        </div>



    <div className="mt-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

{/* tab toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("plan")}
            className={`rounded-full px-5 py-2 text-sm font-bold ${
              activeTab === "plan"
                ? "bg-lime-400 text-black"
                : "bg-zinc-900 text-zinc-400"
            }`}
          >
            Today&apos;s Plan ({plan.length})
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`rounded-full px-5 py-2 text-sm font-bold ${
              activeTab === "saved"
                ? "bg-lime-400 text-black"
                : "bg-zinc-900 text-zinc-400"
            }`}
          >
            Saved ({saved.length})
          </button>
        </div>

{/* search & sort */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="flex items-center gap-2 rounded-md border border-zinc-700 px-3">
            <FiSearch className="text-zinc-500" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name or tag"
              className="h-11 w-full bg-transparent text-sm outline-none sm:w-60"
            />
          </label>

          <select value={sortBy} className="h-11 rounded-md border border-zinc-700 bg-black px-4 text-sm"
                onChange={(event) =>
                    setSortBy(event.target.value as SortType)
                }>
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>
        </div>

    </div>

{/* no-cards/plan/saved cards */}
      {visibleWorkouts.length > 0 ? (
        <div className="mt-7 space-y-4">
          {visibleWorkouts.map((workout) => {
            const completeD = completed.includes(workout.id);

            return (
                <PlanCards key={workout.id}
                            workout={workout}
                            activeTab={activeTab}
                            completed={completeD}
                            onDone={handleDone}
                            onRemove={handleRemove}> 
                </PlanCards>
            );
          })}
        </div>
      ) : (
        <div className="flex min-h-80 flex-col items-center justify-center text-cente 
                        border border-zinc-800 rounded-2xl mt-5 bg-[#000a18]">

            <h2 className="display-title mt-5 text-3xl font-black uppercase">
                {hasSearch ? "No matches" : "Nothing here yet"}
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
                {hasSearch
                ? "Try another workout name or muscle group."
                : "Browse the library and add a lift to get today moving."}
            </p>

            {!hasSearch && (
                <Link href="/#library"
                      className="mt-5 flex items-center gap-2 rounded-md bg-lime-400 px-5 py-3 text-xs font-black uppercase text-black"
                    > Go to workouts <FiArrowRight />
                </Link>
            )}
        </div>
      )}
    </section>
  );
};


export default MyPlanPage;