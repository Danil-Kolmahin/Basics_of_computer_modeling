const { Place, Transition, Net } = require("petri-net");
const _ = require("lodash");

const p0 = new Place("START");
const p1 = new Place("Ч1");
const p2 = new Place("К1(1)");
const p3 = new Place("К1(2)");
const p4 = new Place("Ч2");
const p5 = new Place("К2(1)");
const p6 = new Place("К2(2)");
const p7 = new Place("END");

const t0 = new Transition("t0", [p0], [p1]);
const t1 = new Transition("t1", [p1], [p2, p3]);
const t2 = new Transition("t2", [p2], [p4]);
const t3 = new Transition("t3", [p3], [p4]);
const t4 = new Transition("t4", [p4], [p5, p6]);
const t5 = new Transition("t5", [p5], [p7]);
const t6 = new Transition("t6", [p6], [p7]);

const net = new Net(p0);

net.ingest(10);
t1.on("fire", () => console.log("t1 fired"));

_.times(5, () => {
  console.log(net.describe());
  console.log("----");
  net.execute();
});
