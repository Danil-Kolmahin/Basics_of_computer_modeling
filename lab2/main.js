class Parent {
  constructor(capacity = 1, isBlocked = false) {
    this.capacity = capacity;
    this.isBlocked = isBlocked;
    this.content = new Array(isFinite(capacity) ? capacity : 9000).fill(null);
  }

  addOne() {}

  takeOne() {}
}

class Que extends Parent {
  constructor(capacity = Infinity, isBlocked = false) {
    super(capacity, isBlocked);
  }
}

class Channel extends Parent {
  constructor(mu, isBlocked = false) {
    super(1, isBlocked);
    this.mu = mu;
  }

  addOne(instance) {
    this.content[0] = instance;
    instance.rest = instance.executionTime;
  }

  spend(step) {
    if (this.content[0]) this.content[0].rest -= step;
  }
}

class Instance {
  executionTime = 1;

  constructor(index) {
    this.index = index;
  }
}

const process = (lambda, way, maxTime, step = 0.05) => {
  for (let time = 0; time < maxTime; time += step) {
    way.forEach((element) => {
      if (Array.isArray(element))
        element.forEach((channel) => channel.spend(step));
    });
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
