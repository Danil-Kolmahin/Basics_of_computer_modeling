class Parent {
  constructor(capacity = 1, isBlocked = false) {
    this.capacity = capacity;
    this.isBlocked = isBlocked;
    this.content = new Array(isFinite(capacity) ? capacity : 9000).fill(null);
  }

  get canAdd() {}

  addOne() {}

  takeOne() {}
}

class Que extends Parent {
  constructor(capacity = Infinity, isBlocked = false) {
    super(capacity, isBlocked);
  }

  get canTake() {
    return true;
  }

  get canAdd() {
    return this.capacity !== this.content.length;
  }

  takeOne() {
    const res = this.content[this.content.length - 1];
    this.content[this.content.length - 1] = null;
    return res;
  }

  addOne(instance) {
    this.content[this.content.length] = instance;
  }
}

class Channel extends Parent {
  constructor(mu, isBlocked = false) {
    super(1, isBlocked);
    this.mu = mu;
  }

  get canTake() {
    return this.content[0] === null;
  }

  get canAdd() {
    return this.content[0].rest <= 0;
  }

  takeOne() {
    const res = this.content[0];
    this.content[0] = null;
    return res;
  }

  addOne(instance) {
    this.content[0] = instance;
    instance.rest = instance.executionTime;
  }

  spend(step) {
    if (this.content[0]) this.content[0].rest -= step;
  }

  resolve() {
    if (this.content[0]) this.content[0].resolve();
    this.content[0] = null;
  }
}

class Instance {
  executionTime = 1;

  constructor(index) {
    this.index = index;
  }

  resolve() {}
}

const process = (lambda, way, maxTime, step = 0.05) => {
  let count = 0;
  for (let time = 0; time < maxTime; time += step) {
    way.forEach((element) => {
      if (Array.isArray(element))
        element.forEach((channel) => channel.spend(step));
    });

    count += step;
    let newElement;
    if (count >= lambda) newElement = new Instance(time);

    for (let i = way.length - 1; i >= 0; i--) {
      const cur = way[i];
      if (Array.isArray(cur)) {
        cur.forEach((elem) => {
          if (elem.canTake) {
            if (i === way.length - 1) elem.resolve();
            else if (way[i + 1].canAdd) way[i + 1].addOne(elem.takeOne());
          }
        });
      } else {
      }
    }
  }
};

process(
  5,
  [
    new Que(),
    [new Channel(5), new Channel(5)],
    new Que(8, true),
    [new Channel(3), new Channel(3)],
  ],
  5
);
