/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Text extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Text/costumes/costume1.svg", {
        x: 200.65625,
        y: 91.45312
      }),
      new Costume("costume2", "./Text/costumes/costume2.svg", {
        x: -28.84375,
        y: 9.153124999999989
      }),
      new Costume("costume3", "./Text/costumes/costume3.svg", {
        x: 188.15625,
        y: 122.75937000000005
      }),
      new Costume("costume4", "./Text/costumes/costume4.svg", {
        x: 81.15625,
        y: 153.15311000000003
      }),
      new Costume("costume5", "./Text/costumes/costume5.png", { x: 0, y: 0 }),
      new Costume("costume6", "./Text/costumes/costume6.png", { x: 0, y: 0 }),
      new Costume("costume7", "./Text/costumes/costume7.png", { x: 0, y: 0 }),
      new Costume("costume8", "./Text/costumes/costume8.png", { x: 0, y: 0 }),
      new Costume("costume9", "./Text/costumes/costume9.png", { x: 0, y: 0 }),
      new Costume("costume10", "./Text/costumes/costume10.png", { x: 0, y: 0 }),
      new Costume("costume11", "./Text/costumes/costume11.png", { x: 0, y: 0 }),
      new Costume("costume12", "./Text/costumes/costume12.png", { x: 0, y: 0 })
    ];

    this.sounds = [new Sound("pop", "./Text/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "play" }, this.whenIReceivePlay),
      new Trigger(
        Trigger.BROADCAST,
        { name: "refresh" },
        this.whenIReceiveRefresh
      ),
      new Trigger(Trigger.BROADCAST, { name: "end" }, this.whenIReceiveEnd)
    ];
  }

  *whenGreenFlagClicked() {
    this.goto(0, 0);
    this.visible = false;
  }

  *whenIReceivePlay() {
    this.visible = true;
    while (true) {
      /* TODO: Implement looks_gotofrontback */ null;
      yield;
    }
  }

  *whenIReceiveRefresh() {
    this.costume = this.stage.vars.level;
  }

  *whenIReceiveEnd() {
    /* TODO: Implement stop other scripts in sprite */ null;
    this.visible = false;
    this.deleteThisClone();
  }
}
