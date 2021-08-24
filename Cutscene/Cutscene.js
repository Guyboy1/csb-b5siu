/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Cutscene extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Cutscene/costumes/costume1.png", {
        x: 453,
        y: 337
      }),
      new Costume("c1", "./Cutscene/costumes/c1.png", { x: 453, y: 333 }),
      new Costume("c2", "./Cutscene/costumes/c2.png", { x: 131, y: 337 }),
      new Costume("c3", "./Cutscene/costumes/c3.png", { x: 451, y: 27 }),
      new Costume("c4", "./Cutscene/costumes/c4.png", { x: -159, y: 335 }),
      new Costume("costume2", "./Cutscene/costumes/costume2.png", {
        x: 453,
        y: 337
      }),
      new Costume("c5", "./Cutscene/costumes/c5.png", { x: 453, y: 337 }),
      new Costume("c6", "./Cutscene/costumes/c6.png", { x: -1, y: 337 }),
      new Costume("c7", "./Cutscene/costumes/c7.png", { x: 453, y: -11 }),
      new Costume("costume3", "./Cutscene/costumes/costume3.png", {
        x: 453,
        y: 333
      }),
      new Costume("c8", "./Cutscene/costumes/c8.png", { x: 453, y: 333 }),
      new Costume("c9", "./Cutscene/costumes/c9.png", { x: -17, y: 333 }),
      new Costume("costume4", "./Cutscene/costumes/costume4.png", {
        x: 455,
        y: 339
      }),
      new Costume("c10", "./Cutscene/costumes/c10.png", { x: 455, y: 339 }),
      new Costume("c11", "./Cutscene/costumes/c11.png", { x: -15, y: 339 }),
      new Costume("c12", "./Cutscene/costumes/c12.png", { x: 455, y: -9 }),
      new Costume("c13", "./Cutscene/costumes/c13.png", { x: -17, y: -9 }),
      new Costume("bullet", "./Cutscene/costumes/bullet.png", { x: 3, y: 6 }),
      new Costume("timeguyman", "./Cutscene/costumes/timeguyman.png", {
        x: 177,
        y: 24
      }),
      new Costume("timeguyman2", "./Cutscene/costumes/timeguyman2.png", {
        x: 177,
        y: 24
      }),
      new Costume("tap or...", "./Cutscene/costumes/tap or....png", {
        x: 213,
        y: 23
      }),
      new Costume("tcredits", "./Cutscene/costumes/tcredits.png", {
        x: 180,
        y: 17
      }),
      new Costume("tyeet", "./Cutscene/costumes/tyeet.png", { x: 205, y: 15 }),
      new Costume("thx", "./Cutscene/costumes/thx.png", { x: 139, y: 17 })
    ];

    this.sounds = [
      new Sound("theme", "./Cutscene/sounds/theme.wav"),
      new Sound("tape stop", "./Cutscene/sounds/tape stop.wav"),
      new Sound("mr time guy man", "./Cutscene/sounds/mr time guy man.wav"),
      new Sound("so sleepy", "./Cutscene/sounds/so sleepy.wav"),
      new Sound("so sleepy2", "./Cutscene/sounds/so sleepy2.wav")
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "cutscene" },
        this.whenIReceiveCutscene
      ),
      new Trigger(Trigger.BROADCAST, { name: "play" }, this.whenIReceivePlay),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "delete scenes" },
        this.whenIReceiveDeleteScenes
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "end cut scene" },
        this.whenIReceiveEndCutScene
      )
    ];

    this.vars.forTheComicThingy = 1;
    this.vars.alreadySeenCutscene = "y";
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenIReceiveCutscene() {
    this.vars.forTheComicThingy = 1;
    this.visible = false;
    yield* this.startSound("so sleepy");
    yield* this.wait(1);
    for (let i = 0; i < 4; i++) {
      this.costume = "" + "c" + this.vars.forTheComicThingy;
      this.createClone();
      this.vars.forTheComicThingy += 1;
      yield* this.wait(3);
      yield;
    }
    this.broadcast("delete scenes");
    yield* this.wait(1);
    for (let i = 0; i < 3; i++) {
      this.costume = "" + "c" + this.vars.forTheComicThingy;
      this.createClone();
      this.vars.forTheComicThingy += 1;
      yield* this.wait(3);
      yield;
    }
    this.broadcast("delete scenes");
    yield* this.wait(0.5);
    this.stopAllSounds();
    yield* this.startSound("theme");
    this.costume = "timeguyman";
    this.createClone();
    yield* this.wait(2);
    this.costume = "tap or...";
    this.createClone();
    while (!(this.mouse.down || this.keyPressed("space"))) {
      yield;
    }
    while (!(!this.mouse.down || !this.keyPressed("space"))) {
      yield;
    }
    this.broadcast("delete scenes");
    yield* this.wait(1);
    this.stopAllSounds();
    yield* this.startSound("tape stop");
    yield* this.wait(0.1);
    yield* this.startSound("so sleepy2");
    for (let i = 0; i < 2; i++) {
      this.costume = "" + "c" + this.vars.forTheComicThingy;
      this.createClone();
      this.vars.forTheComicThingy += 1;
      yield* this.wait(4);
      yield;
    }
    this.broadcast("delete scenes");
    yield* this.wait(0.5);
    this.stopAllSounds();
    yield* this.startSound("theme");
    this.costume = "timeguyman2";
    this.createClone();
    yield* this.wait(2);
    this.costume = "tap or...";
    this.createClone();
    while (!(this.mouse.down || this.keyPressed("space"))) {
      yield;
    }
    while (!(!this.mouse.down || !this.keyPressed("space"))) {
      yield;
    }
    this.broadcast("delete scenes");
    this.stopAllSounds();
    yield* this.wait(1);
    this.broadcast("transition");
    yield* this.wait(1);
    this.broadcast("play");
  }

  *whenIReceivePlay() {
    this.vars.alreadySeenCutscene = "y";
    while (true) {
      yield* this.howManyBullets(this.stage.vars.ammo);
      yield;
    }
  }

  *howManyBullets(ammo2) {
    this.goto(this.stage.vars.ammo * -7 + 7, -160);
    for (let i = 0; i < this.stage.vars.ammo; i++) {
      this.costume = "bullet";
      this.createClone();
      this.x += 2 * 7;
    }
  }

  *startAsClone() {
    this.effects.clear();
    this.size = 100;
    if (!(this.costume.name == "bullet")) {
      this.goto(0, 0);
    }
    this.visible = true;
    if (this.costume.name[1 - 1] == "c") {
      this.effects.ghost = 100;
      for (let i = 0; i < 10; i++) {
        this.effects.ghost += -10;
        yield;
      }
    }
    if (
      this.costume.name == "timeguyman" ||
      this.costume.name == "timeguyman2"
    ) {
      this.size = 25;
      for (let i = 0; i < 20; i++) {
        this.direction += 360 / 20;
        this.size += 10;
        yield;
      }
    }
    if (this.costume.name == "tcredits" || this.costume.name == "tyeet") {
      this.effects.brightness = 100;
      this.size = 10;
      for (let i = 0; i < 20; i++) {
        this.direction += 360 / 20;
        this.size += 8;
        yield;
      }
    }
    if (this.costume.name == "thx") {
      this.effects.brightness = 100;
      this.size = 10;
      for (let i = 0; i < 20; i++) {
        this.direction += 360 / 20;
        this.size += 10;
        yield;
      }
    }
    if (this.costume.name == "tap or...") {
      this.y += -100;
      this.effects.ghost = 100;
      while (true) {
        for (let i = 0; i < 10; i++) {
          this.effects.ghost += -10;
          yield;
        }
        yield* this.wait(0.5);
        for (let i = 0; i < 10; i++) {
          this.effects.ghost += 10;
          yield;
        }
        yield* this.wait(0.5);
        yield;
      }
    }
    if (this.costume.name == "bullet") {
      this.size = 250;
      yield* this.wait(0);
      this.deleteThisClone();
    }
  }

  *whenIReceiveDeleteScenes() {
    if (this.costume.name[1 - 1] == "c") {
      for (let i = 0; i < 10; i++) {
        this.effects.ghost += 10;
        yield;
      }
      this.deleteThisClone();
    }
    if (this.costume.name[1 - 1] == "t") {
      for (let i = 0; i < 10; i++) {
        this.effects.ghost += 10;
        yield;
      }
      this.deleteThisClone();
    }
  }

  *whenIReceiveEndCutScene() {
    this.stage.vars.ammo = 0;
    this.vars.forTheComicThingy = 10;
    this.visible = false;
    yield* this.startSound("so sleepy");
    yield* this.wait(1);
    for (let i = 0; i < 4; i++) {
      this.costume = "" + "c" + this.vars.forTheComicThingy;
      this.createClone();
      this.vars.forTheComicThingy += 1;
      yield* this.wait(5.5);
      yield;
    }
    yield* this.wait(1);
    this.broadcast("delete scenes");
    this.stopAllSounds();
    yield* this.startSound("theme");
    this.costume = "timeguyman2";
    this.createClone();
    yield* this.wait(3);
    this.broadcast("delete scenes");
    yield* this.wait(1);
    this.costume = "tcredits";
    this.createClone();
    yield* this.wait(3);
    this.broadcast("delete scenes");
    yield* this.wait(1);
    this.costume = "tyeet";
    this.createClone();
    yield* this.wait(3);
    this.broadcast("delete scenes");
    yield* this.wait(1);
    this.costume = "thx";
    this.createClone();
  }
}
