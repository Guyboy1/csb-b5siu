/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Player extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("hit", "./Player/costumes/hit.png", { x: 4, y: 7 }),
      new Costume("hit2", "./Player/costumes/hit2.png", { x: 6, y: 6 }),
      new Costume("hit3", "./Player/costumes/hit3.png", { x: 1, y: 1 }),
      new Costume("idel", "./Player/costumes/idel.png", { x: 6, y: 7 }),
      new Costume("1aim", "./Player/costumes/1aim.png", { x: 5, y: 6 }),
      new Costume("-1aim", "./Player/costumes/-1aim.png", { x: 5, y: 6 }),
      new Costume("run 1", "./Player/costumes/run 1.png", { x: 6, y: 7 }),
      new Costume("run 2", "./Player/costumes/run 2.png", { x: 6, y: 7 }),
      new Costume("jump", "./Player/costumes/jump.png", { x: 6, y: 7 }),
      new Costume("fall", "./Player/costumes/fall.png", { x: 6, y: 9 })
    ];

    this.sounds = [
      new Sound("yt1s", "./Player/sounds/yt1s.mp3"),
      new Sound("slow mo", "./Player/sounds/slow mo.wav"),
      new Sound("rewind", "./Player/sounds/rewind.wav")
    ];

    this.triggers = [
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "refresh" },
        this.whenIReceiveRefresh
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "refresh" },
        this.whenIReceiveRefresh2
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "refresh" },
        this.whenIReceiveRefresh3
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "refresh" },
        this.whenIReceiveRefresh4
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "refresh" },
        this.whenIReceiveRefresh5
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "rewind" },
        this.whenIReceiveRewind
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "transition" },
        this.whenIReceiveTransition
      ),
      new Trigger(Trigger.BROADCAST, { name: "play" }, this.whenIReceivePlay),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(Trigger.BROADCAST, { name: "ded" }, this.whenIReceiveDed),
      new Trigger(
        Trigger.BROADCAST,
        { name: "refresh" },
        this.whenIReceiveRefresh6
      ),
      new Trigger(Trigger.BROADCAST, { name: "ded" }, this.whenIReceiveDed2),
      new Trigger(Trigger.BROADCAST, { name: "end" }, this.whenIReceiveEnd)
    ];

    this.vars.xVel = 4;
    this.vars.yVel = 0;
    this.vars.inAir = "n";
    this.vars.cos = "run 2";
    this.vars.oldDir2 = 90;
    this.vars.counter = 137;
    this.vars.rewind = "n";
    this.vars.transition2 = "n";
    this.vars.oldX = [
      -136,
      -135,
      -134,
      -133,
      -132,
      -131,
      -130,
      -129,
      -128,
      -127,
      -126,
      -125,
      -124,
      -123,
      -122,
      -121,
      -120,
      -119,
      -118,
      -117,
      -116,
      -115,
      -114,
      -113,
      -112,
      -111,
      -110,
      -109,
      -108,
      -107,
      -106,
      -105,
      -104,
      -103,
      -102,
      -101,
      -100,
      -99,
      -98,
      -97,
      -96,
      -95,
      -94,
      -93,
      -92,
      -91,
      -90,
      -89,
      -85,
      -81,
      -77,
      -73,
      -69,
      -65,
      -61,
      -57,
      -53,
      -49,
      -45,
      -41,
      -37,
      -33,
      -29,
      -25,
      -21,
      -17,
      -13,
      -9,
      -5,
      -1,
      3,
      7,
      11,
      15,
      19,
      23,
      27,
      31,
      35,
      39,
      43,
      47,
      51,
      55,
      59,
      63,
      67,
      71,
      75,
      79,
      83,
      87,
      91,
      95,
      99,
      103,
      107,
      111,
      115,
      119
    ];
    this.vars.oldY = [
      -66.63125000000039,
      -66.5187500000004,
      -66.4500000000004,
      -66.4250000000004,
      -66.44375000000039,
      -66.50625000000039,
      -66.6125000000004,
      -66.7625000000004,
      -66.9562500000004,
      -67.19375000000039,
      -67.47500000000039,
      -67.8000000000004,
      -68.1687500000004,
      -68.5812500000004,
      -69.03750000000039,
      -69.53750000000039,
      -70.0812500000004,
      -70.6687500000004,
      -71.3000000000004,
      -71.97500000000039,
      -72.69375000000039,
      -73.4562500000004,
      -74.2625000000004,
      -75.1125000000004,
      -76.00625000000039,
      -76.94375000000039,
      -77.9250000000004,
      -78.9500000000004,
      -80.0187500000004,
      -81.13125000000039,
      -82.28750000000039,
      -83.4875000000004,
      -84.7312500000004,
      -86.0187500000004,
      -87.35000000000039,
      -88.72500000000039,
      -90.1437500000004,
      -91.6062500000004,
      -93.1125000000004,
      -94.66250000000039,
      -96.25625000000039,
      -97.8937500000004,
      -99.5750000000004,
      -101.3000000000004,
      -103.06875000000039,
      -104.88125000000039,
      -106.7375000000004,
      -108.63750000000039,
      -115.43750000000047,
      -115.43750000000051,
      -115.43750000000055,
      -115.4375000000006,
      -115.43750000000064,
      -115.43750000000068,
      -115.43750000000072,
      -115.43750000000077,
      -115.43750000000081,
      -115.43750000000085,
      -115.4375000000009,
      -115.43750000000094,
      -115.43750000000098,
      -115.43750000000102,
      -115.43750000000107,
      -115.43750000000111,
      -115.43750000000115,
      -115.4375000000012,
      -115.43750000000124,
      -115.43750000000128,
      -115.43750000000132,
      -115.43750000000136,
      -115.4375000000014,
      -115.43750000000145,
      -115.43750000000149,
      -115.43750000000153,
      -115.43750000000158,
      -115.43750000000162,
      -115.43750000000166,
      -115.4375000000017,
      -115.43750000000175,
      -115.43750000000179,
      -115.43750000000183,
      -115.43750000000188,
      -115.43750000000192,
      -115.43750000000196,
      -115.437500000002,
      -115.43750000000205,
      -115.43750000000209,
      -115.43750000000213,
      -115.43750000000217,
      -115.43750000000222,
      -115.43750000000226,
      -115.4375000000023,
      -115.43750000000234,
      -115.43750000000239,
      -115.43750000000243,
      -115.43750000000247,
      -115.43750000000252,
      -115.43750000000256,
      -115.4375000000026,
      -115.43750000000264
    ];
    this.vars.oldDir = [
      104.88303334654998,
      104.99481541461377,
      105.09473999643114,
      105.18264302491896,
      105.25835299258635,
      105.32169053076495,
      105.37246798197354,
      105.41048896549522,
      107.94126683283034,
      112.87171648197636,
      115.94591563218445,
      117.42394632829043,
      119.92580663196605,
      125.53419524701573,
      145.9549260283502,
      171.3682493544777,
      -140.55853038365404,
      -96.6959063398516,
      -71.38742101395928,
      -30.862396664491826,
      64.88391047176597,
      71.54289198766357,
      89.0428857369795,
      113.91635757838532,
      171.7922970564656,
      -136.15005001497005,
      -115.09589070845104,
      -115.03929389118682,
      -122.51382032414398,
      -131.76800802185863,
      -144.40932525485402,
      155.5186675006502,
      149.00560665903237,
      141.594966650682,
      135.3628033018158,
      125.7029433018934,
      117.06601309215793,
      110.91449533592925,
      107.83530887962789,
      104.08117251538303,
      99.49697341608571,
      94.83906982084861,
      93.3483838942837,
      92.68252581025754,
      91.9889177213767,
      91.26710694951356,
      90.52038800425186,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005,
      90.15384940856005
    ];
    this.vars.oldCos = [
      "1aim",
      "1aim",
      "1aim",
      "1aim",
      "1aim",
      "1aim",
      "1aim",
      "1aim",
      "1aim",
      "1aim",
      "1aim",
      "1aim",
      "1aim",
      "1aim",
      "1aim",
      "1aim",
      "1aim",
      "-1aim",
      "-1aim",
      "-1aim",
      "-1aim",
      "1aim",
      "1aim",
      "1aim",
      "1aim",
      "1aim",
      "-1aim",
      "-1aim",
      "-1aim",
      "-1aim",
      "-1aim",
      "-1aim",
      "1aim",
      "1aim",
      "1aim",
      "1aim",
      "1aim",
      "1aim",
      "1aim",
      "1aim",
      "1aim",
      "1aim",
      "1aim",
      "1aim",
      "1aim",
      "1aim",
      "1aim",
      "1aim",
      "run 2",
      "run 1",
      "run 1",
      "run 1",
      "run 1",
      "run 1",
      "run 1",
      "run 2",
      "run 2",
      "run 2",
      "run 2",
      "run 2",
      "run 2",
      "run 2",
      "run 2",
      "run 1",
      "run 1",
      "run 1",
      "run 1",
      "run 1",
      "run 1",
      "run 1",
      "run 2",
      "run 2",
      "run 2",
      "run 2",
      "run 2",
      "run 2",
      "run 2",
      "run 2",
      "run 1",
      "run 1",
      "run 1",
      "run 1",
      "run 1",
      "run 1",
      "run 1",
      "run 2",
      "run 2",
      "run 2",
      "run 2",
      "run 2",
      "run 2",
      "run 2",
      "run 2",
      "run 1",
      "run 1",
      "run 1",
      "run 1",
      "run 1",
      "run 1",
      "run 2"
    ];
  }

  *plat(gravity, jump, speed, max) {
    this.rotationStyle = Sprite.RotationStyle.LEFT_RIGHT;
    this.costume = "hit";
    this.vars.yVel += gravity * this.stage.vars.tps;
    this.y += this.vars.yVel * this.stage.vars.tps;
    if (this.touching(this.sprites["Ground"].andClones())) {
      while (!!this.touching(this.sprites["Ground"].andClones())) {
        this.y += (Math.abs(this.vars.yVel) / this.vars.yVel) * -0.1;
      }
      this.vars.yVel =
        ((this.mouse.down || this.keyPressed("space")) &&
          Math.abs(this.vars.yVel) / this.vars.yVel == -1 &&
          !this.touching(this.sprites["Door"].andClones())) * jump;
    }
    this.vars.xVel = (Math.abs(this.vars.oldDir2) / this.vars.oldDir2) * speed;
    this.x += this.vars.xVel * this.stage.vars.tps;
    if (239 < Math.abs(this.x)) {
      this.vars.oldDir2 = this.vars.oldDir2 * -1;
    }
    if (this.touching(this.sprites["Ground"].andClones())) {
      while (!!this.touching(this.sprites["Ground"].andClones())) {
        this.x += (Math.abs(this.vars.xVel) / this.vars.xVel) * -0.1;
      }
      if (this.mouse.down || this.keyPressed("space")) {
        this.vars.yVel = jump;
        this.vars.oldDir2 = this.vars.oldDir2 * -1;
      }
    }
    this.costume = "hit2";
    if (this.touching(this.sprites["Ground"].andClones())) {
      this.vars.inAir = "n";
      this.costume = this.vars.cos;
    } else {
      this.vars.inAir = "y";
      if (1 > this.stage.vars.tps) {
        this.rotationStyle = Sprite.RotationStyle.ALL_AROUND;
        if (this.direction > 0) {
          this.costume = "1aim";
        } else {
          this.costume = "-1aim";
        }
        this.direction = this.radToScratch(
          Math.atan2(this.mouse.y - this.y, this.mouse.x - this.x)
        );
      } else {
        this.direction = this.vars.oldDir2;
        if (this.vars.yVel > 0) {
          this.costume = "jump";
        } else {
          this.costume = "fall";
        }
      }
    }
  }

  *startAsClone() {
    this.size = 350;
    this.effects.brightness = 100;
    this.effects.ghost = 75;
    while (!!(this.stage.vars.tps < 1)) {
      yield;
    }
    this.deleteThisClone();
  }

  *whenIReceiveRefresh() {
    this.costume = "idel";
    this.vars.oldX = [];
    this.vars.oldY = [];
    this.vars.oldDir2 = [];
    this.vars.oldCos = [];
    /* TODO: Implement looks_goforwardbackwardlayers */ null;
    this.visible = true;
    this.rotationStyle = Sprite.RotationStyle.LEFT_RIGHT;
    this.size = 350;
    this.vars.xVel = 0;
    this.vars.yVel = 0;
    this.vars.oldDir2 = 90;
    this.stage.vars.tps = 1;
    this.vars.counter = 0;
    this.vars.rewind = "n";
    this.vars.transition2 = "n";
    this.direction = 90;
    this.goto(-225, -110);
    yield* this.wait(1);
    while (true) {
      if (this.vars.rewind == "n") {
        this.costume = "hit3";
        if (this.touching(this.sprites["Door"].andClones())) {
          this.stage.vars.tps = 1;
          this.costume = "idel";
          this.rotationStyle = Sprite.RotationStyle.LEFT_RIGHT;
          this.stage.vars.level += 1;
          this.vars.transition2 = "y";
          this.broadcast("transition");
          yield* this.wait(1);
          this.broadcast("refresh");
          this.vars.oldDir2 = 90;
          this.goto(-225, -110);
          this.direction = this.vars.oldDir2;
          this.vars.transition2 = "n";
        }
        yield* this.plat(-0.7, 8.5, 4, 4);
        if (this.touching(this.sprites["EnemieBullets"].andClones())) {
          this.costume = "idel";
          while (!!this.touching(this.sprites["EnemieBullets"].andClones())) {
            yield;
          }
          this.broadcast("ded");
        }
        if (-179 > this.y) {
          this.visible = false;
          this.vars.transition2 = "y";
          this.broadcast("transition");
          yield* this.wait(1);
          this.broadcast("refresh");
          this.vars.oldDir2 = 90;
          this.goto(-225, -110);
          this.direction = this.vars.oldDir2;
          this.vars.transition2 = "n";
          return;
        }
        this.vars.oldX.push(this.x);
        this.vars.oldY.push(this.y);
        this.vars.oldDir2.push(this.direction);
        this.vars.oldCos.push(this.costume.name);
        this.vars.counter += 1;
        if (100 < this.vars.counter) {
          this.vars.oldX.splice(1 - 1, 1);
          this.vars.oldY.splice(1 - 1, 1);
          this.vars.oldDir2.splice(1 - 1, 1);
          this.vars.oldCos.splice(1 - 1, 1);
        }
      }
      yield;
    }
  }

  *whenIReceiveRefresh2() {
    this.stage.vars.ammo = 5;
    while (true) {
      this.vars.cos = "run 1";
      yield* this.wait(0.2);
      this.vars.cos = "run 2";
      yield* this.wait(0.2);
      yield;
    }
  }

  *whenIReceiveRefresh3() {
    while (true) {
      if (this.stage.vars.tps < 1) {
        yield* this.wait(0.2);
        if (this.vars.rewind == "n") {
          this.createClone();
        }
      }
      yield;
    }
  }

  *whenIReceiveRefresh4() {
    while (true) {
      if (this.stage.vars.tps < 1) {
        if (this.mouse.down || this.keyPressed("space")) {
          yield* this.startSound("slow mo");
          while (!!(this.stage.vars.tps < 1)) {
            yield;
          }
          if (!this.mouse.down && !this.keyPressed("space")) {
            if (!(this.vars.rewind == "y")) {
              if (this.vars.transition2 == "n") {
                if (this.stage.vars.ammo > 0) {
                  this.sprites["Bullet"].createClone();
                  this.sprites["BulletEffects"].createClone();
                  this.stage.vars.ammo += -1;
                }
              }
            }
          }
        }
      }
      yield;
    }
  }

  *whenIReceiveRefresh5() {
    while (true) {
      if (this.vars.inAir == "y") {
        while (!(!this.mouse.down && !this.keyPressed("space"))) {
          yield;
        }
        while (!(this.vars.inAir == "n")) {
          if (this.mouse.down || this.keyPressed("space")) {
            this.stage.vars.tps = 0.25;
          } else {
            this.stage.vars.tps = 1;
          }
          yield;
        }
        this.stage.vars.tps = 1;
      }
      yield;
    }
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.broadcast("cutscene");
  }

  *whenIReceiveRewind() {
    if (!this.touching(this.sprites["Door"].andClones())) {
      yield* this.startSound("rewind");
      this.vars.transition2 = "y";
      this.vars.rewind = "y";
      this.vars.counter = 100;
      for (let i = 0; i < 50; i++) {
        this.goto(
          this.vars.oldX[this.vars.counter - 1],
          this.vars.oldY[this.vars.counter - 1]
        );
        if (Math.abs(this.vars.oldDir2[this.vars.counter - 1]) == 90) {
          this.direction = this.vars.oldDir2[this.vars.counter - 1];
          this.rotationStyle = Sprite.RotationStyle.LEFT_RIGHT;
        } else {
          this.direction = this.vars.oldDir2[this.vars.counter - 1];
          this.rotationStyle = Sprite.RotationStyle.ALL_AROUND;
        }
        this.costume = this.vars.oldCos[this.vars.counter - 1];
        this.vars.counter += -2;
        yield;
      }
      this.vars.yVel = 0;
      if (this.vars.oldX[2 - 1] - this.vars.oldX[1 - 1] > 0) {
        this.vars.oldDir2 = 90;
      } else {
        this.vars.oldDir2 = -90;
      }
      this.vars.counter = 0;
      this.vars.oldDir2 = [];
      this.vars.oldCos = [];
      this.vars.oldX = [];
      this.vars.oldY = [];
      this.vars.rewind = "n";
      this.vars.transition2 = "n";
    }
  }

  *whenIReceiveTransition() {
    this.deleteThisClone();
  }

  *whenIReceivePlay() {
    this.stage.vars.level = 1;
    this.broadcast("refresh");
  }

  *startAsClone2() {
    while (true) {
      if (this.vars.rewind == "y") {
        this.deleteThisClone();
      }
      yield;
    }
  }

  *whenIReceiveDed() {
    if (this.vars.transition2 == "n") {
      this.direction = 90;
      this.vars.transition2 = "y";
      this.costume = "idel";
      yield* this.wait(0);
      /* TODO: Implement stop other scripts in sprite */ null;
      this.vars.yVel = 8.5;
      if (this.random(1, 2) == 1) {
        this.vars.xVel = 5;
      } else {
        this.vars.xVel = -5;
      }
      this.stage.vars.tps = 1;
      this.rotationStyle = Sprite.RotationStyle.ALL_AROUND;
      this.costume = "idel";
    }
    while (true) {
      this.vars.yVel += -0.7;
      this.y += this.vars.yVel;
      this.vars.xVel = this.vars.xVel * 0.95;
      this.direction += this.vars.xVel;
      if (-179 > this.y) {
        this.visible = false;
        this.broadcast("transition");
        yield* this.wait(1);
        this.broadcast("refresh");
        this.vars.oldDir2 = 90;
        this.goto(-225, -110);
        this.direction = this.vars.oldDir2;
        this.vars.transition2 = "n";
        return;
      }
      yield;
    }
  }

  *whenIReceiveRefresh6() {
    while (true) {
      this.stage.vars.transition = this.vars.transition2;
      yield;
    }
  }

  *whenIReceiveDed2() {
    this.deleteThisClone();
  }

  *whenIReceiveEnd() {
    /* TODO: Implement stop other scripts in sprite */ null;
    this.visible = false;
  }
}
