import { Repository } from "typeorm";
import { Doctor } from "../entity/Doctor";
import Encrypt from "../helpers/encrypt.helper";

export class DoctorService {
  constructor(private doctorRepository: Repository<Doctor>) {}

  async findAll(): Promise<Doctor[]> {
    return this.doctorRepository.find();
  }

  async findById(id: number): Promise<Doctor | null> {
    return this.doctorRepository.findOne({ 
       where:  {id},
       relations: ["user"],
    });
  }

  async createDoctor(doctor: Doctor): Promise<Doctor> {
    const payload = {
      ...doctor,
      password: await Encrypt.hashPassword(doctor.user.password),
    };

    const newDoctor = this.doctorRepository.create(payload);
    await this.doctorRepository.save(newDoctor);
    return newDoctor;
  }

  async updateUser(id: number, userData: Partial<Doctor>): Promise<Doctor | null> {
    const user = await this.doctorRepository.findOneBy({id});
    if (!user) return null;

    this.doctorRepository.merge(user, userData);
    await this.doctorRepository.save(user);
    return user;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.doctorRepository.delete({ id });
    return result.affected !== 0;
  }
}