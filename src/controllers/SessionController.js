import * as Yup from 'yup';
import User from '../models/User';
// metodos: index, show, update, store, destroy
/*
    index: listagem de sessoes
    show: listar uma unica sessao
    store: criar uma nova sessao
    update: atualizar alguma sessao
    destroy: destruir alguma sessao
*/

class SessionController {
  async store(req, res) {
    const { email } = req.body;
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação, E-mail inválido' });
    }

    let user = await User.findOne({ email });// findOne, para verificar se o email já existe

    if (!user) {
      user = await User.create({ email });
    }

    return res.json(user);
  }
}

export default new SessionController();
