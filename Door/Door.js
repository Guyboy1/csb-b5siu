/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Door extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Door/costumes/costume1.png", {
        x: -420,
        y: -189
      }),
      new Costume("costume2", "./Door/costumes/costume2.png", {
        x: -396,
        y: 120
      }),
      new Costume("costume4", "./Door/costumes/costume4.png", {
        x: -396,
        y: -189
      }),
      new Costume("costume5", "./Door/costumes/costume5.png", {
        x: -396,
        y: -189
      }),
      new Costume("costume3", "./Door/costumes/costume3.png", {
        x: 434,
        y: 168
      }),
      new Costume("costume6", "./Door/costumes/costume6.png", {
        x: -70,
        y: -188
      }),
      new Costume("costume7", "./Door/costumes/costume7.png", {
        x: -410,
        y: 21
      }),
      new Costume("costume8", "./Door/costumes/costume8.png", {
        x: -406,
        y: -187
      }),
      new Costume("costume9", "./Door/costumes/costume9.png", {
        x: -406,
        y: -187
      }),
      new Costume("costume10", "./Door/costumes/costume10.png", {
        x: -314,
        y: -111
      }),
      new Costume("costume11", "./Door/costumes/costume11.png", {
        x: -390,
        y: 315
      })
    ];

    this.sounds = [new Sound("pop", "./Door/sounds/pop.wav")];

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
    while (true) {
      this.restartTimer();
      yield;
    }
  }

  *whenIReceivePlay() {
    this.visible = true;
    while (true) {
      /* TODO: Implement looks_gotofrontback */ null;
      /* TODO: Implement looks_goforwardbackwardlayers */ null;
      yield;
    }
  }

  *whenIReceiveRefresh() {
    this.costume = this.stage.vars.level;
  }

  *whenIReceiveEnd() {
    this.visible = false;
  }
}
