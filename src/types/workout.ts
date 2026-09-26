export type IWorkout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
};

export type AddResult = "added" | "duplicate" | "full";
export type SaveResult = "saved" | "duplicate";

export interface IWorkoutContextProp {
  plan: IWorkout[];
  saved: IWorkout[];
  completed: number[];
  isLoaded: boolean;
  addToPlan: (workout: IWorkout) => AddResult;
  saveForLater: (workout: IWorkout) => SaveResult;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markAsDone: (id: number) => void;
}