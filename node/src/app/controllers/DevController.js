import api from '../../services/api';
import Dev from '../models/Dev';
import parseStringAsArray from '../../utils/parseStringAsArray';
import { findConnections, sendMessage, connections } from '../../webSocket';

class DevController {
  async index(req, res) {
    const devs = await Dev.find({});
    return res.json(devs);
  }

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (dev) {
      return res.json(dev);
    }

    const { data } = await api.get(`/users/${github_username}`);

    const { name = github_username, avatar_url, bio } = data;

    const techsArray = parseStringAsArray(techs);

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };

    dev = await Dev.create({
      github_username,
      name,
      avatar_url,
      bio,
      techs: techsArray,
      location,
    });

    // Filter connections that are maximum 10km of distance
    // and where new dev have one of techonolgy filtered

    const sendSocketMessageTo = findConnections(
      { latitude, longitude },
      techsArray
    );

    sendMessage(sendSocketMessageTo, 'new-dev', dev);

    return res.json(dev);
  }

  async edit(req, res) {
    const { id } = req.params;
    const { github_username, techs, latitude, longitude } = req.body;

    const dev = await Dev.findById(id);

    if (!dev) {
      return res.status(404).json({ error: { message: 'Dev not found' } });
    }

    if (github_username !== dev.github_username) {
      const { data } = await api.get(`/users/${dev.github_username}`);
      dev.name = data.name || github_username;
      dev.avatar_url = data.avatar_url;
      dev.bio = data.bio;
    }

    dev.techs = parseStringAsArray(techs);

    dev.location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };

    await dev.save();

    return res.json(dev);
  }

  async destroy(req, res) {
    const { id } = req.params;

    if (!(await Dev.findById(id))) {
      return res.status(404).json({ error: { message: 'Dev not found' } });
    }

    await Dev.findByIdAndDelete(id);

    sendMessage(connections, 'remove-dev', id);

    return res.json();
  }
}

export default new DevController();
