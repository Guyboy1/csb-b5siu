/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class EnemieBullets extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("pew2", "./EnemieBullets/costumes/pew2.png", { x: 4, y: 1 }),
      new Costume("hit", "./EnemieBullets/costumes/hit.png", { x: 2, y: 1 })
    ];

    this.sounds = [new Sound("shoot2", "./EnemieBullets/sounds/shoot2.wav")];

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
      new Trigger(Trigger.BROADCAST, { name: "end" }, this.whenIReceiveEnd),
      new Trigger(Trigger.BROADCAST, { name: "ded" }, this.whenIReceiveDed)
    ];

    this.vars.xv2 = 0;
    this.vars.yv3 = 0;
  }

  *startAsClone() {
    yield* this.startSound("shoot2");
    /* TODO: Implement looks_gotofrontback */ null;
    this.rotationStyle = Sprite.RotationStyle.ALL_AROUND;
    this.goto(
      this.stage.vars.x[this.stage.vars.count - 1],
      this.stage.vars.y[this.stage.vars.count - 1]
    );
    this.direction = this.stage.vars.dir[this.stage.vars.count - 1];
    this.x += Math.sin(this.scratchToRad(this.direction)) * 5;
    this.y += Math.cos(this.scratchToRad(this.direction)) * 5;
    this.visible = true;
    this.effects.clear();
    this.effects.brightness = 100;
    this.costume = "pew2";
    while (true) {
      yield* this.travel(13);
      yield;
    }
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *travel(speed3) {
    for (let i = 0; i < speed3 * this.stage.vars.tps; i++) {
      this.move(1);
      if (
        Math.abs(this.x) > 239 ||
        this.touching(this.sprites["Ground"].andClones())
      ) {
        this.deleteThisClone();
      }
    }
  }

  *whenIReceiveRefresh() {
    this.deleteThisClone();
  }

  *whenIReceiveRewind() {
    this.deleteThisClone();
  }

  *whenIReceiveEnd() {
    this.deleteThisClone();
  }

  *whenIReceiveDed() {
    this.deleteThisClone();
  }
}
