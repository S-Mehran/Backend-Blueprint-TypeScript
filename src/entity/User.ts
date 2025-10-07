//Linting: When code is pushed to production, it checks source code for programming or stylistic errors
//e.g. console log, unused variables/code
//after adding a new column, use alter table and create a new migration
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

enum userRoles {
  ADMIN = "admin",
  PATIENT = "patient",
  DOCTOR = "doctor",
}

@Entity({ name: "users" })
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

//for patient, we take age and not date of birth
//because prescriptions are dependant on age so calculations are not required