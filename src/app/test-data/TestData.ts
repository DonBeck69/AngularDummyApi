export class TestData {

    public constructor(init?: Partial<TestData>) {
      Object.assign(this, init);
    }
  
    thing: string;
    wotsit: string;
    howMany: number;
  
  }