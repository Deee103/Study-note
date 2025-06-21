https://github.com/typeorm/typeorm/issues/4526#issuecomment-1109302380

``` ts
import { Entity, Column, Relation } from 'typeorm'

@Entity()
export class Person { 
  .....
  @ManyToOne(() => Business, (business) => business.members)
  business: Relation<Business>;
}
```