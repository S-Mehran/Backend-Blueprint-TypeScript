import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { UserService } from "../service/user.service";
import { PatientService } from "../service/patient.service";
import { DoctorService } from "../service/doctor.service";
import { Doctor } from "../entity/Doctor";
import { Patient } from "../entity/Patient";
import { AppointnmentService } from "../service/appointment.service";
import { Appointment } from "../entity/Appointment";

export const userRepository = new UserService(
  AppDataSource.getRepository(User)
);

export const doctorRepository = new DoctorService(
  AppDataSource.getRepository(Doctor)
)

export const patientRepository = new PatientService(
  AppDataSource.getRepository(Patient)
)


export const appointmentRepository = new AppointnmentService(
  AppDataSource.getRepository(Appointment)
)
// const dataSource = AppDataSource.getRepository(User)

// export const userRepository = new UserService(dataSource)

//There's only one file even if number of data source files are many(one file per data source)
//With this one file, we create a connection between service and data sources
//It helps remain scalable as we don't have to change service if a new data source is added
//or older one is modified