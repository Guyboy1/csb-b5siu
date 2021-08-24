import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Blank from "./Blank/Blank.js";
import Cutscene from "./Cutscene/Cutscene.js";
import Player from "./Player/Player.js";
import BulletEffects from "./BulletEffects/BulletEffects.js";
import Bullet from "./Bullet/Bullet.js";
import Ground from "./Ground/Ground.js";
import Text from "./Text/Text.js";
import Door from "./Door/Door.js";
import Lasers from "./Lasers/Lasers.js";
import Enemies from "./Enemies/Enemies.js";
import Rewind from "./Rewind/Rewind.js";
import Effects from "./Effects/Effects.js";
import EnemieBullets from "./EnemieBullets/EnemieBullets.js";

const stage = new Stage({ costumeNumber: 2 });

const sprites = {
  Blank: new Blank({
    x: 36,
    y: 28,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true
  }),
  Cutscene: new Cutscene({
    x: 35,
    y: -160,
    direction: 90,
    costumeNumber: 2,
    size: 100,
    visible: false
  }),
  Player: new Player({
    x: 119,
    y: -115.43750000000264,
    direction: 90.15384940856005,
    costumeNumber: 8,
    size: 350,
    visible: false
  }),
  BulletEffects: new BulletEffects({
    x: 43.28819456811623,
    y: 23.144235269790457,
    direction: -174.0511055101075,
    costumeNumber: 1,
    size: 296.9072164948454,
    visible: false
  }),
  Bullet: new Bullet({
    x: -240.1036413486,
    y: -183,
    direction: -174.0511055101075,
    costumeNumber: 1,
    size: 296.9072164948454,
    visible: false
  }),
  Ground: new Ground({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 3,
    size: 100,
    visible: false
  }),
  Text: new Text({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 3,
    size: 100,
    visible: false
  }),
  Door: new Door({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 3,
    size: 100,
    visible: false
  }),
  Lasers: new Lasers({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false
  }),
  Enemies: new Enemies({
    x: 0,
    y: -115,
    direction: -90,
    costumeNumber: 2,
    size: 100,
    visible: false
  }),
  Rewind: new Rewind({
    x: -190,
    y: 145,
    direction: 90,
    costumeNumber: 1,
    size: 175,
    visible: false
  }),
  Effects: new Effects({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 15,
    size: 100,
    visible: true
  }),
  EnemieBullets: new EnemieBullets({
    x: 75.54411183565817,
    y: 9.565780621331587,
    direction: -174.0511055101075,
    costumeNumber: 1,
    size: 296.9072164948454,
    visible: false
  })
};

const project = new Project(stage, sprites);
export default project;
