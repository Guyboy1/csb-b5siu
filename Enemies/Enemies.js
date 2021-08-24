/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Enemies extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("ded", "./Enemies/costumes/ded.png", { x: 6, y: 7 }),
      new Costume("normal 1", "./Enemies/costumes/normal 1.png", {
        x: 6,
        y: 7
      }),
      new Costume("normal 2", "./Enemies/costumes/normal 2.png", {
        x: 6,
        y: 7
      }),
      new Costume("pew", "./Enemies/costumes/pew.png", { x: 5, y: 6 }),
      new Costume("pew2", "./Enemies/costumes/pew2.png", { x: 5, y: 6 })
    ];

    this.sounds = [new Sound("pop", "./Enemies/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "refresh" },
        this.whenIReceiveRefresh
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(Trigger.CLONE_START, this.startAsClone3),
      new Trigger(
        Trigger.BROADCAST,
        { name: "refresh" },
        this.whenIReceiveRefresh2
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone4),
      new Trigger(Trigger.BROADCAST, { name: "end" }, this.whenIReceiveEnd)
    ];

    this.vars.yv2 = 0;
    this.vars.ded = "n";
    this.vars.turn = 0;
    this.vars.spawnX = 0;
    this.vars.wait = 0;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenIReceiveRefresh() {
    this.stage.vars.count = 0;
    this.stage.vars.x = [];
    this.stage.vars.y = [];
    this.stage.vars.dir = [];
    yield* this.wait(0);
    if (this.stage.vars.level == 3) {
      yield* this.spawnAt("normal 1", 0, -115);
    }
    if (this.stage.vars.level == 6) {
      yield* this.spawnAt("normal 1", 150, -115);
      yield* this.wait(0.05);
      yield* this.spawnAt("normal 1", 80, 12);
      yield* this.wait(0.05);
      this.direction = 90;
      yield* this.spawnAt("pew", -95, 55);
    }
    if (this.stage.vars.level == 7) {
      yield* this.spawnAt("normal 1", 20, -10);
      yield* this.wait(0.05);
      this.direction = -90;
      yield* this.spawnAt("pew", 100, 66);
      yield* this.wait(0.05);
      this.direction = 90;
      yield* this.spawnAt("pew", -60, 99);
    }
    if (this.stage.vars.level == 8) {
      yield* this.spawnAt("normal 1", -90, -115);
      yield* this.wait(0.05);
      this.direction = -90;
      yield* this.spawnAt("pew", 150, -116);
      yield* this.wait(0.05);
      this.direction = -90;
      yield* this.spawnAt("pew", 210, -61);
    }
    if (this.stage.vars.level == 9) {
      yield* this.spawnAt("normal 1", -17, -115);
      yield* this.wait(0.05);
      yield* this.spawnAt("normal 1", 30, 17);
    }
    if (this.stage.vars.level == 10) {
      this.direction = 90;
      yield* this.spawnAt("pew", -91, -26);
      yield* this.wait(0.05);
      this.direction = -90;
      yield* this.spawnAt("pew", 0, 32);
    }
    if (this.stage.vars.level == 11) {
      this.direction = -90;
      yield* this.spawnAt("pew", 205, -73);
    }
    if (this.stage.vars.level == 12) {
      this.broadcast("end");
    }
  }

  *spawnAt(enemie, x2, y2) {
    this.costume = enemie;
    this.goto(x2, y2);
    this.createClone();
  }

  *startAsClone() {
    this.rotationStyle = Sprite.RotationStyle.LEFT_RIGHT;
    this.vars.ded = "n";
    this.visible = true;
    yield* this.wait(1);
    if (this.costume.name == "normal 1") {
      this.vars.spawnX = this.x;
      while (true) {
        while (!(this.x > this.vars.spawnX + 49)) {
          if (this.vars.ded == "n") {
            this.x += 2 * this.stage.vars.tps;
          }
          yield;
        }
        while (!(this.vars.spawnX + -49 > this.x)) {
          if (this.vars.ded == "n") {
            this.x += -2 * this.stage.vars.tps;
          }
          yield;
        }
        yield;
      }
    }
  }

  *startAsClone2() {
    this.vars.ded = "n";
    /* TODO: Implement looks_goforwardbackwardlayers */ null;
    this.size = 350;
    this.visible = true;
    if (this.costume.name == "normal 1") {
      while (true) {
        yield* this.wait(0.2 * (2 - this.stage.vars.tps));
        this.costume = "ded";
        if (this.vars.ded == "n") {
          this.costume = "normal 2";
        }
        yield* this.wait(0.2 * (2 - this.stage.vars.tps));
        this.costume = "ded";
        if (this.vars.ded == "n") {
          this.costume = "normal 1";
        }
        yield;
      }
    }
    if (this.costume.name == "pew") {
      this.vars.wait = 0;
      while (true) {
        if (this.vars.ded == "n") {
          this.costume = "ded";
          if (this.vars.ded == "n") {
            this.costume = "pew";
          }
        }
        this.costume = "ded";
        if (this.vars.ded == "n") {
          if (this.vars.wait > 60 * (2 - this.stage.vars.tps)) {
            this.vars.wait = 0;
            this.stage.vars.count += 1;
            this.stage.vars.x.push(this.x);
            this.stage.vars.y.push(this.y);
            this.stage.vars.dir.push(
              (Math.abs(this.direction) / this.direction) * 90
            );
            this.costume = "pew2";
            this.sprites["EnemieBullets"].createClone();
            yield* this.wait(0.07 * (2 - this.stage.vars.tps));
            this.costume = "pew";
          } else {
            this.vars.wait += 1;
            this.costume = "pew";
          }
        }
        yield;
      }
    }
  }

  *startAsClone3() {
    while (true) {
      if (this.touching(this.sprites["Bullet"].andClones())) {
        this.costume = "ded";
        while (!!this.touching(this.sprites["Bullet"].andClones())) {
          yield;
        }
        this.rotationStyle = Sprite.RotationStyle.ALL_AROUND;
        this.vars.ded = "y";
        if (this.random(1, 2) == 1) {
          this.vars.turn = 5;
        } else {
          this.vars.turn = -5;
        }
        this.vars.yv2 = 10;
        while (true) {
          this.vars.yv2 += -0.7;
          this.y += this.vars.yv2 * this.stage.vars.tps;
          this.vars.turn = this.vars.turn * 0.95;
          this.direction += this.vars.turn * this.stage.vars.tps;
          if (this.y < -175) {
            this.deleteThisClone();
          }
          yield;
        }
      }
      yield;
    }
  }

  *whenIReceiveRefresh2() {
    this.deleteThisClone();
  }

  *startAsClone4() {
    while (true) {
      if (this.touching(this.sprites["Player"].andClones())) {
        if (this.vars.ded == "n") {
          if (this.stage.vars.transition == "n") {
            yield* this.broadcastAndWait("ded");
          }
        }
      }
      yield;
    }
  }

  *whenIReceiveEnd() {
    this.deleteThisClone();
  }
}
