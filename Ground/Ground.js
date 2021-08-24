/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Ground extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume2", "./Ground/costumes/costume2.png", {
        x: 480,
        y: 360
      }),
      new Costume("costume3", "./Ground/costumes/costume3.png", {
        x: 480,
        y: 360
      }),
      new Costume("costume4", "./Ground/costumes/costume4.png", {
        x: 480,
        y: 360
      }),
      new Costume("costume5", "./Ground/costumes/costume5.png", {
        x: 480,
        y: 360
      }),
      new Costume("costume6", "./Ground/costumes/costume6.png", {
        x: 480,
        y: 341
      }),
      new Costume("costume7", "./Ground/costumes/costume7.png", {
        x: 480,
        y: 262
      }),
      new Costume("costume8", "./Ground/costumes/costume8.png", {
        x: 480,
        y: 311
      }),
      new Costume("costume9", "./Ground/costumes/costume9.png", {
        x: 480,
        y: 360
      }),
      new Costume("costume10", "./Ground/costumes/costume10.png", {
        x: 480,
        y: 90
      }),
      new Costume("costume11", "./Ground/costumes/costume11.png", {
        x: 480,
        y: 175
      }),
      new Costume("costume12", "./Ground/costumes/costume12.png", {
        x: 480,
        y: 360
      })
    ];

    this.sounds = [new Sound("pop", "./Ground/sounds/pop.wav")];

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
      /* TODO: Implement looks_goforwardbackwardlayers */ null;
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
