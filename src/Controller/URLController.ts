import { Request, Response } from "express";
import URL from "../Model/URL";
import ValidURL from "../Utils/ValidURL";
import randomstring from "randomstring";

class URLController {

  static async generateHash() {
    const hash = randomstring.generate(5 + Math.random() * 6); // gera hash de 6 a 10 chars
    const current = await URL.findOne({ where: { hash }}); // procura url com hash
    if(current && current.isExpired()) { // Se existe hash e está expirado
      current.destroy(); // deleta a url do banco
      return hash; // e retorna a mesma hash (vamos reciclar!)
    } 
    if(!current) return hash; // hash é nova, vamos usar!
    return URLController.generateHash(); // hash existe, nao expirada, vamos tentar outra!
  }

  public async encurtar(req: Request, res: Response) {
    const { url } = req.body;
    if (!ValidURL(url)) return res.status(400).send("valid `url` is required");
    const hostUri = `${req.protocol}://${req.get("host")}`;
    const hash = await URLController.generateHash();
    await URL.create({ url, hash });
    res.json({ newUrl: `${hostUri}/${hash}` });
  }

  public async redirecionar(req: Request, res: Response) {
    const { hash } = req.params;
    const url = await URL.findOne({ where: { hash } });
    if (!url) return res.sendStatus(404);
    res.redirect(url.url);
  }
}

const urlCtrl: URLController = new URLController();

export default urlCtrl;
