import { Exclude } from "class-transformer";
import { Role } from "src/common/enum/role.enum";
import { Content } from "src/content/entities/content.entity";
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity()
@Unique(['email', 'phone_number'])
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 150,
    nullable: false,
  })
  email: string

  @Column({
    type: 'varchar', 
    length: 50,
    nullable: false
  })
  phone_number: string

  @Exclude()
  @Column({
    type: 'text', 
    nullable: true
  })
  password: string

  @Column({
    type: 'varchar',
    length: 150,
    nullable: true
  })
  full_name: string

  @Column({
    type: 'enum',
    enum: Role,
    enumName: 'enum_role',
    nullable: false
  })
  role: Role

  @Column({
    type: 'boolean',
    nullable: false,
    default: true
  })
  is_active: boolean

  @Exclude()
  @Column({
    type: 'text', 
    nullable: true
  })
  refreshToken: string

  @Column({
    type: 'text',
    nullable: true
  })
  image: string

  @OneToMany(() => Content, (content) => content.user)
  contents: Content[]

  @Exclude()
  @CreateDateColumn()
  created_at: Date

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date
}
