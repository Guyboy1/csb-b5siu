/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Rewind extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("rewind", "./Rewind/costumes/rewind.png", { x: 32, y: 20 }),
      new Costume("rewind3", "./Rewind/costumes/rewind3.png", { x: 32, y: 20 }),
      new Costume("rewind2", "./Rewind/costumes/rewind2.png", { x: 73, y: 62 })
    ];

    this.sounds = [new Sound("rewind", "./Rewind/sounds/rewind.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "refresh" },
        this.whenIReceiveRefresh
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "transition" },
        this.whenIReceiveTransition
      )
    ];
  }

  *whenIReceiveRefresh() {
    this.visible = false;
    if (!(this.stage.vars.level == 12)) {
      yield* this.wait(1);
      this.visible = true;
      this.size = 175;
      this.effects.ghost = 50;
      this.costume = "rewind3";
      yield* this.wait(3);
      this.costume = "rewind";
      while (true) {
        if (this.mouse.down || this.keyPressed("r")) {
          if (this.touching("mouse") || this.keyPressed("r")) {
            this.size = 150;
            this.effects.ghost = 0;
            while (!(!this.mouse.down && !this.keyPressed("r"))) {
              yield;
            }
            if (this.touching("mouse") || !this.keyPressed("r")) {
              if (this.stage.vars.transition == "n") {
                this.effects.ghost = 50;
                this.size = 175;
                this.costume = "rewind3";
                yield* this.broadcastAndWait("rewind");
                yield* this.wait(3.7);
                this.costume = "rewind";
              }
            }
          } else {
            while (!(!this.mouse.down && !this.keyPressed("r"))) {
              yield;
            }
          }
        }
        yield;
      }
    }
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.goto(-190, 145);
    while (true) {
      /* TODO: Implement looks_gotofrontback */ null;
      yield;
    }
  }

  *whenIReceiveTransition() {
    this.visible = false;
  }

  *whengreaterthan() {
    while (true) {
      this.visible = false;
      yield;
    }
  }
}
