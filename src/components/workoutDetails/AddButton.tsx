"use client";

import { CiCalendarDate } from "react-icons/ci";
import { toast } from "react-toastify";
import { IWorkout } from "@/types/workout";
import { useWorkouts } from "@/contexts/WorkoutContext";


const AddButton = ({ workout }: { workout: IWorkout }) => {
  const { plan, addToPlan } = useWorkouts();

  const alreadyAdded = plan.some((item) => item.id === workout.id);
  const planIsFull = plan.length >= 5;


  const handleAdd = () => {
    const result = addToPlan(workout);
    if (result === "added") {
      toast.success("Added to today's plan");
    }
    if (result === "duplicate") {
      toast.info("This workout is already in your plan");
    }
    if (result === "full") {
      toast.error("Today's plan can only contain five workouts");
    }
  };

  const getButtonText = () => {
    if (alreadyAdded) return "Already added";
    if (planIsFull) return "Plan is full";
    return "Add to today's plan";
  };

  return (
    <button
      onClick={handleAdd}
      disabled={alreadyAdded || planIsFull}

      className="flex w-full items-center justify-center gap-2 rounded-md bg-lime-400 px-6 py-3 font-bold text-black sm:w-auto
                  disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400"
    >
      <CiCalendarDate size={20} />
      {getButtonText()}
    </button>
  );
};

export default AddButton;
