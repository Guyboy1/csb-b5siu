/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class BulletEffects extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("explode", "./BulletEffects/costumes/explode.png", {
        x: 8,
        y: 8
      })
    ];

    this.sounds = [new Sound("pop", "./BulletEffects/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "end" }, this.whenIReceiveEnd)
    ];
  }

  *startAsClone() {
    this.rotationStyle = Sprite.RotationStyle.ALL_AROUND;
    this.goto(this.sprites["Player"].x, this.sprites["Player"].y);
    this.direction = this.radToScratch(
      Math.atan2(this.mouse.y - this.y, this.mouse.x - this.x)
    );
    this.x += Math.sin(this.scratchToRad(this.direction)) * 15;
    this.y += Math.cos(this.scratchToRad(this.direction)) * 15;
    /* TODO: Implement looks_gotofrontback */ null;
    this.visible = true;
    this.effects.clear();
    this.effects.brightness = 100;
    this.size = 100;
    for (let i = 0; i < 2; i++) {
      this.size += 53;
      yield;
    }
    for (let i = 0; i < 2; i++) {
      this.size += 25;
      yield;
    }
    this.deleteThisClone();
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenIReceiveEnd() {
    /* TODO: Implement stop other scripts in sprite */ null;
    this.visible = false;
    this.deleteThisClone();
  }
}
