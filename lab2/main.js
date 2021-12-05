class Parent {
  constructor(capacity = 1, isBlocked = false) {
    this.capacity = capacity;
    this.isBlocked = isBlocked;
    this.content = [];
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
    // console.log(JSON.stringify(this, null, 2));
    return this.content.length !== 0;
  }

  get canAdd() {
    return this.capacity !== this.content.length;
  }

  takeOne() {
    return this.content.pop();
  }

  addOne(instance) {
    this.content.push(instance);
  }
}

class Channel extends Parent {
  constructor(mu, isBlocked = false) {
    super(1, isBlocked);
    this.mu = mu;
  }

  get canTake() {
    return !!this.content[0] && this.content[0].rest <= 0;
  }

  get canAdd() {
    return !this.content[0];
  }

  takeOne() {
    return this.content.pop();
  }

  addOne(instance) {
    this.content[0] = instance;
    instance.rest = instance.executionTime;
  }

  spend(step) {
    // console.log(JSON.stringify(this, null, 2));
    if (this.content[0]) this.content[0].rest -= this.mu * step;
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

  resolve() {
    console.log("resolve");
  }

  destroy() {
    console.log("destroy");
  }
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
    if (count >= 1 / lambda) {
      newElement = new Instance(time);
      if (way[0].canAdd) way[0].addOne(newElement);
      else newElement.destroy();
    }

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
        if (cur.canTake) {
          // console.log({
          //   1: i === way.length - 1,
          //   2: way[i + 1][0],
          //   3: way[i + 1][1],
          // });
          if (i === way.length - 1) cur.resolve();
          else if (way[i + 1][0].canAdd) way[i + 1][0].addOne(cur.takeOne());
          else if (way[i + 1][1].canAdd) way[i + 1][1].addOne(cur.takeOne());
        }
      }
    }
  }
  console.log(JSON.stringify(way, null, 2));
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
