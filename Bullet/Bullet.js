/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Bullet extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("pew", "./Bullet/costumes/pew.png", { x: 4, y: 1 })
    ];

    this.sounds = [new Sound("shoot", "./Bullet/sounds/shoot.wav")];

    this.triggers = [
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "refresh" },
        this.whenIReceiveRefresh
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "rewind" },
        this.whenIReceiveRewind
      ),
      new Trigger(Trigger.BROADCAST, { name: "end" }, this.whenIReceiveEnd)
    ];

    this.vars.xv = 0;
    this.vars.yv = 0;
  }

  *startAsClone() {
    yield* this.startSound("shoot");
    /* TODO: Implement looks_gotofrontback */ null;
    this.rotationStyle = Sprite.RotationStyle.ALL_AROUND;
    this.goto(this.sprites["Player"].x, this.sprites["Player"].y);
    this.direction = this.radToScratch(
      Math.atan2(this.mouse.y - this.y, this.mouse.x - this.x)
    );
    this.x += Math.sin(this.scratchToRad(this.direction)) * 5;
    this.y += Math.cos(this.scratchToRad(this.direction)) * 5;
    this.visible = true;
    this.effects.clear();
    this.effects.brightness = 100;
    while (true) {
      yield* this.travel(14);
      if (
        this.touching(this.sprites[undefined].andClones()) ||
        this.touching(this.sprites["Ground"].andClones())
      ) {
        this.deleteThisClone();
      }
      if (this.touching(this.sprites["Enemies"].andClones())) {
        yield* this.wait(0.05);
        this.deleteThisClone();
      }
      yield;
    }
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *travel(speed2) {
    for (let i = 0; i < speed2 * this.stage.vars.tps; i++) {
      this.x += Math.sin(this.scratchToRad(this.direction)) * 1;
      this.y += Math.cos(this.scratchToRad(this.direction)) * 1;
    }
  }

  *whenIReceiveRefresh() {
    this.deleteThisClone();
  }

  *whenIReceiveRewind() {
    this.deleteThisClone();
  }

  *whenIReceiveEnd() {
    /* TODO: Implement stop other scripts in sprite */ null;
    this.visible = false;
    this.deleteThisClone();
  }
}
