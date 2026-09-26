'use client'
import { AddResult, IWorkout, IWorkoutContextProp, SaveResult } from "@/types/workout";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";


const workoutContext = createContext<IWorkoutContextProp | null>(null);



const WorkoutProvider = ({children}: {children: ReactNode}) => {

  const [plan, setPlan] = useState<IWorkout[]>([]);
  const [saved, setSaved] = useState<IWorkout[]>([]);
  const [completed, setCompleted] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);



useEffect(() => {
  const loadStoredData = () => {
    try {
      const storedPlan = localStorage.getItem("fitlog-plan");
      const storedSaved = localStorage.getItem("fitlog-saved");
      const storedCompleted = localStorage.getItem(
        "fitlog-completed"
      );
      if (storedPlan) {
        setPlan(JSON.parse(storedPlan));
      }
      if (storedSaved) {
        setSaved(JSON.parse(storedSaved));
      }
      if (storedCompleted) {
        setCompleted(JSON.parse(storedCompleted));
      }
    } catch {
      console.error("Could not load saved workout data");
    } finally {
      setIsLoaded(true);
    }
  };
  const timer = window.setTimeout(loadStoredData, 0);
  return () => window.clearTimeout(timer);
}, []);



  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
    localStorage.setItem(
      "fitlog-completed",
      JSON.stringify(completed)
    );
  }, [plan, saved, completed, isLoaded]);



    const addToPlan = (workout: IWorkout): AddResult => {
    const alreadyAdded = plan.some(
      (item) => item.id === workout.id
    );

    if (alreadyAdded) return "duplicate";
    if (plan.length >= 5) return "full";

    setPlan((previous) => [...previous, workout]);
    return "added";
  };

  const saveForLater = (workout: IWorkout): SaveResult => {
    const alreadySaved = saved.some(
      (item) => item.id === workout.id
    );

    if (alreadySaved) return "duplicate";

    setSaved((previous) => [...previous, workout]);
    return "saved";
  };

  const removeFromPlan = (id: number) => {
    setPlan((previous) =>
      previous.filter((workout) => workout.id !== id)
    );

    setCompleted((previous) =>
      previous.filter((completedId) => completedId !== id)
    );
  };

  const removeFromSaved = (id: number) => {
    setSaved((previous) =>
      previous.filter((workout) => workout.id !== id)
    );
  };
  const markAsDone = (id: number) => {
    setCompleted((previous) => {
      if (previous.includes(id)) return previous;
      return [...previous, id];
    });
  };

    const sharedStates = {
        plan,
        saved,
        completed,
        isLoaded,
        addToPlan,
        saveForLater,
        removeFromPlan,
        removeFromSaved,
        markAsDone
    }

    return (
            <workoutContext.Provider value={sharedStates}>
                {children}
            </workoutContext.Provider>
    );
};

export const useWorkouts = () => {
  const context = useContext(workoutContext);
  if (!context) {
    throw new Error("useWorkouts must be used inside WorkoutProvider");
  }
  return context;
};

export default WorkoutProvider;