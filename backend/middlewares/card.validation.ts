import {z} from 'zod';

export const createCardSchema = z.object({
    body: z.object({
        name: z.string().min(1, "card name is required")
    })
});

export const updateCardSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Card name is required')
  })
});
