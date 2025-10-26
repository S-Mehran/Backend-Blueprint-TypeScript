import { Repository } from "typeorm";
import { Appointment } from "../entity/Appointment";
import Encrypt from "../helpers/encrypt.helper";

export class AppointnmentService {
    constructor(private appointmentRepository: Repository<Appointment>) {}

  
  async findById(id: number): Promise<Appointment|null> {
    const appointment = await this.appointmentRepository.findOne({
        where: {id},
        relations: ["patient.user", "doctor.user"],
    }
    )
    return appointment
  }
    async findAll(query): Promise<Appointment[]> {
    return this.appointmentRepository.find({
      where: { ...query },
      relations: ["patient.user", "doctor.user"],
    });
  }

 
    async createAppointment(appointment: Appointment): Promise<Appointment> { 
        const newAppointment = await this.appointmentRepository.create(appointment)
        await this.appointmentRepository.save(newAppointment)
        return newAppointment
    }

    async updateAppointment(id: number, appointment: Partial<Appointment>): Promise<Appointment|null> {
        const oldAppointment = await this.appointmentRepository.findOneBy({id})
        if (!oldAppointment) {
            return null
        }
        this.appointmentRepository.merge(oldAppointment, appointment)
        await this.appointmentRepository.save(oldAppointment)
        return oldAppointment
    }

    async delete(id: number): Promise<boolean> {
    const result = await this.appointmentRepository.delete({ id });
    return result.affected !== 0;
  }
}