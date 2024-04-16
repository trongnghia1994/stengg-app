import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SampleEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  postId: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ length: 8000 })
  body: string;
}
