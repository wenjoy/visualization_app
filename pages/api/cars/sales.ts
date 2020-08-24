export enum CarType {
  Electric='Electric',
  Gas='Gas',
}

export interface ISale {
  type: CarType;
  date: string; // I want date string
  sale: number;
}

function randomNum(range: number) {
  return Math.floor(Math.random() * range);
}
function randomPick(list: any[], num: number) {
  const ret = [];
  const len = list.length;
  for (let i = 0; i < num; i++) {
    ret.push(randomNum(len))
  }
  return ret;
}
function orderPick(list: any[], cycle: boolean = true) {
  let copy = [...list];
  return function () {
    if (copy.length > 0) {
      return copy.pop();
    }
    if (cycle) {
      copy = [...list];
    }
    return copy.pop() || null;
  }
}
function mockData(num: number, type): ISale[] {
  const placeholder = new Array(num).fill(0);
  const types = [CarType.Electric, CarType.Gas]
  const datesYears = ['2019', '2020']
  const datesMonths = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
  const composed = datesMonths.map(item => datesYears.map(i => `${i}-${item}`))
  const deflated = composed.reduce((acc, curr) => {
    acc.push(...curr)
    return acc;
  }, []);
  const datePick = orderPick(deflated);
  return placeholder.map((item, ind) => {
    return {
      type,
      date: datePick(),
      sale: randomNum(1000)
    }
  })
}
export default (req, res) => {

  const data: ISale[] = mockData(24, CarType.Electric).concat(mockData(24, CarType.Gas));
  res.statusCode = 200;
  res.json(data)
}