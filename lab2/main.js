'use strict';

class Instance {
  executionTime = 1;
  index;
  isProceed = false;

  constructor({ index } = {}) {
    this.index = index;
  }

  resolve() {
    console.log({ index: this.index });
    this.isProceed = true;
  }
}

class Que {
  length = Infinity;
  content = [];

  constructor({ length } = {}) {
    if (typeof length === 'number') this.length = length;
  }

  get isFull() {
    return this.content.length === this.length;
  }

  addOne(instance) {
    if (this.isFull) throw new Error('isFull');
    this.content.push(instance);
  }

  takeOne() {
    return this.content.pop() || null;
  }
}

class Channel {
  intensity;
  onProceed = null;

  constructor({ intensity } = {}) {
    this.intensity = intensity;
  }

  get isEmpty() {
    return this.onProceed === null;
  }

  addOne(instance) {
    if (this.onProceed !== null) throw new Error('Crowded');
    this.onProceed = instance;
    return this;
  }

  proceed() {
    if (!this.isEmpty) this.onProceed.resolve();
    return this;
  }

  takeOne() {
    if (!this.isEmpty) {
      const onProceed = this.onProceed;
      this.onProceed = null;
      return onProceed;
    }
  }
}

const timeout = (time) => new Promise((resolve) => setTimeout(resolve, time));

(async () => {
  const WORK_TIME = 5 * 1000;
  const ONE_STEP_DELAY = 1000;
  const START_TIME = Date.now();

  let count = 0;
  const LAMBDA = 5;
  const MU1 = 5;
  const MU2 = 3;
  const L = 8;

  const QUE1 = new Que();
  const QUE2 = new Que({ length: L });
  const K1 = [new Channel({ intensity: MU1 }), new Channel({ intensity: MU1 })];
  const K2 = [new Channel({ intensity: MU2 }), new Channel({ intensity: MU2 })];

  while (true) {
    const newInstances = new Array(LAMBDA)
      .fill()
      .map(() => new Instance({ index: count++ }));

    for (let i = 0; i < LAMBDA; i++) {
      QUE1.addOne(newInstances[i]);
      if (K1[0].isEmpty) K1[0].addOne(QUE1.takeOne());
      if (K1[1].isEmpty) K1[1].addOne(QUE1.takeOne());
      K1[0].proceed();
      K1[1].proceed();

      if (!QUE2.isFull) QUE2.addOne(K1[0].takeOne());
      if (!QUE2.isFull) QUE2.addOne(K1[1].takeOne());
      if (K2[0].isEmpty) K2[0].addOne(QUE2.takeOne()).proceed().takeOne();
      if (K2[1].isEmpty) K2[1].addOne(QUE2.takeOne()).proceed().takeOne();
    }

    await timeout(ONE_STEP_DELAY);
    if (START_TIME + WORK_TIME < Date.now()) return;
  }
})();
