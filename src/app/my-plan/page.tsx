'use client'
import Link from "next/link";
import { FiArrowRight, FiSearch } from "react-icons/fi";

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

        {/* Responsive: metrics stack on phones and use three columns from tablet size. */}
        <div className='mt-7 grid grid-cols-1 rounded-2xl bg-[#000f19] p-5 sm:grid-cols-3 sm:p-7'>
            <div className='border-b border-zinc-700 pb-5 sm:border-b-0 sm:border-r sm:pb-0'>
                <p>Exercises</p>
                <span className='text-3xl font-bold sm:text-4xl'> {plan.length} </span>
            </div>
            <div className='border-b border-zinc-700 py-5 sm:border-b-0 sm:border-r sm:py-0 sm:pl-5'>
                <p>Minutes</p>
                <span className='text-3xl font-bold sm:text-4xl'> {totalMinutes} </span>
            </div>
            <div className='pt-5 sm:pl-5 sm:pt-0'>
                <p>Calories</p>
                <span className='text-3xl font-bold sm:text-4xl'> {totalCalories} </span>
            </div>
        </div>



    <div className="mt-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

{/* tab toggle */}
        {/* Responsive: tabs divide the available phone width. */}
        <div className="flex w-full gap-2 sm:w-auto">
          <button
            onClick={() => setActiveTab("plan")}
            className={`flex-1 rounded-full px-3 py-2 text-xs font-bold sm:flex-none sm:px-5 sm:text-sm ${
              activeTab === "plan"
                ? "bg-lime-400 text-black"
                : "bg-zinc-900 text-zinc-400"
            }`}
          >
            Today&apos;s Plan ({plan.length})
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`flex-1 rounded-full px-3 py-2 text-xs font-bold sm:flex-none sm:px-5 sm:text-sm ${
              activeTab === "saved"
                ? "bg-lime-400 text-black"
                : "bg-zinc-900 text-zinc-400"
            }`}
          >
            Saved ({saved.length})
          </button>
        </div>

{/* search & sort */}
        {/* Responsive: search and sorting fill the phone width. */}
        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <label className="flex w-full items-center gap-2 rounded-md border border-zinc-700 px-3 sm:w-auto">
            <FiSearch className="text-zinc-500" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name or tag"
              className="h-11 min-w-0 flex-1 bg-transparent text-sm outline-none sm:w-60"
            />
          </label>

          <select value={sortBy} className="h-11 w-full rounded-md border border-zinc-700 bg-black px-4 text-sm sm:w-auto"
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
        <div className="mt-5 flex min-h-80 flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-[#000a18] px-5 py-10 text-center">

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
