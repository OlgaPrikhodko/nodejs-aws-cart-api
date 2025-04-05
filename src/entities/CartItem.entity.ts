import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cart_items')
export class CartItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  productId: string;

  @Column()
  count: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
}
