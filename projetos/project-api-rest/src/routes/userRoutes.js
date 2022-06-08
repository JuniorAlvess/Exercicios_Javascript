import { Router } from 'express';
import UserController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// Não deveriam existir
// router.get('/', loginRequired, UserController.index);
// router.get('/:id', UserController.show);

router.post('/', UserController.store);
router.put('/', loginRequired, UserController.update);
router.delete('/', loginRequired, UserController.delete);
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
