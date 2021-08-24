/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Lasers extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("switch", "./Lasers/costumes/switch.png", { x: 23, y: 23 }),
      new Costume("switch2", "./Lasers/costumes/switch2.png", { x: 23, y: 23 }),
      new Costume("level1", "./Lasers/costumes/level1.png", { x: 0, y: 0 }),
      new Costume("level2", "./Lasers/costumes/level2.png", { x: 0, y: 0 }),
      new Costume("level3", "./Lasers/costumes/level3.png", { x: 0, y: 0 }),
      new Costume("level4", "./Lasers/costumes/level4.png", { x: 0, y: 0 }),
      new Costume("level5", "./Lasers/costumes/level5.png", { x: 286, y: 100 }),
      new Costume("level6", "./Lasers/costumes/level6.png", {
        x: -306,
        y: -15
      }),
      new Costume("level7", "./Lasers/costumes/level7.png", { x: -348, y: 46 }),
      new Costume("level8", "./Lasers/costumes/level8.png", { x: 0, y: 0 }),
      new Costume("level9", "./Lasers/costumes/level9.png", { x: 270, y: -71 }),
      new Costume("level10", "./Lasers/costumes/level10.png", { x: 0, y: 0 }),
      new Costume("level11", "./Lasers/costumes/level11.png", {
        x: -322,
        y: 326
      }),
      new Costume("level12", "./Lasers/costumes/level12.png", { x: 0, y: 0 })
    ];

    this.sounds = [new Sound("power down", "./Lasers/sounds/power down.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "play" }, this.whenIReceivePlay),
      new Trigger(
        Trigger.BROADCAST,
        { name: "refresh" },
        this.whenIReceiveRefresh
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(
        Trigger.BROADCAST,
        { name: "refresh" },
        this.whenIReceiveRefresh2
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone3),
      new Trigger(
        Trigger.BROADCAST,
        { name: "power down" },
        this.whenIReceivePowerDown
      ),
      new Trigger(Trigger.BROADCAST, { name: "end" }, this.whenIReceiveEnd)
    ];
  }

  *whenGreenFlagClicked() {
    this.goto(0, 0);
    this.visible = false;
  }

  *whenIReceivePlay() {
    this.visible = false;
    this.createClone();
  }

  *whenIReceiveRefresh() {
    yield* this.wait(0);
    this.costume = this.stage.vars.level + 2;
    this.createClone();
    this.costume = "switch";
    if (this.stage.vars.level == 5) {
      this.goto(180, -110);
      this.createClone();
    }
    if (this.stage.vars.level == 6) {
      this.goto(-150, 60);
      this.createClone();
    }
    if (this.stage.vars.level == 7) {
      this.goto(-163, -40);
      this.createClone();
    }
    if (this.stage.vars.level == 9) {
      this.goto(-200, -15);
      this.createClone();
    }
    if (this.stage.vars.level == 11) {
      this.goto(-220, -20);
      this.createClone();
    }
  }

  *startAsClone() {
    this.visible = true;
    while (true) {
      /* TODO: Implement looks_gotofrontback */ null;
      /* TODO: Implement looks_goforwardbackwardlayers */ null;
      yield;
    }
  }

  *startAsClone2() {
    if (!(this.costumeNumber == 1 || this.costumeNumber == 2)) {
      this.goto(0, 0);
      while (true) {
        if (this.touching(this.sprites["Player"].andClones())) {
          if (this.stage.vars.transition == "n") {
            yield* this.broadcastAndWait("ded");
          }
        }
        yield;
      }
    }
  }

  *whenIReceiveRefresh2() {
    this.deleteThisClone();
  }

  *startAsClone3() {
    if (this.costumeNumber == 1) {
      while (!this.touching(this.sprites["Player"].andClones())) {
        yield;
      }
      this.costume = "switch2";
      this.broadcast("power down");
    }
  }

  *whenIReceivePowerDown() {
    yield* this.startSound("power down");
    if (!(this.costumeNumber == 1 || this.costumeNumber == 2)) {
      this.visible = false;
    }
  }

  *whenIReceiveEnd() {
    /* TODO: Implement stop other scripts in sprite */ null;
    this.visible = false;
    this.deleteThisClone();
  }
}
