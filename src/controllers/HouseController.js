import * as Yup from 'yup';
import User from '../models/User';
import House from '../models/House';

class HouseController {
  async index(req, res) {
    const { status } = req.params;
    const houses = await House.find({ status });

    return res.json(houses);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      price: Yup.number().required(),
      location: Yup.string().required(),
      status: Yup.boolean().required(),
    });

    const { user_id } = req.headers;
    const { filename } = req.file;
    const {
      description,
      price,
      location,
      status,
    } = req.body;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação dos campos' });
    }

    const house = await House.create({
      user: user_id,
      thumbnail: filename,
      description,
      price,
      location,
      status,
    });

    return res.json(house);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      price: Yup.number().required(),
      location: Yup.string().required(),
      status: Yup.boolean().required(),
    });

    const { house_id } = req.params;
    const { user_id } = req.headers;
    const { filename } = req.file;
    const {
      description,
      price,
      location,
      status,
    } = req.body;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação dos campos' });
    }

    const user = await User.findById(user_id);
    const house = await House.findById(house_id);

    if (String(user._id) !== String(house.user)) {
      return res.status(401).json({ error: 'Não Autorizado.' });
    }

    await House.updateOne({ _id: house_id }, {
      user: user_id,
      thumbnail: filename,
      description,
      price,
      location,
      status,
    });

    return res.send();
  }

  async destroy(req, res) {
    const { house_id } = req.body;
    const { user_id } = req.headers;
    const user = await User.findById(user_id);
    const house = await House.findById(house_id);

    if (String(user._id) !== String(house.user)) {
      return res.status(401).json({ error: 'Não Autorizado.' });
    }

    await House.findByIdAndDelete({ _id: house_id });

    return res.send();
  }
}

export default new HouseController();
