import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  AfterLoad,
} from "typeorm";
import { userRoles } from "../enum/user-roles.enum";
import { Doctor } from "../entity/Doctor";
import { Patient } from "../entity/Patient";
import { existsSync, unlink } from "fs";
import * as dotenv from "dotenv";

dotenv.config();
const { APP_URL } = process.env;


@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  private profileImageDirPath = "/profilePicture/";
  public profileImageUrl: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ type: "enum", enum: userRoles, default: userRoles.PATIENT })
  role: userRoles;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ nullable: true })
  profileImage?: string | null;

  @Column({ nullable: true })
  otpCode: number;

  @Column({ nullable: true })
  otpCodeValidTill: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Patient, (patient: Patient) => patient.user, {
    cascade: ["insert"], eager:true,
  })
  patient: Patient;

  @OneToOne(() => Doctor, (doctor: Doctor) => doctor.user, {
    cascade: ["insert"], eager:true,
  })
  doctor: Doctor;



  @AfterLoad()
  concatProfilePictureUrl() {
  if (this.profileImage) {
    this.profileImageUrl =
      APP_URL + this.profileImageDirPath + this.profileImage;
  }
}

  public unlinkProfileImage(): void {
    if (this.profileImage !== null) {
      const path = "./uploads" + this.profileImageDirPath + this.profileImage;

      if (!existsSync(path)) {
        console.log(path + " file not found");
        return;
      }

      unlink(path, (err) => {
        if (err) throw err;
        console.log(path + " was deleted");
      });
    }
  }
}





