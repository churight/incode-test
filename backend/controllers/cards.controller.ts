import { Request, Response, NextFunction } from 'express';
import * as cardService from '../services/cards.service';

export const createCard = async (
    req: Request, res: Response, next: NextFunction
) =>{
    try{
        const card = await cardService.createCard(req.body.name);
        res.status(201).json(card)
    }catch(error){
        next(error)
    }
}

export const updateCard= async(
    req: Request, res:Response, next: NextFunction
)=>{
    try{
        const id = req.params.id as string;
        const card = await cardService.updateCard(id, req.body);
        res.json(card)
    }catch(error){
        next(error)
    }
}

export const deleteCard = async(
    req: Request, res:Response, next: NextFunction
)=>{
    try{
        const id = req.params.id as string;
        await cardService.DeleteCard(id);
        res.status(204).send()
    }catch(error){
        next(error)
    }
}

export const moveCard = async(
    req: Request, res:Response, next: NextFunction
)=>{
    try{
        const id = req.params.id as string;
        const {columnId, position} = req.body;
        const card = await cardService.MoveCard(id, columnId, position);
        res.json(card)
    }catch(error){
        next(error)
    }
}