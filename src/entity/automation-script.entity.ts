import { Entity, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class AutomationScriptEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Unique(['name'])
    @Column()
    scriptName: string;

    @Column()
    scriptContent: string;

    @Column({nullable: true})
    scriptDescription: string;

    @Column({ default: true })
    isActive: boolean;

    @Column()
    scriptType: string;

    @Column()
    scriptExecutor: string;

    @Column()
    scriptRunningOs: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
