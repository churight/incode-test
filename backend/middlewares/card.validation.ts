import {z} from 'zod';

export const createCardSchema = z.object({
  body: z.object({
    boardId: z.string().min(1, "boardId is required"),
    columnId: z.string().min(1, "columnId is required"),
    title: z.string().min(1, "card title is required"),
    description: z.string().optional()
  })
});


export const updateCardSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Card title is required').optional(),
    description: z.string().optional()
  })
});

