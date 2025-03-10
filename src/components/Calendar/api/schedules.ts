import { ApiEventsType } from "../types/api";

export const getAllSchedules = async (userId:string) =>{
    try{
        const response = await fetch(`http://localhost:3000/schedules/${userId}`,{
            method:'GET'
        });
        const data = await response.json();
        return data;
    }catch(e){
        console.log(e)
    }
}

export const getSchedule = async (id: string) =>{
    try{
        const response = await fetch(`http://localhost:3000/schedules/${id}`);
        const data = await response.json();
        return data;
    }catch(e){
        console.log(e)
    }
}

export const createSchedule = async (schedule: ApiEventsType) =>{
    try{
        const response = await fetch('http://localhost:3000/schedules', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(schedule)
        });
        const data = await response.json();
        const formatData = {
            id: data.id,
            title: data.title,
            start: new Date(data.start_date),
            end: new Date(data.end_date)
        }
        return formatData;
    }catch(e){
        console.log(e)
    }   
}

export const deleteSchedule = async (id: string) =>{
    try{
        const response = await fetch(`http://localhost:3000/schedules/${id}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        return data;
    }catch(e){
        console.log(e)
    }
}

export const updateSchedule = async (id: string, schedule:ApiEventsType) =>{
    try{
        const response = await fetch(`http://localhost:3000/schedules/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(schedule)
        });
        const data = await response.json();
        return data;
    }catch(e){
        console.log(e)
    }
}
