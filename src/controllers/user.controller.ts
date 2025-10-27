import { Request, Response } from "express";
import { userRepository } from "../repository/index";
import { patientRepository } from "../repository/index";
import { doctorRepository } from "../repository/index";
import { Patient } from "../entity/Patient";
import { Doctor } from "../entity/Doctor";
import { userRoles } from "../enum/user-roles.enum";
import Encrypt from "../helpers/encrypt.helper";

export class UserController {
  static async getAllUsers(req: Request, res: Response) {
    const users = await userRepository.findAll();
    res.json(users);
  }

  static async getUserById(req: Request, res: Response) {
    const userId = Number(req.params.id)
    const user = await userRepository.findById(userId)
    if (!user) {
      res.status(404).json({message: "User not found"})
    }
    res.status(200).json({message: "User Found", details: user})
  }
  
  static async createUser(req: Request, res: Response) {
    
    const user = await userRepository.createUser(req.body);
    if (user.role===userRoles.PATIENT) {
      const {mobile, address} = req.body
      const newPatient = new Patient()
      newPatient.user = user
      newPatient.mobile = mobile
      newPatient.address = address
      await patientRepository.createPatient(newPatient)
    }

    if (user.role === userRoles.DOCTOR) {
      const {mobile, department, designation} = req.body
      const newDoctor = new Doctor();
      newDoctor.user = user;
      newDoctor.designation = designation;
      newDoctor.department = department;
      newDoctor.mobile = mobile;
      await doctorRepository.createDoctor(newDoctor);
    }
    res.status(201).json(user);
  }

  static async updateUser(req: Request, res: Response) {
    const userId = Number(req.params.id);
    if (req.body?.password) {
      req.body.password = await Encrypt.hashPassword(req.body.password);
    }

    const user = await userRepository.updateUser(userId, req.body);
    res.status(200).json(user);
  }

  static async deleteUser(req: Request, res: Response) {
    const userId = Number(req.params.id);
    const isDeleted = await userRepository.delete(userId);
    if (!isDeleted) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(null);
    }
  }

  static async updateProfilePicture(req: Request, res: Response) {
    const userId = Number(req.params.id)
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" })
    }
    const user = await userRepository.findById(userId)

    user.unlinkProfileImage()

    const updatedUser = await userRepository.updateUser(userId, {
      profileImage: req.file.filename
    })
    res.status(200).json(updatedUser)
  }

}

