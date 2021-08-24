/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Effects extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("vhs", "./Effects/costumes/vhs.png", { x: 480, y: 360 }),
      new Costume("vhs2", "./Effects/costumes/vhs2.png", { x: 480, y: 360 }),
      new Costume("vhs3", "./Effects/costumes/vhs3.png", { x: 480, y: 360 }),
      new Costume("vhs4", "./Effects/costumes/vhs4.png", { x: 480, y: 360 }),
      new Costume("vhs5", "./Effects/costumes/vhs5.png", { x: 480, y: 360 }),
      new Costume("vhs6", "./Effects/costumes/vhs6.png", { x: 480, y: 360 }),
      new Costume("vhs7", "./Effects/costumes/vhs7.png", { x: 480, y: 360 }),
      new Costume("vhs8", "./Effects/costumes/vhs8.png", { x: 480, y: 360 }),
      new Costume("vhs10", "./Effects/costumes/vhs10.png", { x: 480, y: 360 }),
      new Costume("vhs9", "./Effects/costumes/vhs9.png", { x: 480, y: 360 }),
      new Costume("vhs11", "./Effects/costumes/vhs11.png", { x: 480, y: 360 }),
      new Costume("vhs12", "./Effects/costumes/vhs12.png", { x: 480, y: 360 }),
      new Costume("effect", "./Effects/costumes/effect.png", {
        x: 480,
        y: 360
      }),
      new Costume("shade", "./Effects/costumes/shade.png", { x: 480, y: 360 }),
      new Costume("thumbnail", "./Effects/costumes/thumbnail.png", {
        x: 480,
        y: 360
      })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "rewind" },
        this.whenIReceiveRewind
      ),
      new Trigger(Trigger.BROADCAST, { name: "play" }, this.whenIReceivePlay),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "transition" },
        this.whenIReceiveTransition
      ),
      new Trigger(Trigger.BROADCAST, { name: "end" }, this.whenIReceiveEnd)
    ];

    this.vars.isAClone = "n";
  }

  *whenGreenFlagClicked() {
    this.goto(0, 0);
    this.visible = false;
    while (true) {
      /* TODO: Implement looks_gotofrontback */ null;
      /* TODO: Implement looks_goforwardbackwardlayers */ null;
      yield;
    }
  }

  *whenIReceiveRewind() {
    if (this.vars.isAClone == "n") {
      this.size = 100;
      this.effects.clear();
      this.visible = true;
      this.costume = "vhs";
      this.effects.ghost = 60;
      for (let i = 0; i < 50; i++) {
        this.costumeNumber += 1;
        if (this.costumeNumber > 12) {
          this.costume = "vhs";
        }
        yield;
      }
      this.effects.ghost = 100;
    }
  }

  *whenIReceivePlay() {
    yield* this.wait(0);
    this.vars.isAClone = "y";
    this.costume = "effect";
    this.createClone();
    this.costume = "shade";
    this.createClone();
    this.vars.isAClone = "n";
  }

  *startAsClone() {
    /* TODO: Implement looks_gotofrontback */ null;
    this.goto(0, 0);
    this.visible = true;
    if (this.costume.name == "effect") {
      this.effects.clear();
      this.size = 150;
      this.effects.ghost = 80;
      this.effects.brightness = 50;
      while (true) {
        for (let i = 0; i < 4; i++) {
          this.y += -0.5;
          yield;
        }
        this.y += 2;
        yield;
      }
    }
    if (this.costume.name == "shade") {
      this.effects.clear();
      this.size = 100;
      this.effects.ghost = 35;
    }
  }

  *whenIReceiveTransition() {
    if (this.vars.isAClone == "n") {
      this.costume = "vhs";
      this.effects.brightness = -100;
      this.effects.ghost = 100;
      this.visible = true;
      yield* this.wait(0.6);
      for (let i = 0; i < 10; i++) {
        this.effects.ghost += -10;
        yield;
      }
      yield* this.wait(0.5);
      for (let i = 0; i < 10; i++) {
        this.effects.ghost += 10;
        yield;
      }
      this.visible = false;
    }
  }

  *whenIReceiveEnd() {
    /* TODO: Implement stop other scripts in sprite */ null;
    this.visible = false;
    this.deleteThisClone();
  }

  *whengreaterthan() {
    this.visible = false;
    this.costume = "effect";
    this.createClone();
    this.costume = "shade";
    this.createClone();
    this.vars.isAClone = "n";
    this.costume = "thumbnail";
    this.visible = true;
    while (true) {
      this.restartTimer();
      yield;
    }
  }
}
