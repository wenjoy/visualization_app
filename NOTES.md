https://github.com/uber/react-vis

## next
api
styles

|date|term| duration|
|--|--|--|
|2020.8.23|mock data| 1h?|
|2020.8.23|debug and display chart| 1h|

## plans
hongqi super market expand history
cms system to manage data

## knowledge
1.    // TODO: type transform, i don't want to create a class
    // @ts-ignore
  it's should be called type assertion, `A as any`
  see [this](https://ts.xcatliu.com/basics/type-assertion.html)

2.   //TODO: refactor to overload
```ts
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
```
see [this](https://ts.xcatliu.com/basics/type-of-function.html#%E9%87%8D%E8%BD%BD)

3. tuple
```ts
export interface ISale {
  type: CarType;
  date: string;
  sale: number;
}
  //TODO: try to use tuple
  const data: ISale[] = mockData(24, CarType.Electric).concat(mockData(24, CarType.Gas));
```
if tuple should be
```ts
  const data: [CarType, string, number] = mockData(24, CarType.Electric).concat(mockData(24, CarType.Gas));
```
tuple seems not a better choice here, because it missed meaning like interface, so what's the tuple's scenery.
