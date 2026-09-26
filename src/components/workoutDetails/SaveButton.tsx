"use client";

import { LuBookmark } from "react-icons/lu";
import { toast } from "react-toastify";
import { IWorkout } from "@/types/workout";
import { useWorkouts } from "@/contexts/WorkoutContext";

const SaveButton = ({ workout }: { workout: IWorkout }) => {
  const { saved, saveForLater } = useWorkouts();

  const alreadySaved = saved.some((item) => item.id === workout.id);


  const handleSave = () => {
    const result = saveForLater(workout);
    if (result === "saved") {
      toast.success("Workout saved for later");
    }
    if (result === "duplicate") {
      toast.info("This workout is already saved");
    }
  };

  
  return (
    <button
      onClick={handleSave}
      disabled={alreadySaved}
      className="flex items-center justify-center gap-2 rounded-md border border-zinc-600 px-6 py-3 font-bold hover:bg-zinc-800 disabled:cursor-not-allowed disabled:text-zinc-500"
    >
      <LuBookmark size={20} />
      {alreadySaved ? "Already saved" : "Save for later"}
    </button>
  );
};

export default SaveButton;