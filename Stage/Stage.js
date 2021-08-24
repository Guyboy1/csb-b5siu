/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("backdrop1", "./Stage/costumes/backdrop1.png", {
        x: 480,
        y: 360
      }),
      new Costume("backdrop4", "./Stage/costumes/backdrop4.svg", {
        x: 240,
        y: 180
      }),
      new Costume("backdrop2", "./Stage/costumes/backdrop2.png", {
        x: 480,
        y: 360
      }),
      new Costume("backdrop3", "./Stage/costumes/backdrop3.png", {
        x: 480,
        y: 360
      })
    ];

    this.sounds = [new Sound("epic music", "./Stage/sounds/epic music.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "play" }, this.whenIReceivePlay),
      new Trigger(Trigger.BROADCAST, { name: "play" }, this.whenIReceivePlay2),
      new Trigger(Trigger.BROADCAST, { name: "play" }, this.whenIReceivePlay3),
      new Trigger(
        Trigger.BROADCAST,
        { name: "rewind" },
        this.whenIReceiveRewind
      ),
      new Trigger(Trigger.BROADCAST, { name: "play" }, this.whenIReceivePlay4),
      new Trigger(
        Trigger.BROADCAST,
        { name: "cutscene" },
        this.whenIReceiveCutscene
      ),
      new Trigger(Trigger.BROADCAST, { name: "end" }, this.whenIReceiveEnd)
    ];

    this.audioEffects.volume = 0;

    this.vars.tps = 1;
    this.vars.level = 3;
    this.vars.transition = "n";
    this.vars.count = 0;
    this.vars.ammo = 4;
    this.vars.end = "n";
    this.vars.x = [];
    this.vars.y = [];
    this.vars.dir = [];
  }

  *whenGreenFlagClicked() {
    this.costume = "backdrop4";
    this.audioEffects.volume = 0;
  }

  *whenIReceivePlay() {
    while (true) {
      yield* this.playSoundUntilDone("epic music");
      yield;
    }
  }

  *whenIReceivePlay2() {
    this.audioEffects.pitch = 0;
    this.audioEffects.clear();
    for (let i = 0; i < 10; i++) {
      this.audioEffects.volume += 3;
      yield;
    }
  }

  *whenIReceivePlay3() {
    this.costume = "backdrop1";
  }

  *whenIReceiveRewind() {
    this.audioEffects.volume = 10 * 3;
    this.audioEffects.volume += -10;
    yield* this.wait(2);
    this.audioEffects.volume += 10;
  }

  *whenIReceivePlay4() {
    while (true) {
      if (this.vars.level == "n") {
        if (this.vars.tps < 1) {
          this.audioEffects.volume = (10 * 3) / 2;
        } else {
          this.audioEffects.volume = 10 * 3;
        }
      }
      yield;
    }
  }

  *whenIReceiveCutscene() {
    this.vars.end = "n";
    this.costume = "backdrop3";
  }

  *whenIReceiveEnd() {
    this.costume = "backdrop3";
    this.vars.end = "y";
    for (let i = 0; i < 10; i++) {
      this.audioEffects.volume += -3;
      yield;
    }
    yield* this.wait(1);
    this.broadcast("end cut scene");
  }
}
