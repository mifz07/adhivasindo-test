import { Exclude } from "class-transformer";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Content {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column({
    type: 'varchar',
    length: 150,
    nullable: false
  })
  title: string

  @Column({
    type: 'text',
    nullable: false
  })
  body: string

  @Column({
    type: 'text',
    nullable: true
  })
  image: string

  @Column({
    type: 'boolean',
    nullable: false, 
    default: true
  })
  status: boolean

  @ManyToOne(() => User, (user) => user.contents)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Exclude()
  @CreateDateColumn()
  created_at: Date

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date
}
