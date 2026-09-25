import { IWorkout } from '@/types/workout';
import Image from 'next/image';
import { AiFillFire } from 'react-icons/ai';
import { FaRegClock } from 'react-icons/fa6';
import { IoMdStarOutline } from 'react-icons/io';

const WorkoutCard = ({workout}: {workout: IWorkout}) => {
    return (
        <div className='rounded-2xl'>

            <div className="card bg-base-100 w-96 shadow-sm rounded-2xl">
                <figure className="relative h-52 overflow-hidden bg-zinc-800 ">
                    <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    className="h-full w-full object-cover"/>
                </figure>
                <div className='my-6 mb-6 flex gap-3'>
                    {
                        workout.muscleGroups.map((mgrp: string) => (
                            <span key={mgrp}
                                  className='badge h-5 rounded-2xl py-3 px-4 border-0 bg-lime-400 text-sm font-medium text-zinc-950'>
                                {mgrp}
                            </span>
                        ))
                    }
                </div>
                <div className="card-body p-0">
                    <h2 className="card-title font-extrabold text-2xl uppercase">
                        {workout.name}
                    </h2>
                    <p className=' text-zinc-400 text-[15px]'> {workout.equipment} </p>

                    <div className="divider"></div>

                    <div className='flex gap-5 text-zinc-400'>
                        <div className="flex gap-2">
                            <span className='flex items-center'> <FaRegClock/> </span>
                            <span>{workout.duration} min</span>
                        </div>
                        <div className="flex gap-1">
                            <span className='flex items-center text-[20px]'> <AiFillFire/></span>
                            <span>{workout.caloriesBurned} kcal</span>
                        </div>
                        <div className="flex gap-1">
                            <span className='flex items-center text-[20px]'><IoMdStarOutline/></span>
                            <span>{workout.rating}</span>
                        </div> 
                    </div>

                </div>

            </div>

        </div>
    );
};

export default WorkoutCard;