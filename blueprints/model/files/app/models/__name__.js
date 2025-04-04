import Model, { attr } from '@ember-data/model';

export default class <%= camelizedModuleName %> extends Model {
  @attr slug;
  @attr modules;
}
