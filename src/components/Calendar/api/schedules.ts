import { MyEventsType } from "../../../types/hooks";

export const getAllSchedules = async (userId: string) => {
  try {
    const response = await fetch(`http://localhost:3000/schedules/${userId}`, {
      mode: "cors",
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getSchedule = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3000/schedules/${id}`, {
      mode: "cors",
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const createSchedule = async (schedule: MyEventsType) => {
  const format = {
    title: schedule.title,
    allDay: schedule.allDay,
    start: schedule.start,
    end: schedule.end,
    user: {
      connect: {
        id: schedule.id,
      },
    },
  };
  try {
    const response = await fetch("http://localhost:3000/schedules", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(format),
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const deleteSchedule = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3000/schedules/${id}`, {
      mode: "cors",
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const updateSchedule = async (id: string, schedule: MyEventsType) => {
  try {
    const response = await fetch(`http://localhost:3000/schedules/${id}`, {
      mode: "cors",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(schedule),
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getUser = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};
