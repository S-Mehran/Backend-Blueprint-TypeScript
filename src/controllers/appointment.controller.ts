import {Request, Response} from "express"
import { appointmentRepository, doctorRepository, patientRepository } from "../repository"
import { Mailer } from "../helpers/mailer.helper"


export class appointmentController {
    static async createAppointment(req: Request, res: Response) {
        const newAppointment = await appointmentRepository.createAppointment(req.body)
        if (!newAppointment) {
            return res.status(400).json({message: "Appointment was not created"})
        }
        let doctor = await doctorRepository.findById(req.body.doctorId)
        let to_doctor = doctor.user.email
        let subject = `Appointment Scheduled Successfully ${newAppointment.id}`
        let text_dr = `Dear ${doctor.user.lastName}, Your appointment is scheduled successfully at time ${newAppointment.dateTime}`
        Mailer(to_doctor, subject, text_dr)
        console.log("Doctor mail sent")
        let patient = await patientRepository.findById(req.body.patientId)
        let to_patient = patient.user.email
        let text_patient = `Dear ${patient.user.lastName}, Your Appointment is scheduled successfully at time ${newAppointment.dateTime} 
        with Dr. ${doctor.user.firstName} ${doctor.user.lastName} for ${doctor.designation}`
        Mailer(to_patient, subject, text_patient)
        console.log("Patient mail sent")
        return res.status(201).json({message: "Appointment created successfully", appointment: newAppointment})
    }

    static async updateAppointment(req: Request, res: Response) {
        const id = req.params.id
        const updatedAppointment = await appointmentRepository.updateAppointment(id,req.body)
        if (!updatedAppointment) {
            return res.status(400).json({message: "Appointment was not updated"})
        }
        return res.status(200).json({message: "Appointment updated successfully", appointment: updatedAppointment})

    }

    static async deleteAppointment(req: Request, res: Response) {
        const id = req.params.id
        const deletedAppointment = await appointmentRepository.delete(id)
        if (!deletedAppointment) {
            return res.status(400).json({message: "Appointment was not deleted"})
        }
        return res.status(200).json({message: "Appointment deleted successfully"})
    }
}