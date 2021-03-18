import { registerEnumType } from '@nestjs/graphql';

export enum SortType {
  ASC,
  DESC,
}

registerEnumType(SortType, {
  name: 'SortType',
});
