import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('carts')
export class CartEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('jsonb')
  items: any[];

  @Column({ nullable: true })
  userId: string;
}
