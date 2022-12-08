import { body } from 'express-validator';

export const loginSchema = [
    body('email', 'Email is required').isString().isEmail(),
    body('password', 'password is required').isString().isLength({ min: 6 }),
];

export const updateProductSchema = [
    body('name', 'Product name is required').isString(),
    body('price', 'Price is required').isString(),
    body('description', 'Description is required').isString(),
    body('status', 'Status is required').isString(),
];
