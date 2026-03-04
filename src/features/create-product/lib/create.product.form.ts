import z from "zod";

export const createProductSchema = z
    .object({
        title: z.string({ message: 'Имя обязательно' }),
        brand: z.string({ message: 'Вендор обязателен' }),
        price: z.number({ message: 'Стоимость обязательна' }),
        sku: z.string({ message: 'Артикул обязателен'}),
        category: z.string({ message: 'Категория обязательна'}),
        
    })
export type CreateProductFormData = z.infer<typeof createProductSchema>;