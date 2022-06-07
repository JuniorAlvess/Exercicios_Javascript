import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = new Router();

router.post('/', UserController.store);
router.get('/', UserController.index);
router.get('/:id', UserController.show);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);
/**
 * MÉTODOS DE UM ÚNICO CONTROLLER
 *
 * index -> lista todos os usuários -> GET
 * store/create -> cria um novo usuário -> PUT
 * delete -> apaga um usuário -. DELETE
 * show -> mostra um usuário -> GET
 * update -> atualiza um usuário -> PATCH(serve para alterar um único valor) ou PUT
 */

export default router;
