-- Insert sample carts
INSERT INTO carts (id, user_id, status) VALUES
    ('a68a8917-c008-4c8c-a0e4-7550891c21c0', '1e96195b-5bf3-46c8-9d74-7d8f6a629a3f', 'OPEN'),
    ('b68a8917-c008-4c8c-a0e4-7550891c21c1', '2e96195b-5bf3-46c8-9d74-7d8f6a629a3f', 'ORDERED'),
    ('c68a8917-c008-4c8c-a0e4-7550891c21c2', '3e96195b-5bf3-46c8-9d74-7d8f6a629a3f', 'OPEN');

-- Insert sample cart items
INSERT INTO cart_items (cart_id, product_id, count) VALUES
    ('a68a8917-c008-4c8c-a0e4-7550891c21c0', '4e96195b-5bf3-46c8-9d74-7d8f6a629a3f', 2),
    ('a68a8917-c008-4c8c-a0e4-7550891c21c0', '5e96195b-5bf3-46c8-9d74-7d8f6a629a3f', 1),
    ('b68a8917-c008-4c8c-a0e4-7550891c21c1', '6e96195b-5bf3-46c8-9d74-7d8f6a629a3f', 3),
    ('c68a8917-c008-4c8c-a0e4-7550891c21c2', '7e96195b-5bf3-46c8-9d74-7d8f6a629a3f', 1);
