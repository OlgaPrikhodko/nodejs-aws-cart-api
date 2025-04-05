-- View all carts
SELECT * FROM carts;

-- View all cart items with their cart information
SELECT c.id as cart_id,
       c.user_id,
       c.status,
       ci.product_id,
       ci.count
FROM carts c
JOIN cart_items ci ON c.id = ci.cart_id;
