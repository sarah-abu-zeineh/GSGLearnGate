export type CoMonitorAppointment = {
  id: number;
  date: Date;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  course?: {
    id: number;
    title: string;
  };
  student?: {
    id: number;
    userId: number;
    firstName?: string;
    lastName?: string;
  };
};
